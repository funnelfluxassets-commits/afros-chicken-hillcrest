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
import { StoryView } from './components/StoryView';
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
import { CheckoutPayload, isPayFastStaffTestMode, setPayFastStaffTestMode } from './services/payment';
import { subscribeToOrders, getCurrentOrderId, setCurrentOrderId, createLiveOrder, recordCancelledOrder } from './services/orderService';
import { logPageView, logItemView, fetchAndSyncClientIp, isAnalyticsExcluded, setDeviceAnalyticsExcluded } from './services/analyticsService';
import { Search, ShoppingBag, ArrowRight, Flame, ShieldAlert, CheckCircle2, X } from 'lucide-react';

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
    if (categoryId) {
      setActiveCategory(categoryId);
    }
    setCurrentView(view);
    if (typeof window !== 'undefined') {
      if (view === 'main') {
        if (window.location.hash) {
          history.replaceState(null, '', window.location.pathname + window.location.search);
        }
      } else {
        window.location.hash = view;
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
          <main id="menu-section" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10">
            {/* Search Bar Header */}
            <div className="max-w-5xl mx-auto mb-8 sm:mb-12">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-zinc-200">
                <div className="text-left w-full sm:w-auto">
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-[#b89500] fill-[#FFD100]" />
                    <h2 className="text-lg sm:text-xl font-black text-black uppercase tracking-wider font-black-grotesque">
                      Fresh Flame-Grilled Durban Menu
                    </h2>
                  </div>
                  <p className="text-xs text-zinc-500 font-medium mt-0.5">
                    Click any item to choose basting flavour, sides, and extras
                  </p>
                </div>

                {/* Search Input */}
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search chicken, wrap, wings, drinks..."
                    className="w-full pl-9 pr-8 py-2 rounded-lg bg-zinc-50 border border-zinc-300 text-xs text-black placeholder-zinc-400 focus:outline-none focus:border-black transition-colors font-medium"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black text-xs font-bold p-1 cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* If searching, display search results */}
            {searchQuery.trim() ? (
              <div className="max-w-5xl mx-auto">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xl font-black text-black uppercase tracking-tight">
                    Search Results for "{searchQuery}"
                  </h3>
                  <span className="text-xs font-bold text-zinc-500">
                    {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} found
                  </span>
                </div>

                {filteredItems.length === 0 ? (
                  <div className="p-12 text-center rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
                    <span className="text-3xl">🔍</span>
                    <h3 className="text-base font-black text-black uppercase">No items found</h3>
                    <p className="text-xs text-zinc-500">
                      Try searching with different keywords or view all categories below.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="px-4 py-2 rounded-xl bg-[#FFD100] hover:bg-[#ffe14d] text-black text-xs font-black uppercase tracking-wider mt-2 cursor-pointer border border-black/10"
                    >
                      Clear Search
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredItems.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedItem(item)}
                        className="bg-white border border-zinc-200 border-b-[3px] border-b-black rounded-none p-4 sm:p-5 flex items-center justify-between hover:border-black hover:shadow-md transition-all cursor-pointer group select-none"
                      >
                        <div className="pr-3 flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="text-xs sm:text-sm font-black text-black uppercase tracking-wider group-hover:text-black">
                              {item.name}
                            </h3>
                            {item.badge && (
                              <span className="hidden sm:inline-block px-1.5 py-0.5 bg-[#FFD100] text-black text-[9px] font-black uppercase tracking-wider">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          {item.subtitle && (
                            <p className="text-[11px] sm:text-xs text-zinc-500 font-medium mt-1">
                              {item.subtitle}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2.5 shrink-0 ml-3">
                          <span className="text-xs sm:text-sm font-black text-black tracking-tight whitespace-nowrap">
                            R{item.price.toFixed(0)}
                          </span>
                          <span
                            className="w-7 h-7 rounded-full bg-[#FFD100] group-hover:bg-black group-hover:text-[#FFD100] text-black flex items-center justify-center font-black text-xs transition-colors shadow-2xs shrink-0"
                            title="Customize & Add"
                          >
                            +
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* Continuous Separated Category Sections matching reference screenshots */
              <div className="space-y-12 sm:space-y-16">
                {CATEGORIES.map((category) => {
                  const catItems = MENU_ITEMS.filter((i) => i.categoryId === category.id);
                  if (catItems.length === 0) return null;

                  return (
                    <React.Fragment key={category.id}>
                      {/* Authentic Black Banner before Schnitzel (media_1792250052064.png) */}
                      {category.id === 'schnitzel' && (
                        <div className="bg-black text-white max-w-5xl mx-auto my-8 sm:my-14 px-6 sm:px-12 py-7 sm:py-8 border-b-4 border-b-[#FFD100] shadow-md">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            {/* Left Column: ADD SOME MORE */}
                            <div className="flex flex-col justify-center md:border-r md:border-zinc-800 md:pr-10">
                              <h4 className="text-[#FFD100] font-black text-xs sm:text-sm uppercase tracking-wider mb-3">
                                ADD SOME MORE
                              </h4>
                              <div className="space-y-2 text-xs sm:text-sm font-bold text-white tracking-widest max-w-xs">
                                <div className="flex justify-between items-center border-b border-zinc-800/80 pb-1.5">
                                  <span>AVO</span>
                                  <span>18</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-zinc-800/80 pb-1.5">
                                  <span>CHEESE</span>
                                  <span>10</span>
                                </div>
                                <div className="flex justify-between items-center pb-0.5">
                                  <span>BACON</span>
                                  <span>18</span>
                                </div>
                              </div>
                            </div>

                            {/* Right Column: CHOOSE YOUR AFRO'S FLAVOUR */}
                            <div className="flex flex-col items-center justify-center">
                              <div className="flex items-center justify-center gap-2.5 sm:gap-4 mb-3">
                                {FLAVOURS.map((f) => (
                                  <div
                                    key={f.id}
                                    className="flex flex-col items-center group cursor-pointer"
                                    title={`${f.name} — ${f.description}`}
                                  >
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-md border border-zinc-200 hover:scale-110 transition-transform">
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
                              <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-white text-center">
                                CHOOSE YOUR AFRO'S FLAVOUR
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Category Section */}
                      <section
                        id={`cat-${category.id}`}
                        className="scroll-mt-32 sm:scroll-mt-36"
                      >
                        {/* Centered Category Title */}
                        <div className="text-center mb-6 sm:mb-8">
                          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-black-grotesque text-black tracking-wide uppercase">
                            {category.name}
                          </h2>

                          {/* Signature Brand Yellow Underline */}
                          <div className="w-14 sm:w-16 h-1 bg-[#FFD100] mx-auto mt-2 mb-3.5" />

                          {/* Subtitle if present (e.g. Wraps, Salads) */}
                          {category.subtitle && (
                            <p className="text-zinc-800 text-xs sm:text-sm font-medium italic text-center max-w-2xl mx-auto mb-3 px-4">
                              {category.subtitle}
                            </p>
                          )}

                          {/* Rectangular Tag Box if present */}
                          {category.tagBox && (
                            <div className="flex justify-center mt-3">
                              <span className="inline-block border border-black bg-white px-5 sm:px-7 py-1.5 sm:py-2 text-[10px] sm:text-xs font-black uppercase tracking-widest text-black shadow-2xs">
                                {category.tagBox}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* 2-Column Cards Grid matching media_1792250052062.png, 063.png, 064.png */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
                          {catItems.map((item) => (
                            <div
                              key={item.id}
                              onClick={() => setSelectedItem(item)}
                              className="bg-white border border-zinc-200 border-b-[3px] border-b-black rounded-none p-4 sm:p-5 flex items-center justify-between hover:border-black hover:shadow-md transition-all cursor-pointer group select-none"
                            >
                              <div className="pr-3 flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <h3 className="text-xs sm:text-sm font-black text-black uppercase tracking-wider group-hover:text-black">
                                    {item.name}
                                  </h3>
                                  {item.badge && (
                                    <span className="hidden sm:inline-block px-1.5 py-0.5 bg-[#FFD100] text-black text-[9px] font-black uppercase tracking-wider">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                {item.subtitle && (
                                  <p className="text-[11px] sm:text-xs text-zinc-500 font-medium mt-1">
                                    {item.subtitle}
                                  </p>
                                )}
                              </div>
                              <div className="flex items-center gap-2.5 shrink-0 ml-3">
                                <span className="text-xs sm:text-sm font-black text-black tracking-tight whitespace-nowrap">
                                  R{item.price.toFixed(0)}
                                </span>
                                <span
                                  className="w-7 h-7 rounded-full bg-[#FFD100] group-hover:bg-black group-hover:text-[#FFD100] text-black flex items-center justify-center font-black text-xs transition-colors shadow-2xs shrink-0"
                                  title="Customize & Add"
                                >
                                  +
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                    </React.Fragment>
                  );
                })}
              </div>
            )}
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
  <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
  
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
        <button
          type="button"
          onClick={() => {
            setTrackedOrderId(activeOrder.orderId);
            handleNavigate('track');
          }}
          className="w-full p-3 sm:p-3.5 rounded-2xl bg-[#14141c]/95 border-2 border-rose-500 shadow-2xl flex items-center justify-between gap-3 text-white backdrop-blur-md cursor-pointer hover:border-amber-400 transition-colors"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="flex h-3 w-3 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <div className="text-left truncate">
              <div className="text-xs font-black truncate flex items-center gap-1.5">
                <span>Order #{activeOrder.orderId}</span>
                <span className="text-[10px] font-bold text-amber-300">
                  {activeOrder.preferredTime}
                </span>
              </div>
              <div className="text-[11px] text-zinc-300 truncate">
                {activeOrder.status === 'received' && '📝 Kitchen preparing ticket'}
                {activeOrder.status === 'cooking' && '🔥 On The Flame Grill'}
                {activeOrder.status === 'ready' && '🛍️ Hot & ready for collection'}
                {activeOrder.status === 'dispatched' && '🏍️ Out for delivery with driver'}
              </div>
            </div>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 text-white font-extrabold text-xs shrink-0 shadow-md">
            Track ➔
          </div>
        </button>
      </div>
    )}

  {/* Mobile Floating Bottom Cart Bar */}
  {totalItemCount > 0 && currentView !== 'kitchen' && currentView !== 'delivery' && currentView !== 'track' && (
    <div className="lg:hidden fixed bottom-3 left-3 right-3 z-30 animate-slideUp">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-red-600 text-white font-black text-sm tracking-wide shadow-2xl shadow-rose-950/80 flex items-center justify-between border border-white/20 cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-black/30 flex items-center justify-center text-xs">
                {totalItemCount}
              </div>
              <span>View Cart & Checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-300 font-extrabold">R{grandTotal.toFixed(2)}</span>
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
