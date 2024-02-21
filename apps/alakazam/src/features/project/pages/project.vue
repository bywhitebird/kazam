<script setup lang="ts">
import Select from '@whitebird/ui/vue/Select.vue'
import Button from '@whitebird/ui/vue/Button.vue'
import TextInput from '@whitebird/ui/vue/TextInput.vue'

import { flex } from '~/styled-system/patterns'

definePageMeta({
  middleware: ['auth'],
})

const route = useRoute('project-page')

const { project, saveProject: _saveProject, downloadComponents } = useProject({
  id: route.params.projectId,
})

const { repositories } = useGitHubRepositories()

const editProject = {
  repositoryUrl: ref<string>(),
  rootDir: ref<string>(),
  projectName: ref<string>(),
}

const saveProject = () => _saveProject({
  name: editProject.projectName.value,
  repository: editProject.repositoryUrl.value ? {
    url: editProject.repositoryUrl.value,
    rootDir: editProject.rootDir.value,
  } : undefined,
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
          selected: repository.url === project?.sources.at(-1)?.url,
        })) ?? []"
        placeholder="Select a repository"
        @change="(value: string) => editProject.repositoryUrl.value = value"
      />

      <label :class="css({ textStyle: 'label' })">
        Root directory
      </label>
      <TextInput
        placeholder="Root directory"
        :value="project?.sources.at(-1)?.githubRepository?.rootDir"
        @change="(value: string) => editProject.rootDir.value = value"
      />

      <Button
        variant="secondary"
        text="Save"
        @click="saveProject()"
      />
    </section>

    <section>
      <h3 :class="css({ textStyle: 'heading3' })">
        Components
      </h3>

      <Button
        variant="secondary"
        text="Download components"
        icon-name="download"
        @click="downloadComponents()"
      />
    </section>
  </div>
</template>
