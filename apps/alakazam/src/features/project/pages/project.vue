<script setup lang="ts">
import Select from '@whitebird/ui/vue/Select'
import Button from '@whitebird/ui/vue/Button'
import TextInput from '@whitebird/ui/vue/TextInput'

import { flex } from '~/styled-system/patterns'

definePageMeta({
  middleware: ['auth'],
})

const route = useRoute('project-page')

const { project, saveProject: _saveProject } = useProject({
  id: route.params.projectId,
})

const { repositories } = useGitHubRepositories()

const editProject = {
  repositoryUrl: ref<string>(),
  projectName: ref<string>(),
}

const saveProject = () => _saveProject({
  name: editProject.projectName.value,
  repositoryUrl: editProject.repositoryUrl.value,
})
</script>

<template>
  <div :class="flex({ direction: 'column', justify: 'start', gap: 'medium', padding: 'medium' })">
    <header>
      <h2 :class="css({ textStyle: 'heading2' })">
        {{ project?.name }}
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
        placeholder="Project name"
        :value="project?.name"
        @change="(value: string) => editProject.projectName.value = value"
      />

      <label :class="css({ textStyle: 'label' })">
        Repositories
      </label>
      <Select
        :values="repositories?.map(repository => ({
          value: repository.url,
          label: repository.full_name ?? repository.name,
          selected: repository.url === project?.sources.at(-1)?.githubRepository?.url,
        })) ?? []"
        placeholder="Select a repository"
        @change="(value: string) => editProject.repositoryUrl.value = value"
      />

      <Button
        variant="secondary"
        text="Save"
        @click="saveProject()"
      />
    </section>
  </div>
</template>
