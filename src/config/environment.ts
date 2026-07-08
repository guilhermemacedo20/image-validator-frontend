const hostname = window.location.hostname;

const isLocal = hostname === "localhost" || hostname === "127.0.0.1";

const backendUrl =
  import.meta.env.BACKEND_URL ||
  (isLocal ? "http://localhost:3000/api" : "");

export const environment = {
  production: import.meta.env.PROD,
  name: isLocal ? "local" : "production",

  backend: {
    url: backendUrl,
  },

  recaptcha: {
    siteKey: null,
  },
};