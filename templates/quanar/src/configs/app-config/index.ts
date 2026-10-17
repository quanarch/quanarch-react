export const appConfig = {
  /** Where the static loader finds quans. Set VITE_QUANS_URL to change it. */
  quansUrl: import.meta.env.VITE_QUANS_URL ?? `${import.meta.env.BASE_URL}quans/`,
};
