<script setup lang="ts">
import Button from "@whitebird/ui/vue/button"

const { loggedIn, user, session, login, logout } = useAuth()
</script>

<template>
  <div
    :class="css({
      height: '100%',

      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'safe center',
    })"
  >
    <Button
      text="Login with GitHub"
      variant="primary"
      icon-name="github"
      @click="login('github')"
    />
    <Button
      text="Logout"
      variant="secondary"
      icon-name="logout-box"
      @click="logout()"
    />
    <pre>{{ loggedIn }}</pre>
    <pre>{{ session }}</pre>
    <pre>{{ user }}</pre>
  </div>
</template>
