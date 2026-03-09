/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_FORMSPREE_CONTACT_ENDPOINT?: string;
  readonly VITE_FORMSPREE_BOOKING_ENDPOINT?: string;
  readonly VITE_FORMSPREE_ORDER_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
