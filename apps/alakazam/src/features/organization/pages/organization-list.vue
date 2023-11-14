<script setup lang="ts">
import Button from "@whitebird/ui/vue/button"

definePageMeta({
  middleware: ['auth']
})

const { data: _allOrganizations, execute: fetchOrganizations } = useFetch('/api/get-all-organizations', {
  method: 'POST',
})
const allOrganizations = computed(() => _allOrganizations.value ?? [])

async function createOrganization() {
  await useFetch('/api/create-new-organization', {
    method: 'POST',
    body: { name: 'My organization' }
  })
  await fetchOrganizations()
}

async function openOrganization(organization: { id: string }) {
  await navigateTo(`/organizations/${organization.id}`)
}
</script>

<template>
  <div
    :class="css({
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'safe start',
    })"
  >
    <header
      :class="css({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 'medium',
      })"
    >
      <h1
        :class="css({
          textStyle: 'heading2'
        })"
      >
        Organizations
      </h1>
      <Button
        text="Create organization"
        icon-name="add"
        size="small"
        @click="createOrganization"
      />
    </header>
    <div
      :class="css({
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 'medium',
        gap: 'medium',
      })"
    >
      <button
        v-for="organization in allOrganizations"
        :key="organization.id"
        :class="css({
          display: 'flex',
          flexDirection: 'column',

          bg: 'uiElementBackground',
          color: 'highContrastForeground',

          w: '300px',
          padding: 'medium',

          cursor: 'pointer',
        })"
        @click="openOrganization(organization)"
      >
        <h5
          :class="css({
            textStyle: 'label'
          })"
        >
          {{ organization.name }}
        </h5>
      </button>
    </div>
  </div>
</template>
