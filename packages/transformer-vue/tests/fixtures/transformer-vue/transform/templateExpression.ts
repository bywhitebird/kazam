import { TransformerInputFactory } from '../../../factories/transform-input'

export const templateExpressionFixtures = [
  {
    name: 'When I pass content of type expression, component is generated',
    input: TransformerInputFactory.create({
      template: [{ $type: 'Expression', expression: '1 + 1' }],
    }),
    expectedOutput: {
      'components/Test.vue': `
        <script lang="ts" setup>
        const __$$kaz_component = (() => {
          return 1 + 1
        })
        </script>

        <template>
          <component :is="__$$kaz_component" />
        </template>
      `,
    },
  },
]
