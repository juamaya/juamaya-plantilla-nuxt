import tailwindcss from '@tailwindcss/vite'

const baseURL =
  (
    globalThis as typeof globalThis & {
      process?: { env?: { NODE_ENV?: string } }
    }
  ).process?.env?.NODE_ENV === 'production'
    ? '/juamaya-logistica/'
    : '/'

export default defineNuxtConfig({
  modules: ['@nuxt/image'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()]
  },

  app: {
    baseURL,

    head: {
      title: 'Juamaya26 | Nuxt',
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: `${baseURL}favicon.ico`
        }
      ]
    }
  }
})
