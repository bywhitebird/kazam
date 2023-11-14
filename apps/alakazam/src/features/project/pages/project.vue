<script setup lang="ts">
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
  </div>
</template>
