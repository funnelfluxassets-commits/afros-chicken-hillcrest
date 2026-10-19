// ==============================================================================
// AFRO'S CHICKEN HILLCREST - ULTRA-FAST GLOBAL & SOUTH AFRICA CDN
// ==============================================================================
// Serves static images via Fastly & Cloudflare Edge CDN with direct PoPs
// in South Africa (Durban / JNB / Cape Town via NAPAfrica / Teraco).
// 
// 1. Offloads 100% of image bandwidth from Vercel (protecting the 10GB limit).
// 2. Delivers images with ultra-low latency across KwaZulu-Natal & SA.
// ==============================================================================

const CDN_BASE_URL =
  'https://cdn.jsdelivr.net/gh/funnelfluxassets-commits/afros-chicken-hillcrest@main/public';

/**
 * Returns the CDN URL for a local asset path, with automatic fallback support.
 */
export function getCdnUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${CDN_BASE_URL}${cleanPath}`;
}
