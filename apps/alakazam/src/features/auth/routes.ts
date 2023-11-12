import { defineNuxtRoutes } from "~/shared/utils/define-nuxt-routes";

export default defineNuxtRoutes(__dirname, [
  {
    name: 'login-page',
    path: '/login',
    file: './pages/login.vue',
  },
])
