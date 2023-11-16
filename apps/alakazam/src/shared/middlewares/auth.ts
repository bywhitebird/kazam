export default defineNuxtRouteMiddleware(async to => {
  if (!process.server) return

  const { user } = useAuth()

  if (!user.value) {
    return navigateTo('/login', { replace: true })
  }
})
