import { defineNuxtRoutes } from "~/shared/utils/define-nuxt-routes";

export default defineNuxtRoutes(__dirname, [
  {
    name: 'project-page',
    path: '/projects/:projectId',
    file: './pages/project.vue',
  },
])
