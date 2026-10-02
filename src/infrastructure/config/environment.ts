const hostname = window.location.hostname;

const isLocal = hostname.includes("localhost");

const backendUrl =
  import.meta.env.VITE_BACKEND_URL ||
  (isLocal ? "http://localhost:3000/api" : "");

export const environment = {
  environment: isLocal ? "dev" : "production",

  backend: {
    url: backendUrl,
  },
};