<script setup lang="ts">
import TextInput from '@whitebird/ui/vue/TextInput'
import Button from '@whitebird/ui/vue/Button'
import * as valibot from 'valibot'

const route = useRoute()

const ParamsSchema = valibot.object({
  organizationId: valibot.string(),
})
const params = valibot.parse(ParamsSchema, route.params)

const { data: _organization, execute: fetchOrganization } = useFetch('/api/get-organization', {
  method: 'POST',
  body: { organizationId: params.organizationId },
})
const organization = computed(() => _organization.value ?? undefined)

const editOrganizations = {
  name: ref(''),
}

async function saveOrganization() {
  await useFetch('/api/edit-organization', {
    method: 'POST',
    body: {
      organizationId: params.organizationId,
      name: editOrganizations.name.value,
    },
  })
  await fetchOrganization()
}

async function createProject() {
  await useFetch('/api/create-project', {
    method: 'POST',
    body: {
      organizationId: params.organizationId,
      project: {
        name: 'My project',
      },
    },
  })
  await fetchOrganization()
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
        {{ organization?.name }}
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
        placeholder="Organization name"
        :value="organization?.name"
        @change="(value: string) => editOrganizations.name.value = value"
      />
      <Button
        variant="secondary"
        text="Save"
        @click="saveOrganization"
      />
    </section>
    <section
      :class="css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'safe start',
        alignItems: 'safe start',
        gap: 'small',
      })"
    >
      <header
        :class="css({
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        })"
      >
        <h2
          :class="css({
            textStyle: 'heading3',
          })"
        >
          Projects
        </h2>
        <Button
          text="Create project"
          icon-name="add"
          size="small"
          @click="createProject"
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
          v-for="project in organization?.projects ?? []"
          :key="project.id"
          :class="css({
            display: 'flex',
            flexDirection: 'column',

            bg: 'uiElementBackground',
            color: 'highContrastForeground',

            w: '300px',
            padding: 'medium',

            cursor: 'pointer',
          })"
        >
          <h5
            :class="css({
              textStyle: 'label'
            })"
          >
            {{ project.name }}
          </h5>
        </button>
      </div>
    </section>
  </div>
</template>
