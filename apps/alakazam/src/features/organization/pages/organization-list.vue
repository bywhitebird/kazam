<script setup lang="ts">
import Button from "@whitebird/ui/vue/Button.vue"

import { flex, grid } from "~/styled-system/patterns";

definePageMeta({
  middleware: ['auth'],
})

const {
  organizations,
  createOrganization,
  openOrganization,
} = useOrganizations()
</script>

<template>
  <div :class="flex({ direction: 'column', justify: 'start', gap: 'medium', padding: 'medium' })">
    <header :class="flex({ direction: 'row', justify: 'space-between', align: 'center' })">
      <h2 :class="css({ textStyle: 'heading2' })">
        Organizations
      </h2>
      <Button
        text="Create organization"
        icon-name="add"
        size="small"
        @click="createOrganization()"
      />
    </header>

    <section :class="flex({ direction: 'column', gap: 'medium' })">
      <h3 :class="css({ textStyle: 'heading3' })">
        Your organizations
      </h3>
      <div :class="grid({ columns: 3, gap: 'medium' })">
        <Card
          v-for="organization in organizations"
          :key="organization.id"
          @click="openOrganization(organization)"
        >
          <template #title>
            {{ organization.name }}
          </template>
        </Card>
      </div>
    </section>
  </div>
</template>
