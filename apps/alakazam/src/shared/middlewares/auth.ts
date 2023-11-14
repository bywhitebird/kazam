export default defineNuxtRouteMiddleware(async to => {
  if (!process.server) return

  const { user } = useUserSession()

  if (!user.value) {
    return navigateTo('/login', { replace: true })
  }
})
