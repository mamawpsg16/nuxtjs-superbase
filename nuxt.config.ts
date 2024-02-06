// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    // ...
    '@pinia/nuxt',
    "@nuxtjs/supabase"
  ],
  plugins:[
    { src: '~/plugins/bootstrap.js', mode:'client'},
  ],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "~/assets/scss/main.scss" as *;
          `
          
        }
      }
    }
  },
  css:[
    'bootstrap/dist/css/bootstrap.css',
    '~/assets/css/main.css',
    '@fortawesome/fontawesome-free/css/all.min.css'
  ],
  vue: {
    propsDestructure: true
  },
  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: '123',
    // Keys within public are also exposed client-side
    public: {
      apiBase: '/api',
      dbProjectUrl: process.env.SUPABASE_PROJECT_URL,
      dbApiKey: process.env.SUPABASE_PROJECT_API_KEY_URL,
    }
  },
  devtools: { enabled: true }
})
