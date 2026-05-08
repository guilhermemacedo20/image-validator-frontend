const isProd = import.meta.env.PROD

export const environment = {
  production: isProd,
  name: isProd ? 'production' : 'local',

  backend: {
    url: isProd
      ? 'https://image-validator-backend-production.up.railway.app/api'
      : 'http://localhost:3000/api',
  },

  recaptcha: {
    siteKey: null,
  },
}