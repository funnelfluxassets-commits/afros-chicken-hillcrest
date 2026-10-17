import React, { useState, useEffect } from 'react';
import { Calendar, Mail, MessageSquare, Check } from 'lucide-react';
import { PageView } from '../types';

interface FunctionsViewProps {
  onNavigate: (view: PageView) => void;
}

export const FunctionsView: React.FC<FunctionsViewProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    guestCount: '25 - 50 guests',
    eventType: 'Birthday Jol',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppChat = () => {
    const text = encodeURIComponent(
      `Howzit Afro's Hillcrest! I'd like to book catering for a function:

• Name: ${formData.name || 'Not provided'}
• Phone: ${formData.phone || 'Not provided'}
• Event Type: ${formData.eventType}
• Date: ${formData.date || 'TBD'}
• Estimated Guests: ${formData.guestCount}
• Notes: ${formData.notes || 'None'}`
    );
    window.open(`https://wa.me/27626238449?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-[#FFD100] selection:text-black w-full max-w-full overflow-x-hidden pb-20">
      {/* ── 1. HERO BANNER WITH "FUNCTIONS" ── */}
      <section className="relative w-full h-[260px] xs:h-[320px] sm:h-[400px] md:h-[460px] lg:h-[520px] overflow-hidden bg-[#1a1a1a] flex items-center justify-center">
        {/* Flame Grilled Chicken Plate Photo Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/afros/functions/functions-hero.webp')",
          }}
          aria-hidden="true"
        />

        {/* Subtle dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-black/25 pointer-events-none" aria-hidden="true" />

        {/* Big Bold White Centered "FUNCTIONS" Title */}
        <div className="relative z-10 text-center px-4 select-none pointer-events-none">
          <h1 className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-[104px] font-black font-black-grotesque uppercase text-white tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)] leading-none">
            FUNCTIONS
          </h1>
        </div>
      </section>

      {/* ── 2. "WE DO FUNCTIONS" STORY SECTION (MOVED UP UNDER HERO) ── */}
      <section className="bg-white py-14 sm:py-20 md:py-24 px-4 sm:px-6">
        <div className="max-w-4xl lg:max-w-5xl mx-auto text-center space-y-8 sm:space-y-10 text-zinc-900 font-medium-grotesque">
          {/* Main Headline */}
          <h2 className="text-4xl sm:text-5xl md:text-[56px] lg:text-[62px] font-bold font-bold-grotesque tracking-tight text-black leading-tight">
            We do <span className="text-[#00C4D6]">functions</span>
          </h2>

          {/* Paragraph 1 */}
          <p className="text-lg sm:text-xl md:text-[22px] lg:text-[24px] leading-relaxed text-zinc-900">
            We dig a good jol. If you’re planning your gogo’s birthday, a wedding or your end of year party then we’ll
            bring the gees!
          </p>

          {/* Paragraph 2 */}
          <p className="text-lg sm:text-xl md:text-[22px] lg:text-[24px] leading-relaxed text-zinc-900">
            Our gazebo set up is perfect for big &amp; small events or functions at your home or office.
          </p>

          {/* Paragraph 3 */}
          <p className="text-lg sm:text-xl md:text-[22px] lg:text-[24px] leading-relaxed text-zinc-900">
            See us at the <strong className="font-bold text-black">Shark Tank</strong> and{' '}
            <strong className="font-bold text-black">Kingsmead Cricket Grounds</strong>.
          </p>

          {/* Paragraph 4 - Direct Contact Callout */}
          <div className="pt-2 text-lg sm:text-xl md:text-[22px] lg:text-[24px] leading-relaxed text-zinc-900">
            <p>
              For your next function chat to us:{' '}
              <a
                href="mailto:nontonzama@afroschicken.co.za"
                className="text-[#E53E3E] hover:underline font-bold"
              >
                nontonzama@afroschicken.co.za
              </a>{' '}
              or{' '}
              <a
                href="https://wa.me/27626238449"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00C4D6] hover:underline font-bold"
              >
                062 623 8449
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. 4 EVENT IMAGE CARDS (BLOCK OF 4: 2 PER LINE ON PC, LARGER TEXT ON MOBILE) ── */}
      <section className="bg-zinc-50 py-16 sm:py-24 border-y border-zinc-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#b89500] block mb-2">
              REAL EVENTS • REAL GEES
            </span>
            <h3 className="text-3xl sm:text-4xl md:text-[46px] font-bold font-bold-grotesque tracking-tight text-black">
              Bringing The Flavour To <span className="text-[#00C4D6]">Every Occasion</span>
            </h3>
            <p className="text-zinc-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mt-3 font-medium">
              From backyard birthday jols to corporate gatherings and stadium festivals — our team is ready to serve.
            </p>
          </div>

          {/* Block of 4: 2 per line on PC / tablet, 1 per line on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {/* F1 */}
            <div className="bg-white rounded-3xl overflow-hidden border border-zinc-200 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="aspect-[16/10] overflow-hidden bg-zinc-100">
                  <img
                    src="/assets/afros/functions/F1.webp"
                    alt="Afro's Mobile Gazebo Event Setup"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 sm:p-8">
                  <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#b89500] block mb-2">
                    ON-SITE SETUP
                  </span>
                  <h4 className="font-bold font-bold-grotesque text-2xl sm:text-3xl text-black uppercase leading-snug">
                    Live Gazebo Setup
                  </h4>
                  <p className="text-base sm:text-lg text-zinc-700 mt-3 leading-relaxed font-medium">
                    Fully equipped mobile gazebo catering on-site, serving flame-grilled chicken and fresh tjips hot off the grill.
                  </p>
                </div>
              </div>
            </div>

            {/* F2 */}
            <div className="bg-white rounded-3xl overflow-hidden border border-zinc-200 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="aspect-[16/10] overflow-hidden bg-zinc-100">
                  <img
                    src="/assets/afros/functions/F2.webp"
                    alt="Outdoor Gatherings & Celebrations"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 sm:p-8">
                  <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#b89500] block mb-2">
                    COMMUNITY &amp; JOLS
                  </span>
                  <h4 className="font-bold font-bold-grotesque text-2xl sm:text-3xl text-black uppercase leading-snug">
                    Outdoor Gatherings
                  </h4>
                  <p className="text-base sm:text-lg text-zinc-700 mt-3 leading-relaxed font-medium">
                    Friends and family sharing good times and authentic Durban flavours that bring everyone together.
                  </p>
                </div>
              </div>
            </div>

            {/* F3 */}
            <div className="bg-white rounded-3xl overflow-hidden border border-zinc-200 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="aspect-[16/10] overflow-hidden bg-zinc-100">
                  <img
                    src="/assets/afros/functions/F3.webp"
                    alt="Afro's Hillcrest Dedicated Catering Crew"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 sm:p-8">
                  <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#b89500] block mb-2">
                    HILLCREST CREW
                  </span>
                  <h4 className="font-bold font-bold-grotesque text-2xl sm:text-3xl text-black uppercase leading-snug">
                    Our Catering Crew
                  </h4>
                  <p className="text-base sm:text-lg text-zinc-700 mt-3 leading-relaxed font-medium">
                    Passionate, friendly team members committed to quick turnaround, warm hospitality, and zero compromise on taste.
                  </p>
                </div>
              </div>
            </div>

            {/* F4 */}
            <div className="bg-white rounded-3xl overflow-hidden border border-zinc-200 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="aspect-[16/10] overflow-hidden bg-zinc-100">
                  <img
                    src="/assets/afros/functions/F4.webp"
                    alt="Happy Guests and Function Gees"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 sm:p-8">
                  <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#b89500] block mb-2">
                    GUARANTEED GEES
                  </span>
                  <h4 className="font-bold font-bold-grotesque text-2xl sm:text-3xl text-black uppercase leading-snug">
                    Happy Guests
                  </h4>
                  <p className="text-base sm:text-lg text-zinc-700 mt-3 leading-relaxed font-medium">
                    Crowd-pleasing food served hot in convenient meal boxes, keeping your guests fully satisfied and energized.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. F5 IMAGE DIRECTLY ABOVE CONTACT FORM (NO BUTTONS) ── */}
      <section className="bg-white pt-14 sm:pt-20 pb-4 px-4 sm:px-6">
        <div className="max-w-2xl sm:max-w-3xl mx-auto">
          <div className="overflow-hidden rounded-3xl border-2 border-black/10 shadow-2xl bg-zinc-50 transition-all hover:shadow-3xl">
            <img
              src="/assets/afros/functions/F5.webp"
              alt="We Do Function at Afro's Hillcrest"
              className="w-full h-auto object-contain block mx-auto"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ── 5. EVENT INQUIRY & BOOKING FORM ── */}
      <section id="inquiry-form" className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-white border-2 border-black p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#FFD100] text-black mb-3">
              <Calendar className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-black">
              Book Your Function With Afro’s Hillcrest
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 mt-2 font-medium">
              Tell us about your event and Nonto and the Hillcrest team will tailor the perfect package for your guests.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-[#FFFDF0] border-2 border-black text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#FFD100] text-black mx-auto flex items-center justify-center font-bold">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h3 className="text-2xl font-black uppercase text-black">Thanks {formData.name || 'there'}!</h3>
              <p className="text-zinc-700 text-sm max-w-md mx-auto font-medium">
                We have received your function request for {formData.eventType} on {formData.date || 'your upcoming date'}.
                Our team will be in touch shortly on {formData.phone || 'your phone'}!
              </p>
              <div className="pt-4 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={handleWhatsAppChat}
                  className="px-6 py-3 bg-[#FFD100] hover:bg-[#ffe14d] text-black font-black text-sm uppercase rounded-xl transition-all cursor-pointer"
                >
                  Send Details Via WhatsApp Too (062 623 8449)
                </button>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-3 bg-zinc-100 text-black font-bold text-sm rounded-xl border border-zinc-300 hover:bg-zinc-200 transition-all cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-black mb-2">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sipho Ndlovu"
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-xl text-black placeholder-zinc-400 focus:outline-none focus:border-black transition-colors text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-black mb-2">
                    Contact Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 062 623 8449"
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-xl text-black placeholder-zinc-400 focus:outline-none focus:border-black transition-colors text-sm font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-black mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="sipho@example.com"
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-xl text-black placeholder-zinc-400 focus:outline-none focus:border-black transition-colors text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-black mb-2">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-xl text-black focus:outline-none focus:border-black transition-colors text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-black mb-2">
                    Estimated Guests
                  </label>
                  <select
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-xl text-black focus:outline-none focus:border-black transition-colors text-sm font-medium"
                  >
                    <option value="10 - 25 guests">10 - 25 guests</option>
                    <option value="25 - 50 guests">25 - 50 guests</option>
                    <option value="50 - 100 guests">50 - 100 guests</option>
                    <option value="100+ guests">100+ guests</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-black mb-2">
                  Event Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    'Birthday Jol',
                    'Corporate Function',
                    'Wedding / Celebration',
                    'Sports / School Event',
                    'Year-End Party',
                    'Other',
                  ].map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setFormData({ ...formData, eventType: type })}
                      className={`py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider border text-center transition-all cursor-pointer ${
                        formData.eventType === type
                          ? 'bg-[#FFD100] text-black border-black shadow-2xs'
                          : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-black'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-black mb-2">
                  Notes / Special Requests
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Tell us about your venue location, preferred menu items, dietary needs, or gazebo setup requirements..."
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-xl text-black placeholder-zinc-400 focus:outline-none focus:border-black transition-colors text-sm font-medium"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-200">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#FFD100] hover:bg-[#ffe14d] text-black font-black text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer border border-black/10"
                >
                  Submit Inquiry
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppChat}
                  className="w-full sm:w-auto px-6 py-3.5 bg-black hover:bg-zinc-800 text-white font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-[#FFD100]" />
                  <span>Chat on WhatsApp (062 623 8449)</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
