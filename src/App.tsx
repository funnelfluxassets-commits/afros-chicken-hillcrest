import React, { useState, useMemo, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryNav } from './components/CategoryNav';
import { FoodCard } from './components/FoodCard';
import { ItemModal } from './components/ItemModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { StoreModal, StoreLocatorSection } from './components/StoreLocator';
import { BrandHighlights } from './components/BrandHighlights';
import { Footer } from './components/Footer';
import { LegalModal, LegalTab } from './components/LegalModal';
import { CookieBanner } from './components/CookieBanner';
import { TeamView } from './components/TeamView';
import { ContactView } from './components/ContactView';
import { ReviewDrawView } from './components/ReviewDrawView';
import { MainView } from './components/MainView';
import { AboutView } from './components/AboutView';
import { FunctionsView } from './components/FunctionsView';
import { AdminPortalView } from './components/AdminPortalView';
import { KitchenDisplayView } from './components/KitchenDisplayView';
import { DeliveryDriverView } from './components/DeliveryDriverView';
import { StaffLoginModal } from './components/StaffLoginModal';
import { OrderTrackerView } from './components/OrderTrackerView';
import { ErrorBoundary } from './components/ErrorBoundary';
import { MENU_ITEMS, CATEGORIES, FLAVOURS } from './data/menuData';
import { CategoryId, MenuItem, PageView, LiveOrder, StaffRole } from './types';
import { getCdnThumbnailUrl } from './utils/cdn';
import { CheckoutPayload, isPayFastStaffTestMode, setPayFastStaffTestMode } from './services/payment';
import { subscribeToOrders, getCurrentOrderId, setCurrentOrderId, createLiveOrder, recordCancelledOrder } from './services/orderService';
import { logPageView, logItemView, fetchAndSyncClientIp, isAnalyticsExcluded, setDeviceAnalyticsExcluded } from './services/analyticsService';
import { getOutOfStockItemIds, subscribeToStockStatus } from './services/stockService';
import { Search, ShoppingBag, ArrowRight, Flame, ShieldAlert, CheckCircle2, X, AlertCircle } from 'lucide-react';

const getInitialView = (): PageView => {
  if (typeof window === 'undefined') return 'main';
  
  // 1. Hash check (e.g. /#menu, /#about, /#review, /#admin, /#kitchen)
  const hash = window.location.hash.toLowerCase().replace('#', '');
  if (
    ['main', 'menu', 'about', 'team', 'functions', 'kitchen', 'delivery', 'track', 'contact', 'review', 'admin'].includes(
      hash
    )
  ) {
    return hash as PageView;
  }

  // 2. Pathname check (e.g. /menu, /about, /review, /admin, /kitchen)
  const path = window.location.pathname.toLowerCase().replace(/^\//, '').replace(/\/$/, '');
  if (
    ['main', 'menu', 'about', 'team', 'functions', 'kitchen', 'delivery', 'track', 'contact', 'review', 'admin'].includes(
      path
    )
  ) {
    return path as PageView;
  }

  // 3. Query parameter check (e.g. ?view=menu)
  const searchParams = new URLSearchParams(window.location.search);
  const queryView = searchParams.get('view')?.toLowerCase();
  if (
    queryView &&
    ['main', 'menu', 'about', 'team', 'functions', 'kitchen', 'delivery', 'track', 'contact', 'review', 'admin'].includes(
      queryView
    )
  ) {
    return queryView as PageView;
  }
  return 'main';
};

const MainContent: React.FC = () => {
  const { totalItemCount, grandTotal, setIsCartOpen } = useCart();
  const [currentView, setCurrentView] = useState<PageView>(getInitialView());
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [trackedOrderId, setTrackedOrderId] = useState<string | null>(getCurrentOrderId());
  const [activeOrder, setActiveOrder] = useState<LiveOrder | null>(null);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<LegalTab>('privacy');
  const [staffRole, setStaffRole] = useState<StaffRole | null>(() => {
    if (typeof window !== 'undefined') {
      return (sessionStorage.getItem('afros_staff_role') as StaffRole) || null;
    }
    return null;
  });
  const [isStaffLoginOpen, setIsStaffLoginOpen] = useState(false);
  const [staffLoginInitialRole, setStaffLoginInitialRole] = useState<StaffRole>('kitchen');
  const [payfastNotice, setPayfastNotice] = useState<{ type: 'success' | 'cancelled'; orderId?: string } | null>(null);
  const [isStaffTestActive, setIsStaffTestActive] = useState(() => isPayFastStaffTestMode());
  const [pendingCategoryScroll, setPendingCategoryScroll] = useState<string | null>(null);
  const [outOfStockIds, setOutOfStockIds] = useState<string[]>(() => getOutOfStockItemIds());
  const [soldOutToast, setSoldOutToast] = useState<string | null>(null);

  // Subscribe to real-time menu stock changes (86 list)
  useEffect(() => {
    const unsub = subscribeToStockStatus((ids) => {
      setOutOfStockIds(ids);
    });
    return unsub;
  }, []);

  const triggerSoldOutToast = (itemName: string) => {
    setSoldOutToast(itemName);
    setTimeout(() => {
      setSoldOutToast((prev) => (prev === itemName ? null : prev));
    }, 2800);
  };

  // Detect PayFast callback redirects or staff test mode flag in URL
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const params = new URLSearchParams(window.location.search);
      const pfStatus = params.get('payfast');
      const pfOrderId = params.get('orderId');

      const hasHashTest = (window.location.hash || '').toLowerCase().includes('test_payfast');
      if (params.get('test_payfast') === '1' || params.get('test_payfast') === 'true' || hasHashTest) {
        setPayFastStaffTestMode(true);
        setIsStaffTestActive(true);
      } else if (params.get('test_payfast') === '0' || params.get('test_payfast') === 'false') {
        setPayFastStaffTestMode(false);
        setIsStaffTestActive(false);
      } else {
        setIsStaffTestActive(isPayFastStaffTestMode());
      }

      if (pfStatus === 'success' && pfOrderId) {
        // Retrieve the pending order payload from storage
        let pendingPayload: CheckoutPayload | null = null;
        try {
          const raw = localStorage.getItem('wrap_wing_pending_payfast_order') ||
                      sessionStorage.getItem('wrap_wing_pending_payfast_order');
          if (raw) pendingPayload = JSON.parse(raw);
        } catch {}

        if (pendingPayload) {
          // NOW that PayFast has confirmed the payment, create the order and dispatch to kitchen!
          createLiveOrder({
            ...pendingPayload,
            orderId: pfOrderId || pendingPayload.orderId,
            paymentMethod: 'payfast',
          });
          try {
            localStorage.removeItem('wrap_wing_pending_payfast_order');
            sessionStorage.removeItem('wrap_wing_pending_payfast_order');
          } catch {}
        }

        setCurrentOrderId(pfOrderId);
        setTrackedOrderId(pfOrderId);
        setCurrentView('track');
        setPayfastNotice({ type: 'success', orderId: pfOrderId });
        const cleanUrl = window.location.pathname + '#track';
        history.replaceState(null, '', cleanUrl);
      } else if (pfStatus === 'cancelled') {
        let pendingPayload: CheckoutPayload | null = null;
        try {
          const raw = localStorage.getItem('wrap_wing_pending_payfast_order') ||
                      sessionStorage.getItem('wrap_wing_pending_payfast_order');
          if (raw) pendingPayload = JSON.parse(raw);
        } catch {}

        if (pendingPayload) {
          // Log failed / cancelled attempt into Admin CRM report so manager can follow up with customer
          recordCancelledOrder(pendingPayload, 'Payment Unsuccessful / Cancelled on PayFast');
          try {
            localStorage.removeItem('wrap_wing_pending_payfast_order');
            sessionStorage.removeItem('wrap_wing_pending_payfast_order');
          } catch {}
        }

        setPayfastNotice({ type: 'cancelled', orderId: pfOrderId || pendingPayload?.orderId || undefined });
        const cleanUrl = window.location.pathname + (window.location.hash || '');
        history.replaceState(null, '', cleanUrl);
      }
    } catch {}
  }, []);

  const handleStaffLogout = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('afros_staff_role');
    }
    setStaffRole(null);
    handleNavigate('menu');
  };

  // Initialize IP detection & exclusion sync
  useEffect(() => {
    fetchAndSyncClientIp().catch(() => {});
  }, []);

  // Customer Traffic & Analytics tracking (excludes internal staff/manager portals and excluded testing devices/IPs)
  useEffect(() => {
    try {
      if (staffRole || ['admin', 'kitchen', 'delivery'].includes(currentView)) {
        // Automatically mark staff device as excluded from analytics
        setDeviceAnalyticsExcluded(true);
        return;
      }
      if (isAnalyticsExcluded()) {
        return;
      }
      logPageView(currentView);
    } catch {}
  }, [currentView, staffRole]);

  useEffect(() => {
    if (selectedItem && !isAnalyticsExcluded()) {
      try {
        logItemView(selectedItem.name);
      } catch {}
    }
  }, [selectedItem]);

  // Sync hash and pathname routing and active orders
  useEffect(() => {
    // Strip trailing '#' or '#menu' on initial load
    if (typeof window !== 'undefined' && window.location.href.includes('#')) {
      const initHash = window.location.hash.toLowerCase().replace('#', '');
      if (!initHash || initHash === 'menu') {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }

    const handleHash = () => {
      const hash = window.location.hash.toLowerCase().replace('#', '');
      const path = window.location.pathname.toLowerCase().replace(/^\//, '').replace(/\/$/, '');
      const target = hash || path;

      const cleanCat = target.startsWith('cat-') ? target.replace('cat-', '') : target;
      if (
        ['strips', 'burgers', 'wraps', 'flamed', 'schnitzel', 'pops', 'salads', 'breakfast', 'tjips_drinks', 'quick_bites'].includes(
          cleanCat
        )
      ) {
        handleNavigate('menu', cleanCat as CategoryId);
        return;
      }

      if (
        ['main', 'menu', 'about', 'team', 'functions', 'kitchen', 'delivery', 'track', 'contact', 'review', 'admin'].includes(
          target
        )
      ) {
        setCurrentView(target as PageView);
      } else if (!target) {
        setCurrentView('main');
      }
    };
    window.addEventListener('hashchange', handleHash);
    window.addEventListener('popstate', handleHash);

    const unsub = subscribeToOrders((orders) => {
      const myOrderId = getCurrentOrderId();
      if (!myOrderId) {
        setActiveOrder(null);
        setTrackedOrderId(null);
        return;
      }
      const cleanMyId = myOrderId.replace('#', '').trim();
      const myOrder = orders.find(
        (o) => o.orderId === myOrderId || o.orderId?.replace('#', '').trim() === cleanMyId
      );
      if (myOrder) {
        if (myOrder.status !== 'cancelled') {
          // Keep active while cooking, ready, or completed so customer can see the celebratory completion screen
          setActiveOrder(myOrder);
          setTrackedOrderId(myOrder.orderId);
        } else {
          setActiveOrder(null);
          setTrackedOrderId(null);
        }
      } else {
        // Order not yet in local cache (syncing from cloud) - keep trackedOrderId active
        setTrackedOrderId(myOrderId);
      }
    });

    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('popstate', handleHash);
      unsub();
    };
  }, [trackedOrderId]);

  const handleNavigate = (view: PageView, categoryId?: CategoryId) => {
    setCurrentView(view);

    if (categoryId) {
      const resolvedCat = categoryId === 'quick_bites' ? 'pops' : categoryId;
      setActiveCategory(resolvedCat as CategoryId);
      setPendingCategoryScroll(resolvedCat);
    } else {
      setPendingCategoryScroll(null);
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    if (typeof window !== 'undefined') {
      if (view === 'main') {
        if (window.location.hash) {
          history.replaceState(null, '', window.location.pathname + window.location.search);
        }
      } else {
        window.location.hash = view;
      }
    }
  };

  // Scroll directly to category section when navigating with categoryId
  useEffect(() => {
    if (currentView === 'menu' && pendingCategoryScroll) {
      const target = pendingCategoryScroll;
      const targetElementId = `cat-${target}`;

      let attempts = 0;
      const maxAttempts = 12;

      const performScroll = () => {
        const elem =
          document.getElementById(targetElementId) ||
          (target === 'pops' ? document.getElementById('cat-quick_bites') : null) ||
          document.getElementById(target);

        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setPendingCategoryScroll(null);
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(performScroll, 50);
        } else {
          setPendingCategoryScroll(null);
        }
      };

      const timer = setTimeout(performScroll, 50);
      return () => clearTimeout(timer);
    }
  }, [currentView, pendingCategoryScroll]);

  // Filter items by category & search query
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.categoryId === activeCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans selection:bg-[#FFD100] selection:text-black pb-16 lg:pb-0 w-full max-w-full overflow-x-hidden relative">
      
      {/* PayFast Sandbox Notice Banner (After Return from Gateway) */}
      {payfastNotice && (
        <div
          className={`py-2.5 px-4 text-center text-xs font-bold flex items-center justify-between shadow-lg sticky top-0 z-[60] animate-fadeIn ${
            payfastNotice.type === 'success'
              ? 'bg-emerald-600 text-white'
              : 'bg-amber-600 text-white'
          }`}
        >
          <div className="flex items-center gap-2 mx-auto">
            {payfastNotice.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-white" />
            ) : (
              <ShieldAlert className="w-4 h-4 shrink-0 text-white" />
            )}
            <span>
              {payfastNotice.type === 'success'
                ? `🎉 PayFast Sandbox Payment Approved! Order #${payfastNotice.orderId} is confirmed and sent to kitchen display.`
                : 'PayFast checkout was cancelled. Your items remain saved in your cart.'}
            </span>
          </div>
          <button
            onClick={() => setPayfastNotice(null)}
            className="p-1 rounded hover:bg-black/20 text-white/90 hover:text-white ml-2 cursor-pointer"
            title="Dismiss notice"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Staff Test Mode Prominent Sticky Banner */}
      {isStaffTestActive && (
        <div className="sticky top-0 z-[100] bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-zinc-950 px-3 sm:px-4 py-2 flex items-center justify-between text-xs font-black shadow-2xl border-b-2 border-amber-600 animate-fadeIn">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-zinc-950 animate-ping" />
            <span className="tracking-wide uppercase font-black text-zinc-950">
              ⚡ Staff Test Mode: PayFast Sandbox Active
            </span>
            <span className="hidden sm:inline font-bold text-zinc-800 text-[11px]">
              • Simulated Orders Only (No Real Money Charged)
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              setPayFastStaffTestMode(false);
              setIsStaffTestActive(false);
            }}
            className="px-2.5 py-1 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-white font-black text-[10px] tracking-wider uppercase transition-colors shadow-sm cursor-pointer shrink-0 ml-2"
          >
            Exit Test Mode
          </button>
        </div>
      )}
      
      {/* ── View Routing ────────────────────────────────────────────────────── */}
      {currentView === 'admin' ? (
        staffRole === 'admin' ? (
          <ErrorBoundary fallbackTitle="Admin Portal Recovery">
            <AdminPortalView
              onBackToMenu={() => handleNavigate('menu')}
              onLogout={handleStaffLogout}
              onNavigateRole={(role) => handleNavigate(role === 'driver' ? 'delivery' : role)}
            />
          </ErrorBoundary>
        ) : (
          <StaffLoginModal
            isOpen={true}
            initialRole="admin"
            onClose={() => handleNavigate('menu')}
            onSuccess={(role) => {
              setStaffRole(role);
              if (role === 'admin') {
                handleNavigate('admin');
              } else if (role === 'kitchen') {
                handleNavigate('kitchen');
              } else {
                handleNavigate('delivery');
              }
            }}
          />
        )
      ) : currentView === 'kitchen' ? (
        staffRole === 'kitchen' || staffRole === 'admin' ? (
          <ErrorBoundary fallbackTitle="Kitchen Display System Recovery">
            <KitchenDisplayView
              onBackToMenu={() => handleNavigate('menu')}
              onLogout={handleStaffLogout}
              onViewOrderTracker={(orderId) => {
                setTrackedOrderId(orderId);
                handleNavigate('track');
              }}
            />
          </ErrorBoundary>
        ) : (
          <StaffLoginModal
            isOpen={true}
            initialRole="kitchen"
            onClose={() => handleNavigate('menu')}
            onSuccess={(role) => {
              setStaffRole(role);
              if (role === 'admin') {
                handleNavigate('admin');
              } else if (role === 'driver') {
                handleNavigate('delivery');
              } else {
                handleNavigate('kitchen');
              }
            }}
          />
        )
      ) : currentView === 'delivery' ? (
        staffRole === 'driver' || staffRole === 'admin' ? (
          <ErrorBoundary fallbackTitle="Delivery Driver System Recovery">
            <DeliveryDriverView
              onBackToMenu={() => handleNavigate('menu')}
              onLogout={handleStaffLogout}
              onViewOrderTracker={(orderId) => {
                setTrackedOrderId(orderId);
                handleNavigate('track');
              }}
            />
          </ErrorBoundary>
        ) : (
          <StaffLoginModal
            isOpen={true}
            initialRole="driver"
            onClose={() => handleNavigate('menu')}
            onSuccess={(role) => {
              setStaffRole(role);
              if (role === 'admin') {
                handleNavigate('admin');
              } else if (role === 'kitchen') {
                handleNavigate('kitchen');
              } else {
                handleNavigate('delivery');
              }
            }}
          />
        )
      ) : currentView === 'track' ? (
        <ErrorBoundary fallbackTitle="Order Tracker Recovery">
          <OrderTrackerView
            orderId={trackedOrderId || activeOrder?.orderId || getCurrentOrderId() || ''}
            onBackToMenu={() => handleNavigate('menu')}
          />
        </ErrorBoundary>
      ) : (
        <>
          {/* Navigation */}
          <Navbar
            onOpenStoreModal={() => setIsStoreModalOpen(true)}
            currentView={currentView}
            onNavigate={handleNavigate}
          />

          {currentView === 'main' && (
            <MainView
              onNavigate={handleNavigate}
              onSelectItem={(item) => setSelectedItem(item)}
            />
          )}

          {currentView === 'about' && (
            <AboutView onNavigate={handleNavigate} />
          )}

          {currentView === 'team' && (
            <TeamView
              onNavigate={handleNavigate}
              onOpenStoreModal={() => setIsStoreModalOpen(true)}
            />
          )}

          {currentView === 'functions' && (
            <FunctionsView onNavigate={handleNavigate} />
          )}



          {currentView === 'contact' && (
            <ContactView
              onNavigate={handleNavigate}
              onOpenStoreModal={() => setIsStoreModalOpen(true)}
            />
          )}

          {currentView === 'review' && (
            <ReviewDrawView
              onNavigate={handleNavigate}
              onOpenStoreModal={() => setIsStoreModalOpen(true)}
            />
          )}

          {currentView === 'menu' && (
            <>
              {/* Hero Banner */}
              <HeroBanner />

          {/* Sticky Category Tabs */}
          <CategoryNav
            activeCategory={activeCategory}
            onSelectCategory={(id) => {
              setActiveCategory(id);
              if (id === 'all') {
                const menuElem = document.getElementById('menu-section');
                if (menuElem) {
                  menuElem.scrollIntoView({ behavior: 'smooth' });
                }
              } else {
                const catElem = document.getElementById(`cat-${id}`);
                if (catElem) {
                  catElem.scrollIntoView({ behavior: 'smooth' });
                }
              }
            }}
          />

          {/* ── Main Menu Section ──────────────────────────────────────────────── */}
          <main id="menu-section" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-12 sm:pb-16">
            {/* Continuous Separated Category Sections matching reference screenshots */}
            <div className="space-y-12 sm:space-y-16">
              {CATEGORIES.map((category) => {
                const catItems = MENU_ITEMS.filter((i) => i.categoryId === category.id);
                if (catItems.length === 0) return null;

                return (
                  <React.Fragment key={category.id}>
                    {/* Category Section */}
                    <section
                      id={`cat-${category.id}`}
                      className="scroll-mt-32 sm:scroll-mt-36"
                    >
                      {category.id === 'pops' && (
                        <span id="cat-quick_bites" className="scroll-mt-32 sm:scroll-mt-36 sr-only" />
                      )}
                      {/* Centered Category Title */}
                      <div className="text-center mb-5 sm:mb-7">
                        <h2 className="text-3xl sm:text-4xl font-black font-black-grotesque text-black tracking-tight uppercase">
                          {category.name}
                        </h2>

                        {/* Signature Brand Yellow Underline */}
                        <div className="w-12 sm:w-14 h-[3px] bg-[#FFD100] mx-auto mt-2.5 mb-5" />

                        {/* Subtitle if present (e.g. Wraps, Salads) */}
                        {category.subtitle && (
                          <p className="text-zinc-800 text-xs sm:text-sm font-medium italic text-center max-w-2xl mx-auto mb-3.5 px-4">
                            {category.subtitle}
                          </p>
                        )}

                        {/* Rectangular Tag Box */}
                        {category.tagBox && (
                          <div className="flex justify-center mb-6 sm:mb-8">
                            <span className="inline-block border-[1.5px] border-black bg-white px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-[13px] font-bold uppercase tracking-wider text-black">
                              {category.tagBox}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* 2-Column Cards Grid with food images visible */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 max-w-5xl mx-auto">
                        {catItems.map((item) => {
                          const isOutOfStock = outOfStockIds.includes(item.id);

                          return (
                            <div
                              key={item.id}
                              onClick={() => {
                                if (isOutOfStock) {
                                  triggerSoldOutToast(item.name);
                                  return;
                                }
                                setSelectedItem(item);
                              }}
                              className="bg-white border border-zinc-200 border-b-[3px] border-b-black rounded-none p-3.5 sm:p-4.5 flex items-center justify-between hover:border-black hover:shadow-md transition-all cursor-pointer group select-none gap-3 sm:gap-4"
                            >
                              <div className="flex items-center gap-3 sm:gap-3.5 flex-1 min-w-0">
                                {item.image && (
                                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0">
                                    <div className="w-full h-full rounded-md overflow-hidden bg-zinc-100 border border-zinc-200/80">
                                      <img
                                        src={getCdnThumbnailUrl(item.image)}
                                        alt={item.name}
                                        width="80"
                                        height="80"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        loading="lazy"
                                        decoding="async"
                                        onError={(e) => {
                                          const target = e.target as HTMLImageElement;
                                          if (item.image && target.src !== item.image) {
                                            target.src = item.image;
                                          } else {
                                            target.src = '/assets/afros/images/afros-burger.jpg';
                                          }
                                        }}
                                      />
                                    </div>
                                    {/* (1) Small yellow banner with "SOLD OUT" in black on the top border: 50% on image, 50% outside, length just short of image width */}
                                    {isOutOfStock && (
                                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-[88%] z-10 pointer-events-none">
                                        <div className="bg-[#FFD100] text-black font-black font-black-grotesque text-[9px] sm:text-[10px] uppercase tracking-wider text-center py-0.5 shadow-xs border border-black/20 leading-tight rounded-[3px]">
                                          SOLD OUT
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <h3 className="text-xs sm:text-[13px] font-black text-black uppercase tracking-wider group-hover:text-black leading-tight">
                                      {item.name}
                                    </h3>
                                    {item.badge && (
                                      <span className="hidden sm:inline-block px-1.5 py-0.5 bg-[#FFD100] text-black text-[9px] font-black uppercase tracking-wider shrink-0">
                                        {item.badge}
                                      </span>
                                    )}
                                  </div>
                                  {item.subtitle && (
                                    <p className="text-[11px] sm:text-xs text-zinc-500 font-medium mt-1 leading-snug">
                                      {item.subtitle}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 ml-1">
                                <span className="text-xs sm:text-sm font-black text-black tracking-tight whitespace-nowrap">
                                  R{item.price.toFixed(0)}
                                </span>
                                {/* (5 & 6) Turn yellow + icon into grey icon without extra text */}
                                <span
                                  className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs transition-colors shadow-2xs shrink-0 ${
                                    isOutOfStock
                                      ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed select-none'
                                      : 'bg-[#FFD100] group-hover:bg-black group-hover:text-[#FFD100] text-black'
                                  }`}
                                  title={isOutOfStock ? 'Sold out today' : 'Customize & Add'}
                                >
                                  +
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </section>

                    {/* ── AFRO'S PAELLA BANNER (Under WRAPS) matching media_1792252750055.jpg & media_1792253354349.png ── */}
                    {category.id === 'wraps' && (() => {
                      const isPaellaOut = outOfStockIds.includes('afros-paella');
                      return (
                        <div
                          onClick={() => {
                            if (isPaellaOut) {
                              triggerSoldOutToast("Afro’s Paella");
                              return;
                            }
                            const paella = MENU_ITEMS.find((i) => i.id === 'afros-paella');
                            if (paella) setSelectedItem(paella);
                          }}
                          className={`bg-black text-white max-w-5xl mx-auto my-8 sm:my-14 px-6 sm:px-10 py-7 sm:py-8 transition-all select-none shadow-md ${
                            isPaellaOut
                              ? 'opacity-70 cursor-not-allowed ring-1 ring-zinc-700'
                              : 'cursor-pointer group hover:ring-2 hover:ring-[#FFD100]'
                          }`}
                        >
                          {/* Mobile Layout (< md) */}
                          <div className="flex md:hidden flex-col items-center text-center">
                            <div className="mb-1 flex items-center gap-2">
                              <span className="font-black font-black-grotesque text-[#FFD100] text-3xl transform -rotate-12 inline-block tracking-wider">
                                NEW
                              </span>
                              {isPaellaOut && (
                                <span className="px-2 py-0.5 bg-[#FFD100] text-black font-black font-black-grotesque text-xs uppercase tracking-wider rounded-[3px] border border-black/20 shadow-xs">
                                  SOLD OUT
                                </span>
                              )}
                            </div>
                            <h3 className="font-black font-black-grotesque text-2xl sm:text-3xl tracking-wide uppercase mb-3 text-white">
                              AFRO’S PAELLA
                            </h3>
                            <p className="font-bold text-xs sm:text-sm text-white/80 tracking-wider uppercase max-w-xs mx-auto mb-4 leading-relaxed">
                              JUICY STRIPS WITH SAVOURY RICE & DRESSING (GRILLED OR CRISPY)
                            </p>
                            <div className="flex items-center gap-3">
                              <div className="font-black font-black-grotesque text-2xl sm:text-3xl text-white">
                                R79
                              </div>
                            </div>
                          </div>

                          {/* Desktop Layout (>= md) */}
                          <div className="hidden md:flex items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                              <span className="font-black font-black-grotesque text-[#FFD100] text-3xl transform -rotate-12 inline-block tracking-wider shrink-0">
                                NEW
                              </span>
                              <div className="flex items-center gap-3">
                                <h3 className="font-black font-black-grotesque text-2xl lg:text-3xl tracking-wide uppercase whitespace-nowrap text-white">
                                  AFRO’S PAELLA
                                </h3>
                                {isPaellaOut && (
                                  <span className="px-2.5 py-1 bg-[#FFD100] text-black font-black font-black-grotesque text-xs uppercase tracking-wider rounded-[3px] border border-black/20 shadow-xs">
                                    SOLD OUT
                                  </span>
                                )}
                              </div>
                            </div>
                            <p className="font-bold text-xs lg:text-sm text-white/80 tracking-wider uppercase text-center max-w-md leading-relaxed px-4">
                              JUICY STRIPS WITH SAVOURY RICE & DRESSING (GRILLED OR CRISPY)
                            </p>
                            <div className="flex items-center gap-4 shrink-0">
                              <div className="font-black font-black-grotesque text-2xl lg:text-3xl text-white whitespace-nowrap">
                                R79
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* ── Authentic Black Banner: ADD SOME MORE & CHOOSE YOUR AFRO'S FLAVOUR (Before Schnitzel) ── */}
                    {category.id === 'flamed' && (
                      <div className="bg-black text-white max-w-5xl mx-auto my-8 sm:my-14 px-6 sm:px-12 py-7 sm:py-9 shadow-md">
                        {/* Mobile View (< md) matching media_1792252750058.jpg */}
                        <div className="md:hidden flex flex-col items-center text-center">
                          <h4 className="text-[#FFD100] font-black font-black-grotesque text-xl uppercase tracking-wider mb-4">
                            ADD SOME MORE
                          </h4>
                          <div className="w-full max-w-[200px] space-y-2 mb-6 text-base font-bold text-white tracking-widest">
                            <div className="flex justify-between items-center">
                              <span>AVO</span>
                              <span>18</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>CHEESE</span>
                              <span>12</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>BACON</span>
                              <span>18</span>
                            </div>
                          </div>

                          {/* 5 Flavour Icons */}
                          <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 mb-4">
                            {FLAVOURS.map((f) => (
                              <div
                                key={f.id}
                                className="flex flex-col items-center group cursor-pointer"
                                title={`${f.name} — ${f.description}`}
                              >
                                <div className="w-11 h-11 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-md border border-zinc-200">
                                  {f.badgeUrl ? (
                                    <img
                                      src={f.badgeUrl}
                                      alt={f.name}
                                      className="w-full h-full object-contain p-0.5"
                                    />
                                  ) : (
                                    <span className="text-sm">{f.emoji}</span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Yellow Line & Label */}
                          <div className="w-full max-w-[280px] h-[1.5px] bg-[#FFD100] my-2" />
                          <span className="text-xs font-black font-black-grotesque uppercase tracking-wider text-white text-center mt-1">
                            CHOOSE YOUR AFRO'S FLAVOUR
                          </span>
                        </div>

                        {/* Desktop View (>= md) matching media_1792250052064.png */}
                        <div className="hidden md:grid md:grid-cols-2 gap-8 items-center">
                          {/* Left Column: ADD SOME MORE */}
                          <div className="flex flex-col justify-center border-r border-zinc-800 pr-10">
                            <h4 className="text-[#FFD100] font-black font-black-grotesque text-sm uppercase tracking-wider mb-3">
                              ADD SOME MORE
                            </h4>
                            <div className="space-y-2 text-sm font-bold text-white tracking-widest max-w-xs">
                              <div className="flex justify-between items-center border-b border-zinc-800/80 pb-1.5">
                                <span>AVO</span>
                                <span>18</span>
                              </div>
                              <div className="flex justify-between items-center border-b border-zinc-800/80 pb-1.5">
                                <span>CHEESE</span>
                                <span>12</span>
                              </div>
                              <div className="flex justify-between items-center pb-0.5">
                                <span>BACON</span>
                                <span>18</span>
                              </div>
                            </div>
                          </div>

                          {/* Right Column: CHOOSE YOUR AFRO'S FLAVOUR */}
                          <div className="flex flex-col items-center justify-center">
                            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3">
                              {FLAVOURS.map((f) => (
                                <div
                                  key={f.id}
                                  className="flex flex-col items-center group cursor-pointer"
                                  title={`${f.name} — ${f.description}`}
                                >
                                  <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-md border border-zinc-200 hover:scale-110 transition-transform">
                                    {f.badgeUrl ? (
                                      <img
                                        src={f.badgeUrl}
                                        alt={f.name}
                                        className="w-full h-full object-contain p-0.5"
                                      />
                                    ) : (
                                      <span className="text-sm">{f.emoji}</span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="w-full max-w-xs h-[1px] bg-[#FFD100]/60 my-2" />
                            <span className="text-xs font-black font-black-grotesque uppercase tracking-wider text-white text-center">
                              CHOOSE YOUR AFRO'S FLAVOUR
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </main>

          {/* Brand Highlights & Flavour Meter */}
          <BrandHighlights />

          {/* Store Location & Hours Section */}
          <StoreLocatorSection />
        </>
      )}

      {/* Footer with Legal Links & Staff Portal */}
      <Footer
        onOpenLegal={(tab) => {
          setLegalTab(tab);
          setIsLegalModalOpen(true);
        }}
        onNavigate={handleNavigate}
        onOpenStaffLogin={() => {
          setStaffLoginInitialRole('kitchen');
          setIsStaffLoginOpen(true);
        }}
      />
    </>
  )}

  {/* Modals & Drawers */}
  {selectedItem && (
    <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
  )}
  
  <CartDrawer onOpenCheckout={() => setIsCheckoutOpen(true)} />

  <CheckoutModal
    isOpen={isCheckoutOpen}
    onClose={() => setIsCheckoutOpen(false)}
    onOrderSuccess={(payload) => {
      setTrackedOrderId(payload.orderId);
      handleNavigate('track');
    }}
  />

  <StoreModal
    isOpen={isStoreModalOpen}
    onClose={() => setIsStoreModalOpen(false)}
  />

  <LegalModal
    isOpen={isLegalModalOpen}
    initialTab={legalTab}
    onClose={() => setIsLegalModalOpen(false)}
  />

  <StaffLoginModal
    isOpen={isStaffLoginOpen}
    initialRole={staffLoginInitialRole}
    onClose={() => setIsStaffLoginOpen(false)}
    onSuccess={(role) => {
      setStaffRole(role);
      setIsStaffLoginOpen(false);
      if (role === 'admin') {
        handleNavigate('admin');
      } else if (role === 'kitchen') {
        handleNavigate('kitchen');
      } else {
        handleNavigate('delivery');
      }
    }}
  />

  {/* Elegant Sold Out Item Toast Notification */}
  {soldOutToast && (
    <div className="fixed top-20 sm:top-24 left-1/2 -translate-x-1/2 z-50 animate-bounce px-4 max-w-md w-full pointer-events-none">
      <div className="bg-[#14141c]/95 border-2 border-[#FFD100]/60 text-white rounded-2xl p-3 sm:p-3.5 shadow-2xl backdrop-blur-md flex items-center justify-between gap-3 pointer-events-auto">
        <div className="flex items-center gap-2.5 min-w-0">
          <AlertCircle className="w-4 h-4 text-[#FFD100] shrink-0" />
          <span className="text-xs font-bold text-zinc-200 truncate">
            <strong className="text-white">{soldOutToast}</strong> is currently sold out today.
          </span>
        </div>
        <button
          type="button"
          onClick={() => setSoldOutToast(null)}
          className="p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )}

  {/* Cookie & POPIA Privacy Notice */}
  <CookieBanner
    onOpenPrivacyPolicy={(tab) => {
      setLegalTab(tab);
      setIsLegalModalOpen(true);
    }}
  />

  {/* Persistent Active Order Floating Banner (Pedros / Uber Eats style) */}
  {activeOrder &&
    activeOrder.status !== 'completed' &&
    activeOrder.status !== 'cancelled' &&
    currentView !== 'kitchen' &&
    currentView !== 'delivery' &&
    currentView !== 'track' && (
      <div
        className={`fixed z-30 animate-slideUp transition-all ${
          totalItemCount > 0
            ? 'bottom-18 lg:bottom-6 left-3 right-3 lg:left-auto lg:right-6 lg:w-96'
            : 'bottom-4 lg:bottom-6 left-3 right-3 lg:left-auto lg:right-6 lg:w-96'
        }`}
      >
        <div className="relative group">
          <button
            type="button"
            onClick={() => {
              setTrackedOrderId(activeOrder.orderId);
              handleNavigate('track');
            }}
            className="w-full p-3 sm:p-3.5 rounded-2xl bg-white/95 border-2 border-[#FFD100] shadow-2xl flex items-center justify-between gap-3 text-zinc-950 backdrop-blur-md cursor-pointer hover:border-amber-400 transition-colors"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="flex h-3 w-3 rounded-full bg-amber-500 animate-ping shrink-0" />
              <div className="text-left truncate">
                <div className="text-xs font-black truncate flex items-center gap-1.5 text-zinc-950">
                  <span>Order #{activeOrder.orderId}</span>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                    {activeOrder.preferredTime}
                  </span>
                </div>
                <div className="text-[11px] text-zinc-600 font-medium truncate">
                  {activeOrder.status === 'received' && '📝 Kitchen preparing ticket'}
                  {activeOrder.status === 'cooking' && '🔥 On The Flame Grill'}
                  {activeOrder.status === 'ready' && '🛍️ Hot & ready for collection'}
                  {activeOrder.status === 'dispatched' && '🏍️ Out for delivery with driver'}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="px-3 py-1.5 rounded-xl bg-[#FFD100] hover:bg-[#ffe14d] text-zinc-950 font-black text-xs shadow-md">
                Track ➔
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveOrder(null);
                  clearCurrentOrder();
                }}
                className="w-6 h-6 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-black flex items-center justify-center text-xs font-bold cursor-pointer transition-colors"
                title="Dismiss order banner"
              >
                ✕
              </button>
            </div>
          </button>
        </div>
      </div>
    )}

  {/* Mobile Floating Bottom Cart Bar */}
  {totalItemCount > 0 && currentView !== 'kitchen' && currentView !== 'delivery' && currentView !== 'track' && (
    <div className="lg:hidden fixed bottom-3 left-3 right-3 z-30 animate-slideUp">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="w-full py-3.5 px-4 rounded-2xl bg-[#FFD100] hover:bg-[#ffe14d] text-zinc-950 font-black text-sm tracking-wide shadow-2xl flex items-center justify-between border-2 border-amber-400 cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-black/10 text-zinc-950 font-black flex items-center justify-center text-xs">
                {totalItemCount}
              </div>
              <span>View Cart & Checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-zinc-950 font-black">R{grandTotal.toFixed(2)}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      )}

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ErrorBoundary fallbackTitle="Afro's Chicken Shop (Hillcrest) App Recovery">
      <CartProvider>
        <MainContent />
      </CartProvider>
    </ErrorBoundary>
  );
};

export default App;
