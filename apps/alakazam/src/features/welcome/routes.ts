import { defineNuxtRoutes } from "~/shared/utils/define-nuxt-routes";

export default defineNuxtRoutes(__dirname, [
  {
    name: 'welcome-page',
    path: '/',
    file: './pages/welcome.vue',
  },
])
