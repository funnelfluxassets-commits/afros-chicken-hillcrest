import { StoreLocation } from '../types';

// WhatsApp order inquiry & notification number for Afro's Chicken Hillcrest
export const ORDER_WHATSAPP_NUMBER = '27789057975';

export const STORES: StoreLocation[] = [
  {
    id: 'afros-hillcrest-flagship',
    name: "Afro's Chicken Shop — Hillcrest",
    mall: 'The Junction (Shop 5)',
    address: 'Shop 5, The Junction, 5 Inanda Road',
    city: 'Hillcrest, Durban, KwaZulu-Natal',
    landmark: 'The Junction Shopping Centre',
    phone: '078 905 7975',
    whatsapp: ORDER_WHATSAPP_NUMBER,
    hours: 'Monday – Sunday: 9:00 AM – 8:00 PM',
    isOpen: true,
    mapQuery: 'Afros+Chicken+Shop+Hillcrest',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3463.8821946399763!2d30.7633!3d-29.7758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ef6e382d56cbb3b%3A0x7d6f5f3e9c5c9e2!2sAfro%27s%20Chicken%20Shop%20Hillcrest!5e0!3m2!1sen!2sza!4v1792178000000!5m2!1sen!2sza',
    googleMapsUrl: 'https://maps.google.com/?q=Afros+Chicken+Shop+Hillcrest',
    status: 'active',
  },
];

export const GOOGLE_BUSINESS_URL = 'https://maps.google.com/?q=Afros+Chicken+Shop+Hillcrest';
export const GOOGLE_REVIEW_URL = GOOGLE_BUSINESS_URL;

export const SOCIAL_LINKS = {
  tiktok: 'https://www.tiktok.com/@afroschicken',
  facebook: 'https://www.facebook.com/AfrosChickenHillcrest',
  instagram: 'https://www.instagram.com/afroschicken',
  whatsappDirect: 'https://wa.me/27789057975',
  phoneDirect: 'tel:0789057975',
  emailInfo: 'mailto:info@afroschicken.co.za',
};
