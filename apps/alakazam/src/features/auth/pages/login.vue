<script setup lang="ts">
import Button from "@whitebird/ui/vue/button"

const { loggedIn, user, session, clear: clearSession, fetch: fetchSession } = useUserSession()

async function login() {
  await navigateTo(`/api/auth/github`, {
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
</script>

<template>
  <div
    :class="css({
      bg: 'appBackground',
      color: 'highContrastForeground',

      height: '100dvh',
      width: '100dvw',

      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'safe center',

      overflow: 'auto',
      scrollbarGutter: 'stable',
    })"
  >
    <Button
      text="Login with GitHub"
      variant="primary"
      icon-name="github"
      @click="login"
    />
    <Button
      text="Logout"
      variant="secondary"
      icon-name="logout-box"
      @click="logout"
    />
    <pre>{{ loggedIn }}</pre>
    <pre>{{ session }}</pre>
    <pre>{{ user }}</pre>
  </div>
</template>
