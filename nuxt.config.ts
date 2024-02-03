// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  ssr: false,
  app: {
    baseURL: '/sarmayex/'
  },
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', "@nuxt/image"],
  plugins: [],
  tailwindcss: {
    // Options
  }
})
