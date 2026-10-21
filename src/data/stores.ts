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
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d350!2d30.7652685!3d-29.7783477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ef6fb073d7b934f%3A0x63b003b5b6fe8c7c!2sAfro%27s%20Chicken%20Shop%20(Hillcrest)!5e0!3m2!1sen!2sza!4v1792178000000!5m2!1sen!2sza',
    googleMapsUrl:
      "https://www.google.com/maps/place/Afro's+Chicken+Shop+(Hillcrest)/@-29.7783477,30.7626936,17z/data=!3m1!4b1!4m6!3m5!1s0x1ef6fb073d7b934f:0x63b003b5b6fe8c7c!8m2!3d-29.7783477!4d30.7652685!16s%2Fg%2F11gf00dwjq?hl=en&entry=ttu&g_ep=EgoyMDI2MTAxMy4wIKXMDSoASAFQAw%3D%3D",
    status: 'active',
  },
];

export const GOOGLE_BUSINESS_URL =
  "https://www.google.com/maps/place/Afro's+Chicken+Shop+(Hillcrest)/@-29.7783477,30.7626936,17z/data=!3m1!4b1!4m6!3m5!1s0x1ef6fb073d7b934f:0x63b003b5b6fe8c7c!8m2!3d-29.7783477!4d30.7652685!16s%2Fg%2F11gf00dwjq?hl=en&entry=ttu&g_ep=EgoyMDI2MTAxMy4wIKXMDSoASAFQAw%3D%3D";
export const GOOGLE_REVIEW_URL = GOOGLE_BUSINESS_URL;
export const GOOGLE_MAPS_URL = GOOGLE_BUSINESS_URL;

export const SOCIAL_LINKS = {
  tiktok: 'https://www.tiktok.com/@afroschicken',
  facebook: 'https://www.facebook.com/AfrosChickenHillcrest',
  instagram: 'https://www.instagram.com/afroschicken',
  whatsappDirect: 'https://wa.me/27789057975',
  phoneDirect: 'tel:0789057975',
  emailInfo: 'mailto:info@afroschicken-hillcrest.co.za',
  emailOrders: 'mailto:orders@afroschicken-hillcrest.co.za',
  emailNonto: 'mailto:nonto@afroschicken-hillcrest.co.za',
};
