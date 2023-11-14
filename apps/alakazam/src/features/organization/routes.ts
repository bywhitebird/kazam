import { defineNuxtRoutes } from "~/shared/utils/define-nuxt-routes";

export default defineNuxtRoutes(__dirname, [
  {
    name: 'organization-list-page',
    path: '/organizations',
    file: './pages/organization-list.vue',
  },
])
