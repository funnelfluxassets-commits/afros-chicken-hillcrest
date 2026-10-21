import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, FileText, Lock, Scale, RotateCcw, Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import { STORES } from '../data/stores';

export type LegalTab = 'privacy' | 'terms' | 'refunds';

interface LegalModalProps {
  isOpen: boolean;
  initialTab?: LegalTab;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, initialTab = 'privacy', onClose }) => {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);
  const store = STORES[0];

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      const prevBodyOverflow = document.body.style.overflow;
      const prevHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevBodyOverflow;
        document.documentElement.style.overflow = prevHtmlOverflow;
      };
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-x-hidden overflow-y-auto animate-fadeIn touch-pan-y"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl lg:max-w-3xl max-h-[88vh] rounded-2xl sm:rounded-3xl bg-[#141419] border border-white/10 shadow-2xl flex flex-col overflow-hidden text-zinc-300 mx-auto my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-3.5 sm:p-5 bg-zinc-950 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="p-2 rounded-xl bg-[#FFD100]/10 text-[#FFD100] border border-[#FFD100]/20 shrink-0">
              {activeTab === 'privacy' && <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />}
              {activeTab === 'terms' && <Scale className="w-4 h-4 sm:w-5 sm:h-5" />}
              {activeTab === 'refunds' && <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />}
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-lg font-black text-white font-black-grotesque uppercase tracking-wide truncate">
                {activeTab === 'privacy' && 'Privacy Policy (POPIA)'}
                {activeTab === 'terms' && 'Terms of Service'}
                {activeTab === 'refunds' && 'Refund & Cancellation Policy'}
              </h2>
              <p className="text-[11px] sm:text-xs text-zinc-400 font-semibold truncate">
                Afro's Chicken Shop (Hillcrest) • South Africa
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer shrink-0 ml-2"
            aria-label="Close"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Tab Switcher - Horizontal scroll on small mobile, clean grid on desktop */}
        <div className="px-3 sm:px-6 pt-2 sm:pt-3 bg-zinc-950/70 border-b border-white/5 shrink-0 overflow-x-auto">
          <div className="flex sm:grid sm:grid-cols-3 gap-1.5 sm:gap-2 whitespace-nowrap">
            <button
              type="button"
              onClick={() => setActiveTab('privacy')}
              className={`pb-2.5 sm:pb-3 px-2.5 sm:px-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 text-center ${
                activeTab === 'privacy'
                  ? 'border-[#FFD100] text-[#FFD100]'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Lock className="w-3.5 h-3.5 shrink-0" />
              <span>Privacy Policy</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('terms')}
              className={`pb-2.5 sm:pb-3 px-2.5 sm:px-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 text-center ${
                activeTab === 'terms'
                  ? 'border-[#FFD100] text-[#FFD100]'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5 shrink-0" />
              <span>Terms of Service</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('refunds')}
              className={`pb-2.5 sm:pb-3 px-2.5 sm:px-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 text-center ${
                activeTab === 'refunds'
                  ? 'border-[#FFD100] text-[#FFD100]'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5 shrink-0" />
              <span>Refund &amp; Cancellation</span>
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-3.5 sm:p-7 overflow-y-auto overflow-x-hidden space-y-4 sm:space-y-6 text-xs sm:text-sm leading-relaxed text-zinc-300 break-words overscroll-contain">
          
          {/* ─────────────────────────────────────────────────────────────────── */}
          {/* TAB 1: PRIVACY POLICY                                              */}
          {/* ─────────────────────────────────────────────────────────────────── */}
          {activeTab === 'privacy' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="p-3.5 sm:p-4 rounded-2xl bg-zinc-900 border border-[#FFD100]/20 space-y-1.5">
                <div className="text-xs font-black text-[#FFD100] uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>POPIA Compliance Statement</span>
                </div>
                <p className="text-xs text-zinc-300 leading-normal">
                  Afro's Chicken Shop (Hillcrest) is fully committed to protecting your personal information in compliance with the
                  Protection of Personal Information Act No. 4 of 2013 (POPIA) of the Republic of South Africa.
                </p>
                <div className="text-[11px] text-zinc-500 pt-0.5">
                  Last Updated: October 2026 • Effective Date: Immediately
                </div>
              </div>

              <section className="space-y-2">
                <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wide flex items-center gap-2">
                  <span className="text-[#FFD100]">1.</span> Responsible Party
                </h3>
                <p>
                  This Privacy Policy applies to all personal information collected and processed by{' '}
                  <strong className="text-white">Afro's Chicken Shop (Hillcrest)</strong> ("we", "us", or "our"),
                  operating at Shop 5, The Junction, 5 Inanda Road, Hillcrest, 3650, KwaZulu-Natal, South Africa.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wide flex items-center gap-2">
                  <span className="text-[#FFD100]">2.</span> Information We Collect
                </h3>
                <p>When you browse our website or place an order for takeaway collection or direct delivery, we may collect:</p>
                <ul className="list-disc pl-4 sm:pl-5 space-y-1.5 text-zinc-400">
                  <li>
                    <strong className="text-zinc-200">Customer Identification:</strong> Full name, mobile telephone number, and email address.
                  </li>
                  <li>
                    <strong className="text-zinc-200">Delivery Information:</strong> Physical delivery address, suburb (Hillcrest, Kloof, Waterfall, Gillitts, Assagay, Winston Park, etc.), complex or unit details, access gate instructions, and driver notes.
                  </li>
                  <li>
                    <strong className="text-zinc-200">Order Information:</strong> Items selected (steam-grilled burgers, strips, wings, hand-cut tjips, basting selections), dietary requirements, and order history.
                  </li>
                  <li>
                    <strong className="text-zinc-200">Payment Information:</strong> Transaction status and reference numbers. Payments are securely processed via certified South African payment providers (PayFast, Yoco, Ozow / Instant EFT, and card speedpoints). <em className="text-[#FFD100]">We never store your credit card numbers, CVVs, or banking credentials.</em>
                  </li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wide flex items-center gap-2">
                  <span className="text-[#FFD100]">3.</span> Purpose of Processing
                </h3>
                <p>We process your personal information strictly for legitimate business and hospitality purposes:</p>
                <ul className="list-disc pl-4 sm:pl-5 space-y-1.5 text-zinc-400">
                  <li>To prepare, package, and fulfill your takeaway or delivery food orders accurately.</li>
                  <li>To enable our delivery drivers to navigate directly to your address and deliver hot food on time.</li>
                  <li>To provide real-time WhatsApp or SMS notifications regarding your order readiness or delivery status.</li>
                  <li>To respond to customer enquiries, process refunds where applicable, and maintain statutory tax records.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wide flex items-center gap-2">
                  <span className="text-[#FFD100]">4.</span> Sharing of Information
                </h3>
                <p>
                  We treat your personal data with absolute confidentiality. We{' '}
                  <strong className="text-[#FFD100]">never sell, rent, or trade</strong> your personal information to third parties. Information is only shared with:
                </p>
                <ul className="list-disc pl-4 sm:pl-5 space-y-1.5 text-zinc-400">
                  <li>
                    <strong className="text-zinc-200">Dedicated Delivery Personnel:</strong> Exclusively to locate and contact you for meal handover.
                  </li>
                  <li>
                    <strong className="text-zinc-200">Certified Payment Processors:</strong> For secure, tokenized transaction authorization.
                  </li>
                  <li>
                    <strong className="text-zinc-200">Regulatory Authorities:</strong> Only when strictly mandated by South African law.
                  </li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wide flex items-center gap-2">
                  <span className="text-[#FFD100]">5.</span> Data Security
                </h3>
                <p>
                  We implement industry-standard technical and operational safeguards to protect your data against loss, unauthorized access, or misuse. All website transmissions are encrypted end-to-end via Secure Sockets Layer (SSL/HTTPS).
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wide flex items-center gap-2">
                  <span className="text-[#FFD100]">6.</span> Your Rights Under POPIA
                </h3>
                <p>As a data subject in South Africa, you have the right to:</p>
                <ul className="list-disc pl-4 sm:pl-5 space-y-1.5 text-zinc-400">
                  <li>Request confirmation and access to personal records we hold regarding you.</li>
                  <li>Request the correction, updating, or deletion of inaccurate or outdated data.</li>
                  <li>Object to processing on reasonable grounds, subject to legal retention obligations.</li>
                  <li>Lodge a complaint with the Information Regulator of South Africa (inforeg.org.za).</li>
                </ul>
              </section>

              <section className="space-y-2.5 p-3.5 sm:p-4 rounded-2xl bg-zinc-900 border border-white/5">
                <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wide flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#FFD100] shrink-0" />
                  <span>7. Contact Our Information Officer</span>
                </h3>
                <p className="text-xs text-zinc-400">
                  If you have questions regarding this Privacy Policy or wish to exercise your POPIA rights, contact us directly:
                </p>
                <div className="space-y-1.5 text-xs text-zinc-300 pt-1 font-medium">
                  <div><strong className="text-white">Afro's Chicken Shop (Hillcrest)</strong> — Information Officer</div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#FFD100] shrink-0" />
                    <span>Shop 5, The Junction, 5 Inanda Road, Hillcrest, 3650, KZN</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#FFD100] shrink-0" />
                    <span>WhatsApp / Tel: 078 905 7975</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#FFD100] shrink-0" />
                    <span className="break-all">Email: info@afroschicken-hillcrest.co.za</span>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────────── */}
          {/* TAB 2: TERMS OF SERVICE                                            */}
          {/* ─────────────────────────────────────────────────────────────────── */}
          {activeTab === 'terms' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="p-3.5 sm:p-4 rounded-2xl bg-zinc-900 border border-[#FFD100]/20 space-y-1.5">
                <div className="text-xs font-black text-[#FFD100] uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Consumer Terms &amp; Conditions</span>
                </div>
                <p className="text-xs text-zinc-300 leading-normal">
                  These Terms govern your use of the Afro's Chicken Shop (Hillcrest) ordering platform in accordance with the
                  Consumer Protection Act No. 68 of 2008 (CPA) and Electronic Communications and Transactions Act No. 25 of 2002.
                </p>
                <div className="text-[11px] text-zinc-500 pt-0.5">
                  Last Updated: October 2026 • Applicable to all Orders &amp; Deliveries
                </div>
              </div>

              <section className="space-y-2">
                <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wide flex items-center gap-2">
                  <span className="text-[#FFD100]">1.</span> Agreement to Terms
                </h3>
                <p>
                  By accessing our website or placing an order with{' '}
                  <strong className="text-white">Afro's Chicken Shop (Hillcrest)</strong>, you agree to be bound by these Terms of Service.
                  If you do not agree with any part of these terms, please refrain from using our online ordering services.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wide flex items-center gap-2">
                  <span className="text-[#FFD100]">2.</span> Order Placement &amp; Preparation
                </h3>
                <ul className="list-disc pl-4 sm:pl-5 space-y-1.5 text-zinc-400">
                  <li>
                    Placing an order constitutes an offer to purchase food. All orders are subject to kitchen confirmation, ingredient availability, and delivery area feasibility.
                  </li>
                  <li>
                    Because our chicken is freshly steam-grilled and basted to order, and our potato tjips are hand-cut and prepared hot, cancellations cannot be accepted once the kitchen has commenced cooking.
                  </li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wide flex items-center gap-2">
                  <span className="text-[#FFD100]">3.</span> Pricing &amp; Currency
                </h3>
                <ul className="list-disc pl-4 sm:pl-5 space-y-1.5 text-zinc-400">
                  <li>All prices displayed are in South African Rands (ZAR) and inclusive of Value Added Tax (VAT).</li>
                  <li>
                    We reserve the right to correct any inadvertent typographical pricing errors prior to order confirmation.
                  </li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wide flex items-center gap-2">
                  <span className="text-[#FFD100]">4.</span> Collection &amp; Delivery Terms
                </h3>
                <ul className="list-disc pl-4 sm:pl-5 space-y-1.5 text-zinc-400">
                  <li>
                    <strong className="text-zinc-200">Store Collection:</strong> Orders must be collected from Afro's Chicken Shop, Shop 5, The Junction, 5 Inanda Road, Hillcrest within a reasonable window following your notification.
                  </li>
                  <li>
                    <strong className="text-zinc-200">Delivery Service:</strong> Delivery is provided throughout Hillcrest, Kloof, Waterfall, Gillitts, Winston Park, Assagay, Botha's Hill &amp; surrounding areas. Estimated delivery times are estimates and may fluctuate during peak meal hours, adverse weather, or heavy traffic.
                  </li>
                  <li>
                    <strong className="text-zinc-200">Customer Availability:</strong> Customers must ensure an authorized recipient is at the address, correct access gate codes are supplied, and driver calls are answered to complete handover.
                  </li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wide flex items-center gap-2">
                  <span className="text-[#FFD100]">5.</span> Food Quality &amp; Allergen Advisory
                </h3>
                <p>
                  We are passionate about fresh, uncomplicated food made well. Our meals feature fresh never-frozen chicken, real potato tjips, and signature sauces.
                  Our kitchen handles chicken, dairy (cheese, mayo), gluten/wheat (burger rolls, pitas), and sauces. While strict food safety and hygiene protocols are enforced, cross-contact may occur. If you have severe food allergies, please contact our team directly prior to ordering.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wide flex items-center gap-2">
                  <span className="text-[#FFD100]">6.</span> Quality Guarantee &amp; Customer Care
                </h3>
                <p>
                  In compliance with the Consumer Protection Act (CPA), we stand behind the quality of every meal. If your meal is incorrect or does not meet quality expectations:
                </p>
                <ul className="list-disc pl-4 sm:pl-5 space-y-1.5 text-zinc-400">
                  <li>Contact us via WhatsApp or phone at <strong className="text-[#FFD100]">078 905 7975</strong> within 2 hours of receiving your order.</li>
                  <li>Provide your order number and a quick description of the issue.</li>
                  <li>Our management team will promptly replace the item or process an appropriate credit/refund.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wide flex items-center gap-2">
                  <span className="text-[#FFD100]">7.</span> Governing Law
                </h3>
                <p>
                  These Terms of Service are governed by and construed in accordance with the laws of the Republic of South Africa. Any disputes will be subject to the jurisdiction of the South African courts.
                </p>
              </section>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────────── */}
          {/* TAB 3: REFUND & CANCELLATION POLICY                                */}
          {/* ─────────────────────────────────────────────────────────────────── */}
          {activeTab === 'refunds' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="p-3.5 sm:p-4 rounded-2xl bg-zinc-900 border border-[#FFD100]/20 space-y-1.5">
                <div className="text-xs font-black text-[#FFD100] uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Consumer Protection Act (CPA) &amp; PayFast Compliant</span>
                </div>
                <p className="text-xs text-zinc-300 leading-normal">
                  Last updated: October 2026. This Refund &amp; Cancellation Policy applies to all food orders, online transactions, collections, and deliveries placed with Afro's Chicken Shop (Hillcrest) via our website and secure payment gateway (PayFast).
                </p>
                <div className="text-[11px] text-zinc-500 pt-0.5">
                  CPA Section 56 Compliant • PayFast Merchant Standards
                </div>
              </div>

              <section className="space-y-2">
                <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wide flex items-center gap-2">
                  <span className="text-[#FFD100]">1.</span> Fresh Food &amp; Perishable Goods Nature
                </h3>
                <p>
                  At Afro's Chicken Shop (Hillcrest), every meal is prepared fresh to order using steam-grilled never-frozen chicken, real hand-cut potato tjips, and signature lemon &amp; fire bastings. Because our menu consists of freshly cooked, perishable food items intended for immediate consumption, standard statutory cooling-off periods under Section 44 of the Electronic Communications and Transactions Act (ECTA) do not apply to customized prepared meals. However, we strictly honor your statutory consumer rights under the South African Consumer Protection Act (No. 68 of 2008).
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wide flex items-center gap-2">
                  <span className="text-[#FFD100]">2.</span> Order Cancellation Policy
                </h3>
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-zinc-900 border border-white/5 space-y-1.5">
                    <div className="font-bold text-white text-xs flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      Before Kitchen Preparation Commences
                    </div>
                    <p className="text-xs text-zinc-300">
                      You may cancel your order free of charge within <strong className="text-white">5 minutes</strong> of placing it, or at any time before our kitchen team has accepted and commenced grilling or preparing your meal. If cancelled before preparation begins, you will receive a <strong className="text-[#FFD100]">100% full refund</strong> back to your original payment method.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-zinc-900 border border-white/5 space-y-1.5">
                    <div className="font-bold text-white text-xs flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      After Kitchen Preparation Has Commenced
                    </div>
                    <p className="text-xs text-zinc-300">
                      Once our grillmasters have accepted the order and started grilling, basting, or preparing your food, cancellations cannot be accepted as fresh ingredients and meals cannot be re-used or returned to stock.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-2">
                <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wide flex items-center gap-2">
                  <span className="text-[#FFD100]">3.</span> Order Accuracy &amp; Quality Guarantee
                </h3>
                <p>
                  We stand 100% behind the quality of our food. If your order falls short of our standards in any of the following circumstances, we will promptly make it right:
                </p>
                <ul className="list-disc pl-4 sm:pl-5 space-y-1.5 text-zinc-300">
                  <li><strong className="text-zinc-100">Incorrect Item Received:</strong> If you received an item different from what was ordered (e.g., incorrect burger, wrong basting level, missing sauce, or wrong drink).</li>
                  <li><strong className="text-zinc-100">Missing Items:</strong> If any paid item, side dish, sauce, or beverage was omitted from your sealed package.</li>
                  <li><strong className="text-zinc-100">Quality or Food Safety Issues:</strong> In the rare event that food is undercooked, damaged during transit, or fails our freshness standards.</li>
                </ul>
                <p className="text-zinc-400 pt-1">
                  Please notify our store team within <strong className="text-white">2 hours</strong> of receiving your order (or collection) by calling <strong className="text-[#FFD100]">078 905 7975</strong> or messaging our WhatsApp dispatch at <strong className="text-[#FFD100]">+27 78 905 7975</strong> with your Order ID and a photo of the affected item.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wide flex items-center gap-2">
                  <span className="text-[#FFD100]">4.</span> Resolution &amp; Remedy Options
                </h3>
                <p>
                  Upon validating an order accuracy or food quality issue, customer satisfaction is our top priority. In accordance with the Consumer Protection Act, we offer:
                </p>
                <ul className="list-disc pl-4 sm:pl-5 space-y-1.5 text-zinc-300">
                  <li><strong className="text-zinc-100">Immediate Replacement:</strong> Priority re-preparation and prompt dispatch/handover of the correct freshly grilled meal at no additional cost.</li>
                  <li><strong className="text-zinc-100">Store Credit / Voucher:</strong> An instant digital coupon or store credit code equal to or greater than the value of the affected item for your next order.</li>
                  <li><strong className="text-zinc-100">Monetary Refund:</strong> A full or partial refund of the purchase price (including the delivery fee if the entire order was unfulfilled or compromised).</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wide flex items-center gap-2">
                  <span className="text-[#FFD100]">5.</span> Refund Processing via PayFast
                </h3>
                <p>
                  All online payments (Visa, Mastercard, Instant EFT, Debit Card, and digital wallets) are securely processed by our authorized South African payment gateway partner, <strong className="text-white">PayFast (Pty) Ltd</strong>.
                </p>
                <ul className="list-disc pl-4 sm:pl-5 space-y-1.5 text-zinc-300">
                  <li>Approved refunds are submitted directly through the <strong className="text-white">PayFast merchant portal</strong> back to the customer's <strong className="text-white">original payment method</strong>.</li>
                  <li>Refund processing is initiated immediately by store management upon approval. Depending on your bank (Capitec, FNB, Standard Bank, Nedbank, Absa, Discovery, TymeBank), funds typically reflect within <strong className="text-white">3 to 7 business days</strong>.</li>
                  <li>For security and compliance reasons, we never issue cash refunds for transactions completed online via PayFast.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wide flex items-center gap-2">
                  <span className="text-[#FFD100]">6.</span> Non-Refundable Circumstances
                </h3>
                <p>
                  Refunds cannot be issued under the following circumstances:
                </p>
                <ul className="list-disc pl-4 sm:pl-5 space-y-1.5 text-zinc-300">
                  <li>The customer provided an incorrect or incomplete delivery address, and the driver was unable to deliver after reasonable communication attempts.</li>
                  <li>The customer was unreachable at the delivery destination, or failed to collect an order within 60 minutes of the ready-for-collection notice.</li>
                  <li>Customer change of mind or personal taste preference after food has been prepared strictly according to the order placed.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wide flex items-center gap-2">
                  <span className="text-[#FFD100]">7.</span> Contact Information for Cancellations &amp; Refunds
                </h3>
                <p>
                  To request a cancellation, report an order issue, or follow up on a refund, please contact our management team:
                </p>
                <div className="p-3.5 sm:p-4 rounded-2xl bg-zinc-900/80 border border-white/5 space-y-1.5 text-xs text-zinc-300">
                  <div><strong className="text-white">Business Name:</strong> Afro's Chicken Shop (Hillcrest)</div>
                  <div><strong className="text-white">Physical Store Address:</strong> Shop 5, The Junction, 5 Inanda Road, Hillcrest, 3650, KwaZulu-Natal, South Africa</div>
                  <div><strong className="text-white">Order &amp; Customer Care Line:</strong> 078 905 7975</div>
                  <div><strong className="text-white">WhatsApp Support &amp; Dispatch:</strong> +27 78 905 7975</div>
                  <div><strong className="text-white">Customer Service Email:</strong> info@afroschicken-hillcrest.co.za / orders@afroschicken-hillcrest.co.za</div>
                  <div><strong className="text-white">Trading Hours:</strong> Monday – Sunday: 10:00 AM – 8:00 PM</div>
                </div>
              </section>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 bg-zinc-950 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 shrink-0">
          <span className="text-[11px] sm:text-xs text-zinc-400 text-center sm:text-left font-medium break-words leading-tight">
            Afro's Chicken Shop • Shop 5, The Junction, Hillcrest
          </span>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#FFD100] hover:bg-[#ffe14d] text-black font-black font-black-grotesque text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer text-center shrink-0"
          >
            I Understand &amp; Close
          </button>
        </div>

      </div>
    </div>
  );
};
