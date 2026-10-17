import React, { useState } from 'react';
import { Calendar, Users, Phone, Mail, MessageSquare, CheckCircle, PartyPopper, Check } from 'lucide-react';
import { PageView } from '../types';

interface FunctionsViewProps {
  onNavigate: (view: PageView) => void;
}

export const FunctionsView: React.FC<FunctionsViewProps> = ({ onNavigate }) => {
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
    window.open(`https://wa.me/27789057975?text=${text}`, '_blank');
  };

  const platters = [
    {
      title: 'Strips & Afro Pops Platter',
      subtitle: 'Feeds 8 – 10 People',
      desc: '40 golden chicken strips and 50 bite-sized Afro Pops basted in your choice of sauces, served with 4 dipping sauces.',
      image: '/assets/afros/images/afros-pops.png',
      badge: 'Party Hit',
    },
    {
      title: 'Flamed Cuts Platter',
      subtitle: 'Feeds 8 – 12 People',
      desc: 'Generous assortment of flame-grilled quarter and half chicken pieces glazed with our legendary Durban bastings.',
      image: '/assets/afros/images/afros-chicekn-and-chips.jpg',
      badge: 'Braai Flavour',
    },
    {
      title: 'Mini Sliders & Sarmies Tray',
      subtitle: 'Feeds 10 – 12 People',
      desc: 'Mini artisanal rolls packed with flame-grilled chicken breast, crisp slaw, and signature house basting.',
      image: '/assets/afros/images/afros-burger-and-chips.jpg',
      badge: 'Cocktail Style',
    },
    {
      title: 'Real Tjips & Slaw Bucket',
      subtitle: 'Sides for 10 People',
      desc: 'Extra-large portion of skin-on hand-cut real potato tjips seasoned with sea salt, plus small-batch fresh coleslaw.',
      image: '/assets/afros/images/q3.png',
      badge: 'Essential Sides',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-[#FFD100] selection:text-black pb-20">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-16 sm:py-24 border-b border-zinc-200 bg-[#FFFDF0] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black text-[#FFD100] font-black text-xs tracking-widest uppercase mb-6 shadow-xs">
            <PartyPopper className="w-4 h-4" />
            <span>CATERING &amp; EVENTS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-black mb-6 leading-tight">
            We Do <span className="bg-[#FFD100] text-black px-3 py-0.5">Functions</span>
          </h1>

          <p className="text-xl sm:text-3xl text-zinc-800 font-black leading-snug max-w-3xl mx-auto mb-6">
            We dig a good jol. If you’re planning your gogo’s birthday, a wedding or your end of year party then we’ll
            bring the gees!
          </p>

          <p className="text-sm sm:text-base text-zinc-600 max-w-xl mx-auto leading-relaxed font-medium">
            Our gazebo set up is perfect for big &amp; small events or functions at your home or office. See us at the{' '}
            <strong className="text-black font-black">Shark Tank</strong> and{' '}
            <strong className="text-black font-black">Kingsmead Cricket Grounds</strong>.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#inquiry-form"
              className="px-8 py-3.5 bg-[#FFD100] hover:bg-[#ffe14d] text-black font-black text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all border border-black/10"
            >
              Request a Quote
            </a>
            <button
              onClick={handleWhatsAppChat}
              className="px-7 py-3.5 bg-black hover:bg-zinc-800 text-white font-black text-sm uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-[#FFD100]" />
              <span>Chat to Us on WhatsApp</span>
            </button>
          </div>
        </div>
      </section>

      {/* PLATTERS & PACKAGES */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-[#b89500] block mb-1">CROWD PLEASERS</span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-black">Catering &amp; Party Platters</h2>
          <p className="text-zinc-600 text-sm max-w-lg mx-auto mt-2 font-medium">
            Delicious, freshly prepared platters delivered hot to your door or prepared live on-site with our gazebo setup.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platters.map((platter, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white border border-zinc-200 shadow-xs overflow-hidden flex flex-col justify-between group hover:border-black hover:shadow-xl transition-all"
            >
              <div>
                <div className="aspect-video w-full overflow-hidden bg-zinc-100 relative">
                  <img
                    src={platter.image}
                    alt={platter.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/afros/images/afros-burger.jpg';
                    }}
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-black text-white text-[10px] font-black uppercase tracking-wider">
                    {platter.badge}
                  </span>
                </div>
                <div className="p-5">
                  <span className="text-xs font-black text-[#b89500] uppercase tracking-wider block">{platter.subtitle}</span>
                  <h3 className="text-lg font-black uppercase text-black mt-1 mb-2">{platter.title}</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed font-medium">{platter.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EVENT INQUIRY FORM */}
      <section id="inquiry-form" className="py-10 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-white border-2 border-black p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#FFD100] text-black mb-3">
              <Calendar className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tight text-black">For Your Next Function Chat To Us</h2>
            <p className="text-sm text-zinc-600 mt-1 font-medium">
              Tell us about your event and our Hillcrest catering team will put together a bespoke package.
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
                  className="px-6 py-3 bg-[#FFD100] hover:bg-[#ffe14d] text-black font-black text-sm uppercase rounded-xl transition-all"
                >
                  Send Details Via WhatsApp Too
                </button>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-3 bg-zinc-100 text-black font-bold text-sm rounded-xl border border-zinc-300 hover:bg-zinc-200 transition-all"
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
                    placeholder="e.g. 078 123 4567"
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
                  {['Birthday Jol', 'Corporate Function', 'Wedding / Celebration', 'Sports / School Event', 'Year-End Party', 'Other'].map(
                    (type) => (
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
                    )
                  )}
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
                  <span>Quick Chat on WhatsApp (078 905 7975)</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
