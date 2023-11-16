type AuthService = (
  Extract<Parameters<typeof useFetch>[0], `/api/auth/${string}`> extends `/api/auth/${infer Service}`
  ? Service
  : never
)

export const useAuth = () => {
  const { loggedIn, user, session, clear: clearSession, fetch: fetchSession } = useUserSession()

  async function login(service: AuthService) {
    await navigateTo(`/api/auth/${service}`, {
      external: true,
      open: {
        target: '_blank',
      },
    })
  }

  function logout() {
    clearSession()
  }

  onMounted(() => {
    if (typeof window === "undefined") {
      return
    }

    window.addEventListener(
      "message",
      (event) => {
        if (event.data.type === "auth") {
          fetchSession()
        }
      },
      false,
    );
  })

  return {
    loggedIn,
    user,
    session,
    login,
    logout,
  }
}
