const hostname = window.location.hostname

const isVercel =
  hostname.includes('vercel.app') ||
  hostname.includes('.vercel')

const isLocal =
  hostname === 'localhost' ||
  hostname === '127.0.0.1'

const isProd =
  import.meta.env.PROD || isVercel || !isLocal

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