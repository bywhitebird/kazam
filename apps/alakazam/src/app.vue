<template>
  <body
    :class="css({
      bg: 'appBackground',
      color: 'highContrastForeground',

      textStyle: 'body',

      height: '100dvh',
      width: '100dvw',

      overflow: 'auto',
      scrollbarGutter: 'stable',
    })"
  >
    <NuxtPage />
  </body>
</template>
