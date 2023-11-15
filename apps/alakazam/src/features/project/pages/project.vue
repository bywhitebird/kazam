<script setup lang="ts">
import Select from '@whitebird/ui/vue/Select'
import Button from '@whitebird/ui/vue/Button'
import TextInput from '@whitebird/ui/vue/TextInput'
import * as valibot from 'valibot'

const route = useRoute()

const ParamsSchema = valibot.object({
  projectId: valibot.string(),
})
const params = valibot.parse(ParamsSchema, route.params)

const { data: _project, execute: fetchProject } = useFetch('/api/get-project', {
  method: 'POST',
  body: { projectId: params.projectId },
})
const project = computed(() => _project.value ?? undefined)

const { data: _repositories } = useFetch('/api/get-available-repositories', {
  method: 'POST',
  body: { projectId: params.projectId },
  lazy: true,
})
const repositories = computed(() => _repositories.value ?? undefined)

const editProject = {
  repositoryUrl: ref<string>(),
  projectName: ref<string>(),
}

function changeRepository(repositoryUrl: string) {
  editProject.repositoryUrl.value = repositoryUrl
}

function renameProject(projectName: string) {
  editProject.projectName.value = projectName
}

async function saveProject() {
  await useFetch('/api/edit-project', {
    method: 'POST',
    body: {
      projectId: params.projectId,
      name: editProject.projectName.value ?? project.value?.name,
      repositoryUrl: editProject.repositoryUrl.value,
    },
  })
  await fetchProject()
}
</script>

<template>
  <div
    :class="css({
      padding: 'medium',

      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'safe start',
      gap: 'medium',
    })"
  >
    <header>
      <h1
        :class="css({
          textStyle: 'heading2'
        })"
      >
        {{ project?.name }}
      </h1>
    </header>
    <section
      :class="css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'safe start',
        alignItems: 'safe start',
        gap: 'small',
      })"
    >
      <h2
        :class="css({
          textStyle: 'heading3',
        })"
      >
        Settings
      </h2>
      <label
        :class="css({
          textStyle: 'label',
        })"
      >
        Organization name
      </label>
      <TextInput
        placeholder="Project name"
        :value="project?.name"
        @change="renameProject"
      />
      <label
        :class="css({
          textStyle: 'label',
        })"
      >
        Repositories
      </label>
      <Select
        :values="repositories?.map(repository => ({
          value: repository.url,
          label: repository.full_name ?? repository.name,
          selected: repository.url === project?.sources.at(-1)?.githubRepository?.url,
        }))"
        placeholder="Select a repository"
        @change="changeRepository"
      />
      <Button
        variant="secondary"
        text="Save"
        @click="saveProject"
      />
    </section>
  </div>
</template>
