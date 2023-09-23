<script setup lang="ts">
const { data } = await useAsyncData(async () => 3)
</script>

<template>
  <div :class="css({ fontSize: 'sm', fontWeight: 'bolder' })">
    Hello 🐼! {{ data }}
  </div>
  <Box margin="1" bg="primary" text-align="center" fontSize="md">
    Bonjour 🐼!
  </Box>
</template>
