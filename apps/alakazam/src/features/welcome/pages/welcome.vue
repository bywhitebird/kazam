<script setup lang="ts">
import Button from "@whitebird/ui/vue/button"
</script>

<template>
  <div>
    test
    <Welcome />
    <NuxtLink :to="{ name: 'welcome-page' }">
      TEST 43
    </NuxtLink>
    <Button
      text="THIS IS A BUTTON"
      variant="secondary"
      icon-name="square"
      @click="() => console.log('BUTTON CLICKED')"
    />
  </div>
</template>
