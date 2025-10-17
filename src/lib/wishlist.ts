const STORAGE_KEY = 'wishlist_courses';

function safeGetStorage(): Storage | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function getWishlist(): string[] {
  const storage = safeGetStorage();
  if (!storage) return [];
  try {
    const raw = storage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function setWishlist(ids: string[]) {
  const storage = safeGetStorage();
  if (!storage) return;
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(Array.from(new Set(ids))));
  } catch {
    // ignore
  }
}

export function isWishlisted(id: string): boolean {
  return getWishlist().includes(id);
}

export function addToWishlist(id: string) {
  const list = getWishlist();
  if (!list.includes(id)) {
    list.push(id);
    setWishlist(list);
  }
}

export function removeFromWishlist(id: string) {
  const list = getWishlist().filter((x) => x !== id);
  setWishlist(list);
}

export function toggleWishlist(id: string): boolean {
  if (isWishlisted(id)) {
    removeFromWishlist(id);
    return false;
  } else {
    addToWishlist(id);
    return true;
  }
}
