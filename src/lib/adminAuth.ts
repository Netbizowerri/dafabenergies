const ADMIN_SESSION_KEY = "isLoggedIn";

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function isAdminLoggedIn() {
  if (!canUseStorage()) {
    return false;
  }

  return window.localStorage.getItem(ADMIN_SESSION_KEY) === "true";
}

export function setAdminLoggedIn() {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(ADMIN_SESSION_KEY, "true");
}

export function clearAdminSession() {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(ADMIN_SESSION_KEY);
}
