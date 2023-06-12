import { TransformerInputFactory } from '../../../factories/transform-input'

export const templateTextFixtures = [
  {
    name: 'When I pass content of type text, component is generated',
    input: TransformerInputFactory.create({
      template: [{ $type: 'Text', text: 'Hello world' }],
    }),
    expectedOutput: {
      'components/Test.vue': `
        <script lang="ts" setup>
        const __$$kaz_component = () => {
          return 'Hello world'
        }
        </script>

        <template>
          <component :is="__$$kaz_component" />
        </template>
      `,
    },
  },
]
