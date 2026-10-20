import { db, isFirebaseConfigured } from './firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

const STORAGE_KEY = 'afros_out_of_stock_ids';
const CHANNEL_NAME = 'afros_stock_channel';
const FIRESTORE_COLLECTION = 'afros_store_config';
const FIRESTORE_DOC = 'stock_status';

// In-tab BroadcastChannel for instant same-browser cross-tab sync
let stockBroadcastChannel: BroadcastChannel | null = null;
try {
  if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    stockBroadcastChannel = new BroadcastChannel(CHANNEL_NAME);
  }
} catch {
  stockBroadcastChannel = null;
}

// Read current cached out of stock IDs from localStorage
export function getOutOfStockItemIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// Check if an item is out of stock
export function isItemOutOfStock(itemId: string): boolean {
  if (!itemId) return false;
  const list = getOutOfStockItemIds();
  return list.includes(itemId);
}

// Internal helper to save to localStorage and broadcast
function saveLocalOutOfStockIds(ids: string[], notify = true): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    if (notify) {
      if (stockBroadcastChannel) {
        try {
          stockBroadcastChannel.postMessage({ type: 'STOCK_CHANGED', outOfStockItemIds: ids });
        } catch {}
      }
      window.dispatchEvent(
        new CustomEvent('afros_stock_status_updated', {
          detail: { outOfStockItemIds: ids },
        })
      );
    }
  } catch (err) {
    console.warn('Could not save out of stock ids to localStorage:', err);
  }
}

// Toggle or explicitly set an item's stock status
export async function setItemStockStatus(itemId: string, inStock: boolean): Promise<string[]> {
  const current = getOutOfStockItemIds();
  let updated: string[];

  if (inStock) {
    // Remove from out-of-stock list
    updated = current.filter((id) => id !== itemId);
  } else {
    // Add to out-of-stock list
    if (!current.includes(itemId)) {
      updated = [...current, itemId];
    } else {
      updated = current;
    }
  }

  // 1. Instant local optimistic update
  saveLocalOutOfStockIds(updated, true);

  // 2. Persist to Firestore if configured
  if (db && isFirebaseConfigured) {
    try {
      const docRef = doc(db, FIRESTORE_COLLECTION, FIRESTORE_DOC);
      await setDoc(
        docRef,
        {
          outOfStockItemIds: updated,
          lastUpdated: Date.now(),
        },
        { merge: true }
      );
    } catch (err) {
      console.warn('Could not update stock status in Firestore:', err);
    }
  }

  return updated;
}

// Reset all items to in-stock (used at shift start or fresh stock arrival)
export async function resetAllToInStock(): Promise<void> {
  const updated: string[] = [];
  saveLocalOutOfStockIds(updated, true);

  if (db && isFirebaseConfigured) {
    try {
      const docRef = doc(db, FIRESTORE_COLLECTION, FIRESTORE_DOC);
      await setDoc(
        docRef,
        {
          outOfStockItemIds: updated,
          lastUpdated: Date.now(),
        },
        { merge: true }
      );
    } catch (err) {
      console.warn('Could not reset stock status in Firestore:', err);
    }
  }
}

// Subscribe to real-time stock changes across tabs, devices, and Firestore
export function subscribeToStockStatus(callback: (outOfStockIds: string[]) => void): () => void {
  if (typeof window === 'undefined') return () => {};

  // 1. Initial emit from local cache
  callback(getOutOfStockItemIds());

  // 2. Local window event listener
  const handleLocalEvent = (e: Event) => {
    const custom = e as CustomEvent<{ outOfStockItemIds?: string[] }>;
    if (custom.detail?.outOfStockItemIds) {
      callback(custom.detail.outOfStockItemIds);
    } else {
      callback(getOutOfStockItemIds());
    }
  };
  window.addEventListener('afros_stock_status_updated', handleLocalEvent);

  // 3. Storage event listener (across browser tabs)
  const handleStorageEvent = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      callback(getOutOfStockItemIds());
    }
  };
  window.addEventListener('storage', handleStorageEvent);

  // 4. BroadcastChannel listener (instant same-browser cross-tab)
  const handleBroadcastMessage = (e: MessageEvent) => {
    if (e.data && e.data.type === 'STOCK_CHANGED' && Array.isArray(e.data.outOfStockItemIds)) {
      callback(e.data.outOfStockItemIds);
    }
  };
  if (stockBroadcastChannel) {
    stockBroadcastChannel.addEventListener('message', handleBroadcastMessage);
  }

  // 5. Real-time Cloud Firestore listener
  let unsubFirestore: (() => void) | null = null;
  if (db && isFirebaseConfigured) {
    try {
      const docRef = doc(db, FIRESTORE_COLLECTION, FIRESTORE_DOC);
      unsubFirestore = onSnapshot(
        docRef,
        (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data && Array.isArray(data.outOfStockItemIds)) {
              saveLocalOutOfStockIds(data.outOfStockItemIds, false);
              callback(data.outOfStockItemIds);
            }
          }
        },
        (err) => {
          console.warn('Stock status Firestore subscription warning:', err);
        }
      );
    } catch (err) {
      console.warn('Could not establish stock Firestore subscription:', err);
    }
  }

  return () => {
    window.removeEventListener('afros_stock_status_updated', handleLocalEvent);
    window.removeEventListener('storage', handleStorageEvent);
    if (stockBroadcastChannel) {
      stockBroadcastChannel.removeEventListener('message', handleBroadcastMessage);
    }
    if (unsubFirestore) {
      unsubFirestore();
    }
  };
}
