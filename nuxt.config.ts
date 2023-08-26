import { build } from "nuxt";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  runtimeConfig: {
    public: {
      MOVIES_KEY: process.env.MOVIES_API_KEY
    }
  },
  css: [
    '@/assets/css/main.css'
  ]
})