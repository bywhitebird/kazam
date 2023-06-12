import { TransformerInputFactory } from '../../../factories/transform-input'

export const templateForFixtures = [
  {
    name: 'When I pass content with a for loop, component is generated',
    input: TransformerInputFactory.create({
      template: [
        {
          $type: 'ForLogical',
          parameters: 'let i = 0; i < 10; i++',
          children: [{ $type: 'Expression', expression: 'i' }],
        },
      ],
    }),
    expectedOutput: {
      'components/Test.vue': `
        <script lang="ts" setup>
        const __$$kaz_component = () => {
          return Array.from((function* () {
            for (let i = 0; i < 10; i++) {
              yield i
            }
          })())
        }
        </script>

        <template>
          <component :is="__$$kaz_component" />
        </template>
      `,
    },
  },
]
