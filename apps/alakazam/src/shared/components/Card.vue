<script setup lang="ts">
import { flex } from '~/styled-system/patterns';
</script>

<template>
  <div
    :class="flex({
      direction: 'column',
      gap: 'small',

      bg: 'uiElementBackground',
      color: 'highContrastForeground',

      padding: 'medium',

      cursor: 'pointer',
    })"
  >
    <div
      v-if="$slots.title"
      :class="css({ display: 'content', textStyle: 'label', color: 'highContrastForeground' })"
    >
      <slot name="title" />
    </div>
    <div
      v-if="$slots.content"
      :class="css({ display: 'content', textStyle: 'body', color: 'lowContrastForeground' })"
    >
      <slot name="content" />
    </div>
  </div>
</template>
