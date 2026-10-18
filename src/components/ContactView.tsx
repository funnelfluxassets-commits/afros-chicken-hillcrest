import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { PageView } from '../types';
import { SOCIAL_LINKS, GOOGLE_MAPS_URL } from '../data/stores';

interface ContactViewProps {
  onNavigate?: (view: PageView) => void;
  onOpenStoreModal?: () => void;
}

interface FormState {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  message: string;
}

const INITIAL_FORM: FormState = {
  title: '',
  firstName: '',
  lastName: '',
  email: '',
  telephone: '',
  message: '',
};

const FAQ_ITEMS = [
  {
    q: 'Where is your store located and what are your operating hours?',
    a: "We are located at Shop 5, The Junction, 5 Inanda Road, Hillcrest (right in the Upper Highway). We are open 7 days a week from 10:00 AM to 8:00 PM for dine-in, counter takeaways, and fast local doorstep delivery.",
  },
  {
    q: 'What delivery areas do you cover across the Upper Highway?',
    a: 'We provide prompt doorstep delivery across Hillcrest, Kloof, Gillitts, Waterfall, Winston Park, and surrounding Upper Highway suburbs. You can order directly on our website and track your driver turn-by-turn.',
  },
  {
    q: 'Do you cater for functions, birthdays, sports days, or corporate events?',
    a: "Yes, absolutely! We prepare generous party feeds, boxed meals, and catering packages for corporate meetings, school sports days, and private celebrations. Fill in the contact form below or WhatsApp Nonto and the Hillcrest team directly at 078 905 7975.",
  },
  {
    q: "What signature bastings do you offer for your flame-grilled chicken?",
    a: "We baste our fresh chicken in your choice of 5 legendary Afro's flavours: Lemony (zesty & tangy), Sweet Chilli (sweet with a mild kick), Braai / BBQ (smokey & rich), Chilli (hot & fiery), and our famous 50/50 mix (a perfect blend of sweet chilli and fiery chilli).",
  },
  {
    q: 'Are your chips frozen and what makes your chicken special?',
    a: 'Never frozen! Our chicken is always fresh, grain-fed, and flame-grilled over hot coals. Our tjips are hand-cut fresh every single day from real South African potatoes, fried skin-on for maximum flavour, and seasoned with pure sea salt.',
  },
  {
    q: 'What payment options do you accept?',
    a: 'We accept PayFast Instant EFT, Visa and Mastercard debit/credit cards, Apple Pay, Cash, and mobile Speedpoint card machines upon collection or delivery.',
  },
];

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate, onOpenStoreModal }) => {
  const [formData, setFormData] = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'message' && value.length > 2000) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setStatus('error');
      setErrorMessage('Please provide your first and last name.');
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    if (!formData.telephone.trim()) {
      setStatus('error');
      setErrorMessage('Please provide your contact telephone number.');
      return;
    }

    if (!formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your message.');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      // 1. Primary: Direct Serverless Function to info@afroschicken.co.za
      let sentSuccessfully = false;
      try {
        const primaryRes = await fetch('/api/send-contact-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (primaryRes.ok) {
          const data = await primaryRes.json().catch(() => ({}));
          if (data.success) {
            sentSuccessfully = true;
          }
        }
      } catch (primaryErr) {
        console.warn('Primary contact API notice, attempting fallback:', primaryErr);
      }

      if (sentSuccessfully) {
        setStatus('success');
        setFormData(INITIAL_FORM);
        return;
      }

      // 2. Backup Fallback: FormSubmit AJAX service
      const response = await fetch('https://formsubmit.co/ajax/info@afroschicken.co.za', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          'Status Notice': '🍗 New Afro’s Chicken Hillcrest Message',
          Title: formData.title || 'Not specified',
          'First Name': formData.firstName,
          'Last Name': formData.lastName,
          Email: formData.email,
          Telephone: formData.telephone,
          Message: formData.message,
          _subject: `🍗 [AFRO'S HILLCREST INQUIRY] ${formData.firstName} ${formData.lastName} - Website Contact Form`,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData(INITIAL_FORM);
      } else {
        throw new Error('Server returned an unexpected response');
      }
    } catch {
      // 3. Fallback: Graceful direct mailto
      try {
        const mailtoUrl = `mailto:info@afroschicken.co.za?subject=${encodeURIComponent(
          `Afro's Chicken Hillcrest Inquiry from ${formData.firstName} ${formData.lastName}`
        )}&body=${encodeURIComponent(
          `Title: ${formData.title}\nName: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nPhone: ${formData.telephone}\n\nMessage:\n${formData.message}`
        )}`;
        window.location.href = mailtoUrl;
        setStatus('success');
        setFormData(INITIAL_FORM);
      } catch {
        setStatus('error');
        setErrorMessage('Unable to send at this moment. Please email info@afroschicken.co.za or call/WhatsApp us at 078 905 7975.');
      }
    }
  };

  const scrollToFaqs = () => {
    const faqElement = document.getElementById('faqs-section');
    if (faqElement) {
      faqElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d11] text-zinc-100 flex flex-col selection:bg-[#FFD100] selection:text-black">
      
      {/* ── Header Design sitting directly underneath main navbar with Afro's Header & Center Block ── */}
      <section className="relative overflow-hidden border-b border-white/10 bg-black min-h-[250px] sm:min-h-[290px] md:min-h-[330px] flex items-center justify-center py-10 sm:py-14">
        {/* Full-width single background image using Afro's menu banner */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/afros/images/afros-menu-header.webp')",
          }}
          aria-hidden="true"
        />

        {/* 60% black overlay for contrast */}
        <div className="absolute inset-0 bg-black/60 pointer-events-none" aria-hidden="true" />

        {/* Center card */}
        <div className="relative z-10 max-w-xl md:max-w-2xl w-[92%] sm:w-auto mx-auto px-6 sm:px-12 py-7 sm:py-9 rounded-2xl bg-black/85 border border-white/10 shadow-2xl text-center space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD100]/15 border border-[#FFD100]/30 text-[#FFD100] text-xs font-black uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD100]" />
            <span>Afro's Chicken Shop • Hillcrest</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight font-sans drop-shadow">
            GET IN TOUCH
          </h1>

          <div className="text-xs sm:text-sm text-zinc-200 max-w-lg mx-auto font-medium space-y-1">
            <p>
              We've got answers to common questions in our{' '}
              <button
                type="button"
                onClick={scrollToFaqs}
                className="text-[#FFD100] underline font-bold hover:text-white cursor-pointer transition-colors"
              >
                FAQs
              </button>
              .
            </p>
            <p className="text-zinc-300">
              Have a question, catering request, or feedback? Send Nonto and the team a message below.
            </p>
          </div>
        </div>
      </section>

      {/* ── Main Content Container ─────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8 flex-1 w-full">

        {/* ── Direct Contact Cards ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {/* Card 1: WhatsApp / Phone */}
          <a
            href="https://wa.me/27789057975?text=Howzit%20Afro's%20Hillcrest!%20I'd%20like%20to%20get%20in%20touch."
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-2xl bg-[#16161c] border border-white/10 hover:border-[#FFD100]/60 transition-all flex items-start gap-3 group"
          >
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-105 transition-transform shrink-0">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Call / WhatsApp</div>
              <div className="text-xs font-bold text-white group-hover:text-[#FFD100] truncate">078 905 7975</div>
              <div className="text-[10px] text-zinc-500 mt-0.5">Instant chat &amp; orders</div>
            </div>
          </a>

          {/* Card 2: Store Location */}
          <button
            type="button"
            onClick={onOpenStoreModal}
            className="p-4 rounded-2xl bg-[#16161c] border border-white/10 hover:border-[#FFD100]/60 transition-all flex items-start gap-3 group text-left cursor-pointer"
          >
            <div className="p-2.5 rounded-xl bg-[#FFD100]/10 text-[#FFD100] group-hover:scale-105 transition-transform shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Visit Our Store</div>
              <div className="text-xs font-bold text-white group-hover:text-[#FFD100] truncate">Shop 5, The Junction</div>
              <div className="text-[10px] text-zinc-500 mt-0.5">5 Inanda Rd, Hillcrest</div>
            </div>
          </button>

          {/* Card 3: Email */}
          <a
            href="mailto:info@afroschicken.co.za"
            className="p-4 rounded-2xl bg-[#16161c] border border-white/10 hover:border-[#FFD100]/60 transition-all flex items-start gap-3 group"
          >
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-105 transition-transform shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">General Enquiries</div>
              <div className="text-xs font-bold text-white group-hover:text-[#FFD100] truncate">info@afroschicken.co.za</div>
              <div className="text-[10px] text-zinc-500 mt-0.5">Catering &amp; feedback</div>
            </div>
          </a>
        </div>

        {/* ── Trading Hours Banner ────────────────────────────────────────── */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FFD100]/10 via-[#FFD100]/5 to-transparent border border-[#FFD100]/25 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#FFD100]/15 text-[#FFD100] shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Open 7 Days A Week</div>
              <div className="text-xs text-zinc-300">Monday – Sunday: <strong className="text-[#FFD100]">10:00 AM – 8:00 PM</strong></div>
            </div>
          </div>
          <div className="text-[11px] text-zinc-400 font-medium">
            🔥 Walk-ins, Takeaways &amp; Doorstep Delivery
          </div>
        </div>

        {/* ── Customer Form ────────────────────────────────────────────────── */}
        <div className="p-6 sm:p-10 rounded-3xl bg-[#141419] border border-white/10 shadow-2xl space-y-6">
          
          {/* Status Notifications */}
          {status === 'success' && (
            <div className="p-4 sm:p-5 rounded-2xl bg-[#141419] border border-[#FFD100] text-zinc-100 flex items-start gap-3.5 animate-fadeIn shadow-lg">
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-[#FFD100]" />
              <div className="space-y-1">
                <div className="font-bold text-sm text-white">Thank you for reaching out!</div>
                <div className="text-xs text-zinc-300 leading-relaxed">
                  Your message has been sent directly to <strong className="text-[#FFD100] font-extrabold">Nonto and the Afro's Chicken Hillcrest Team</strong>. We will review your inquiry and get back to you shortly.
                </div>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 flex items-start gap-3 animate-fadeIn">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-400" />
              <div className="space-y-1">
                <div className="font-bold text-sm">Please check your details</div>
                <div className="text-xs text-rose-200/90 leading-relaxed">{errorMessage}</div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Row 1: Title, First Name, Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              
              {/* Title */}
              <div className="sm:col-span-3 space-y-1.5">
                <label htmlFor="title" className="block text-xs font-bold text-zinc-300">
                  Title
                </label>
                <div className="relative">
                  <select
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:outline-none focus:border-[#FFD100] appearance-none cursor-pointer transition-colors"
                  >
                    <option value="" className="bg-zinc-900 text-zinc-400">
                      Title
                    </option>
                    <option value="Mr" className="bg-zinc-900 text-white">
                      Mr
                    </option>
                    <option value="Mrs" className="bg-zinc-900 text-white">
                      Mrs
                    </option>
                    <option value="Ms" className="bg-zinc-900 text-white">
                      Ms
                    </option>
                    <option value="Miss" className="bg-zinc-900 text-white">
                      Miss
                    </option>
                    <option value="Dr" className="bg-zinc-900 text-white">
                      Dr
                    </option>
                    <option value="Prof" className="bg-zinc-900 text-white">
                      Prof
                    </option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* First Name */}
              <div className="sm:col-span-4 space-y-1.5">
                <label htmlFor="firstName" className="block text-xs font-bold text-zinc-300">
                  First Name <span className="text-[#FFD100]">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#FFD100] transition-colors"
                />
              </div>

              {/* Last Name */}
              <div className="sm:col-span-5 space-y-1.5">
                <label htmlFor="lastName" className="block text-xs font-bold text-zinc-300">
                  Last Name <span className="text-[#FFD100]">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#FFD100] transition-colors"
                />
              </div>
            </div>

            {/* Row 2: Email, Telephone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-xs font-bold text-zinc-300">
                  Email Address <span className="text-[#FFD100]">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your.email@domain.co.za"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#FFD100] transition-colors"
                />
              </div>

              {/* Telephone */}
              <div className="space-y-1.5">
                <label htmlFor="telephone" className="block text-xs font-bold text-zinc-300">
                  Contact Phone / WhatsApp <span className="text-[#FFD100]">*</span>
                </label>
                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  placeholder="e.g. 078 123 4567"
                  required
                  value={formData.telephone}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#FFD100] transition-colors"
                />
              </div>
            </div>

            {/* Row 3: Message */}
            <div className="space-y-1.5">
              <label htmlFor="message" className="block text-xs font-bold text-zinc-300">
                Message <span className="text-[#FFD100]">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                maxLength={2000}
                placeholder="What can we help you with? (Catering queries, feedback, special requests...)"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-3.5 py-3 rounded-2xl bg-black/60 border border-white/15 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#FFD100] transition-colors resize-y min-h-[120px]"
              />
              
              <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1">
                <span>We respect your privacy and will never share your contact details.</span>
                <span className="font-semibold text-zinc-400">
                  {formData.message.length > 0 ? `${formData.message.length} / 2000 characters` : 'Max 2000 characters'}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-3">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="px-8 py-3 rounded-full bg-[#FFD100] hover:bg-[#ffe14d] text-black font-black uppercase tracking-wider text-xs shadow-xl transition-all hover:scale-102 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
              >
                {status === 'sending' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* ── FAQ Section ─────────────────────────────────────────────────── */}
        <section id="faqs-section" className="space-y-6 pt-4">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD100]/10 border border-[#FFD100]/25 text-[#FFD100] text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Got Questions?</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
              Find quick answers to common questions about our food, store hours, catering, and Upper Highway delivery.
            </p>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {FAQ_ITEMS.map((item, index) => {
              const isExpanded = expandedFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-[#141419] border border-white/10 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(isExpanded ? null : index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-[#FFD100] transition-colors cursor-pointer"
                  >
                    <span>{item.q}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-[#FFD100] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-white/5 pt-3 animate-fadeIn">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
};
