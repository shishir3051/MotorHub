// Per-context session tokens in sessionStorage (isolated per browser tab).
// Admin and customer sessions are stored separately so both can be used in the same browser.

const SESSION_KEYS = {
  admin: 'motohub_session_admin',
  customer: 'motohub_session_customer',
};

const CART_KEY = 'motohub_cart_customer';

/** @typedef {'admin' | 'customer'} SessionContext */

/** @param {string} pathname */
export function getContextFromPath(pathname) {
  if (pathname.startsWith('/admin')) return 'admin';
  return 'customer';
}

/** @param {SessionContext} context */
export function getSession(context) {
  try {
    const raw = sessionStorage.getItem(SESSION_KEYS[context]);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/** @param {SessionContext} context */
export function setSession(context, { user, token }) {
  sessionStorage.setItem(
    SESSION_KEYS[context],
    JSON.stringify({ user, token, updatedAt: Date.now() })
  );
}

/** @param {SessionContext} context */
export function clearSession(context) {
  sessionStorage.removeItem(SESSION_KEYS[context]);
  if (context === 'customer') {
    sessionStorage.removeItem(CART_KEY);
  }
}

export function hasSession(context) {
  return Boolean(getSession(context)?.token);
}

/** Token for the active route context */
export function getActiveToken(pathname = window.location.pathname) {
  const context = getContextFromPath(pathname);
  return getSession(context)?.token ?? null;
}

export function getCart() {
  try {
    const raw = sessionStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCart(cart) {
  sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/** Migrate legacy localStorage token to customer session (one-time) */
export function migrateLegacyToken() {
  const legacy = localStorage.getItem('token');
  if (!legacy) return;

  if (!getSession('customer')) {
    setSession('customer', { user: null, token: legacy });
  }
  localStorage.removeItem('token');
}
