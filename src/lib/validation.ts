const CONTROL_CHARS = /[\u0000-\u001f\u007f<>]/g;

export function sanitizeText(value: string, maxLength = 300) {
  return value.replace(CONTROL_CHARS, "").trim().slice(0, maxLength);
}

export function sanitizePhone(value: string) {
  return value.replace(/[^\d+\s()-]/g, "").trim().slice(0, 24);
}

export function sanitizeMultiline(value: string, maxLength = 1200) {
  return value.replace(CONTROL_CHARS, "").replace(/\r/g, "").trim().slice(0, maxLength);
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isValidPhone(value: string) {
  return /^[\d+\s()-]{7,24}$/.test(value);
}
