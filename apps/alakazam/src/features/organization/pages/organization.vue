<script setup lang="ts">
import TextInput from '@whitebird/ui/vue/TextInput'
import Button from '@whitebird/ui/vue/Button'

import { flex, grid } from '~/styled-system/patterns';

definePageMeta({
  middleware: ['auth'],
})

const route = useRoute('organization-page')

const {
  organization,
  saveOrganization: _saveOrganization,
  createProject,
  openProject,
} = useOrganization({ id: route.params.organizationId })

const editOrganization = {
  name: ref<string>(),
}

const saveOrganization = () => _saveOrganization({
  name: editOrganization.name.value,
})
</script>

<template>
  <div :class="flex({ direction: 'column', justify: 'start', padding: 'medium', gap: 'medium' })">
    <header>
      <h2 :class="css({ textStyle: 'heading2' })">
        {{ organization?.name }}
      </h2>
    </header>

    <section :class="flex({ direction: 'column', justify: 'start', align: 'start', gap: 'small' })">
      <h3 :class="css({ textStyle: 'heading3' })">
        Settings
      </h3>

      <label :class="css({ textStyle: 'label' })">
        Organization name
      </label>
      <TextInput
        placeholder="Organization name"
        :value="organization?.name"
        @change="(value: string) => editOrganization.name.value = value"
      />

      <Button
        variant="secondary"
        text="Save"
        @click="saveOrganization()"
      />
    </section>

    <section :class="flex({ direction: 'column', gap: 'medium' })">
      <header :class="flex({ direction: 'row', justify: 'space-between', align: 'center', width: '100%' })">
        <h3 :class="css({ textStyle: 'heading3' })">
          Projects
        </h3>
        <Button
          text="Create project"
          icon-name="add"
          size="small"
          @click="createProject()"
        />
      </header>
      <div :class="grid({ columns: 3, gap: 'medium' })">
        <Card
          v-for="project in organization?.projects ?? []"
          :key="project.id"
          @click="openProject(project)"
        >
          <template #title>
            {{ project.name }}
          </template>
        </Card>
      </div>
    </section>
  </div>
</template>
