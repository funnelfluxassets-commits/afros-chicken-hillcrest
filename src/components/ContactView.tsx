import React, { useState, useEffect } from 'react';
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
import { getCdnUrl } from '../utils/cdn';
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
    a: "We are located at Shop 5, The Junction, 5 Inanda Road, Hillcrest (Upper Highway, Durban). We are open 7 days a week from 10:00 AM to 8:00 PM for dine-in, counter takeaways, and fast local doorstep delivery.",
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
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-[#FFD100] selection:text-black w-full max-w-full overflow-x-hidden pb-20">
      
      {/* ── 1. HERO BANNER WITH "GET IN TOUCH" (Afro's Standard Hero Layout) ── */}
      <section className="relative w-full h-[260px] xs:h-[320px] sm:h-[400px] md:h-[460px] lg:h-[520px] overflow-hidden bg-black flex items-center justify-center">
        {/* Full-width single background image using get-in-touch-hero.webp */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${getCdnUrl('/assets/afros/pages/get-in-touch-hero.webp')}')`,
          }}
          aria-hidden="true"
        />

        {/* Subtle dark gradient overlay for text readability matching About & Team view */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" aria-hidden="true" />

        {/* Big Bold White Centered "GET IN TOUCH" Title matching About Us, Our Team & Functions */}
        <div className="relative z-10 text-center px-4 select-none pointer-events-none">
          <h1 className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-[104px] font-black font-black-grotesque uppercase text-white tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] leading-none">
            GET IN TOUCH
          </h1>
        </div>
      </section>

      {/* ── 2. INTRO STORY HEADLINE (Light Theme) ── */}
      <section className="bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-4xl lg:max-w-5xl mx-auto text-center space-y-6 sm:space-y-8 text-zinc-900 font-medium-grotesque">
          <h2 className="text-4xl sm:text-5xl md:text-[56px] lg:text-[62px] font-bold font-bold-grotesque tracking-tight text-black leading-tight">
            We'd Love To <span className="text-[#00C4D6]">Hear From You</span>
          </h2>

          <p className="text-lg sm:text-xl md:text-[22px] lg:text-[24px] leading-relaxed text-zinc-700 max-w-3xl mx-auto">
            Whether you have a question about our menu, function catering at your venue, or fast doorstep delivery across the Upper Highway — Nonto and the Afro’s Hillcrest team are always ready to help.
          </p>

          <p className="text-sm sm:text-base text-zinc-500 font-medium">
            Got a quick question? Check out our{' '}
            <button
              type="button"
              onClick={scrollToFaqs}
              className="text-[#b89500] font-bold underline hover:text-black transition-colors cursor-pointer"
            >
              Frequently Asked Questions
            </button>{' '}
            or send us a direct message below.
          </p>
        </div>
      </section>

      {/* ── 3. DIRECT CONTACT CARDS (Light Theme) ── */}
      <section className="bg-white py-12 sm:py-16 border-y border-zinc-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Card 1: WhatsApp / Phone */}
            <a
              href="https://wa.me/27789057975?text=Howzit%20Afro's%20Hillcrest!%20I'd%20like%20to%20get%20in%20touch."
              target="_blank"
              rel="noreferrer"
              className="p-6 rounded-3xl bg-zinc-100 border border-zinc-300 shadow-sm hover:shadow-xl hover:border-[#FFD100] transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white text-emerald-600 shadow-xs flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-wider text-zinc-500">Call / WhatsApp</div>
                  <div className="text-xl font-bold font-bold-grotesque text-zinc-900 group-hover:text-black mt-1">
                    078 905 7975
                  </div>
                  <p className="text-xs text-zinc-600 mt-1.5 leading-relaxed">
                    Fast orders, instant questions, and chat with Nonto &amp; team.
                  </p>
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-zinc-200 flex items-center text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition-transform">
                Chat on WhatsApp &rarr;
              </div>
            </a>

            {/* Card 2: Store Location */}
            <button
              type="button"
              onClick={onOpenStoreModal}
              className="p-6 rounded-3xl bg-zinc-100 border border-zinc-300 shadow-sm hover:shadow-xl hover:border-[#FFD100] transition-all duration-300 flex flex-col justify-between group text-left cursor-pointer"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white text-black shadow-xs flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6 text-[#b89500]" />
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-wider text-zinc-500">Visit Our Store</div>
                  <div className="text-xl font-bold font-bold-grotesque text-zinc-900 group-hover:text-black mt-1">
                    Shop 5, The Junction
                  </div>
                  <p className="text-xs text-zinc-600 mt-1.5 leading-relaxed">
                    5 Inanda Road, Hillcrest, Upper Highway (Durban).
                  </p>
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-zinc-200 flex items-center text-xs font-bold text-black group-hover:translate-x-1 transition-transform">
                View Store Details &rarr;
              </div>
            </button>

            {/* Card 3: Email */}
            <a
              href="mailto:info@afroschicken.co.za"
              className="p-6 rounded-3xl bg-zinc-100 border border-zinc-300 shadow-sm hover:shadow-xl hover:border-[#FFD100] transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white text-amber-600 shadow-xs flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-wider text-zinc-500">General Enquiries</div>
                  <div className="text-xl font-bold font-bold-grotesque text-zinc-900 group-hover:text-black mt-1 truncate">
                    info@afroschicken.co.za
                  </div>
                  <p className="text-xs text-zinc-600 mt-1.5 leading-relaxed">
                    Catering bookings, customer feedback &amp; corporate feeds.
                  </p>
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-zinc-200 flex items-center text-xs font-bold text-amber-600 group-hover:translate-x-1 transition-transform">
                Send an Email &rarr;
              </div>
            </a>
          </div>

          {/* Trading Hours Banner (Light Theme) */}
          <div className="p-5 sm:p-6 rounded-3xl bg-zinc-100 border border-zinc-300 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-2xl bg-white text-black shadow-xs shrink-0">
                <Clock className="w-5 h-5 text-black" />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-zinc-500">Store Hours</div>
                <div className="text-base sm:text-lg font-bold text-zinc-900">
                  Monday – Sunday: <strong className="text-black font-black">10:00 AM – 8:00 PM</strong>
                </div>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-zinc-200 text-black text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#b89500]" />
              <span>Walk-ins &bull; Takeaways &bull; Doorstep Delivery</span>
            </div>
          </div>

        </div>
      </section>

      {/* ── 4. CUSTOMER CONTACT FORM (Light Theme) ── */}
      <section className="bg-white py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          
          <div className="text-center space-y-2">
            <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#b89500] block">
              SEND US A MESSAGE
            </span>
            <h3 className="text-3xl sm:text-4xl md:text-[46px] font-bold font-bold-grotesque tracking-tight text-black">
              Leave Us A <span className="text-[#00C4D6]">Note</span>
            </h3>
            <p className="text-zinc-600 text-sm sm:text-base max-w-lg mx-auto font-medium">
              Fill in your details below and we’ll get back to you promptly.
            </p>
          </div>

          <div className="p-6 sm:p-10 rounded-3xl bg-zinc-100 border border-zinc-300 shadow-sm space-y-6">
            
            {/* Status Notifications */}
            {status === 'success' && (
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 flex items-start gap-3.5 animate-fadeIn shadow-sm">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600" />
                <div className="space-y-1">
                  <div className="font-bold text-sm text-emerald-950">Thank you for reaching out!</div>
                  <div className="text-xs text-emerald-800 leading-relaxed">
                    Your message has been sent directly to <strong className="text-emerald-950 font-extrabold">Nonto and the Afro's Chicken Hillcrest Team</strong>. We will review your inquiry and get back to you shortly.
                  </div>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="p-5 rounded-2xl bg-red-50 border border-red-300 text-red-950 flex items-start gap-3 animate-fadeIn shadow-sm">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
                <div className="space-y-1">
                  <div className="font-bold text-sm text-red-950">Please check your details</div>
                  <div className="text-xs text-red-800 leading-relaxed">{errorMessage}</div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Row 1: Title, First Name, Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                
                {/* Title */}
                <div className="sm:col-span-3 space-y-1.5">
                  <label htmlFor="title" className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                    Title
                  </label>
                  <div className="relative">
                    <select
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-3 rounded-2xl bg-white border border-zinc-300 text-zinc-900 text-sm focus:outline-none focus:border-[#FFD100] focus:ring-2 focus:ring-[#FFD100]/30 appearance-none cursor-pointer transition-all shadow-xs"
                    >
                      <option value="">Title</option>
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Ms">Ms</option>
                      <option value="Miss">Miss</option>
                      <option value="Dr">Dr</option>
                      <option value="Prof">Prof</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* First Name */}
                <div className="sm:col-span-4 space-y-1.5">
                  <label htmlFor="firstName" className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                    First Name <span className="text-[#E53E3E]">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-3 rounded-2xl bg-white border border-zinc-300 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:border-[#FFD100] focus:ring-2 focus:ring-[#FFD100]/30 transition-all shadow-xs"
                  />
                </div>

                {/* Last Name */}
                <div className="sm:col-span-5 space-y-1.5">
                  <label htmlFor="lastName" className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                    Last Name <span className="text-[#E53E3E]">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-3 rounded-2xl bg-white border border-zinc-300 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:border-[#FFD100] focus:ring-2 focus:ring-[#FFD100]/30 transition-all shadow-xs"
                  />
                </div>
              </div>

              {/* Row 2: Email, Telephone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                    Email Address <span className="text-[#E53E3E]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="your.email@domain.co.za"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-3 rounded-2xl bg-white border border-zinc-300 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:border-[#FFD100] focus:ring-2 focus:ring-[#FFD100]/30 transition-all shadow-xs"
                  />
                </div>

                {/* Telephone */}
                <div className="space-y-1.5">
                  <label htmlFor="telephone" className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                    Contact Phone / WhatsApp <span className="text-[#E53E3E]">*</span>
                  </label>
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    placeholder="e.g. 078 123 4567"
                    required
                    value={formData.telephone}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-3 rounded-2xl bg-white border border-zinc-300 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:border-[#FFD100] focus:ring-2 focus:ring-[#FFD100]/30 transition-all shadow-xs"
                  />
                </div>
              </div>

              {/* Row 3: Message */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                  Message <span className="text-[#E53E3E]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  maxLength={2000}
                  placeholder="What can we help you with? (Function catering, special feedback, questions...)"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-2xl bg-white border border-zinc-300 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:border-[#FFD100] focus:ring-2 focus:ring-[#FFD100]/30 transition-all shadow-xs resize-y min-h-[120px]"
                />
                
                <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-1">
                  <span>We respect your privacy and will never share your contact details.</span>
                  <span className="font-semibold text-zinc-600">
                    {formData.message.length > 0 ? `${formData.message.length} / 2000 characters` : 'Max 2000 characters'}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-3">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="px-10 py-3.5 rounded-full bg-[#FFD100] hover:bg-[#ffe14d] text-black font-black uppercase tracking-wider text-xs shadow-md transition-all hover:scale-102 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
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

        </div>
      </section>

      {/* ── 5. FREQUENTLY ASKED QUESTIONS (Light Theme) ── */}
      <section id="faqs-section" className="bg-white py-16 sm:py-20 border-t border-zinc-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          
          <div className="text-center space-y-2">
            <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#b89500] block">
              GOT QUESTIONS?
            </span>
            <h3 className="text-3xl sm:text-4xl md:text-[46px] font-bold font-bold-grotesque tracking-tight text-black">
              Frequently Asked <span className="text-[#00C4D6]">Questions</span>
            </h3>
            <p className="text-zinc-600 text-sm sm:text-base max-w-xl mx-auto font-medium">
              Find quick answers about our food, store hours, catering, and Upper Highway delivery.
            </p>
          </div>

          <div className="space-y-3.5 max-w-3xl mx-auto">
            {FAQ_ITEMS.map((item, index) => {
              const isExpanded = expandedFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-zinc-100 border border-zinc-300 overflow-hidden shadow-xs hover:border-zinc-400 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(isExpanded ? null : index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-zinc-900 hover:text-black transition-colors cursor-pointer"
                  >
                    <span>{item.q}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-[#b89500] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-200 pt-3 animate-fadeIn">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
};
