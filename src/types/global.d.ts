// types/global.d.ts
export {};

declare global {
  interface Window {
    adsbygoogle: { [key: string]: unknown }[];
  }
}