import { TransformerInputFactory } from '../../../factories/transform-input'

export const watchInstructionFixtures = [
  {
    name: 'When I pass a watcher instruction, component is generated',
    input: TransformerInputFactory.create({
      instructions: [
        {
          $type: 'WatchInstruction',
          watchedVariables: [
            { name: 'color', type: 'string' },
          ],
          callbackExpression: 'console.log(color)',
        },
      ],
    }),
    expectedOutput: {
      'components/Test.vue': `
        <script lang="ts" setup>
        import { watch } from 'vue'

        watch(color, (color) => {
          console.log(color)
        })

        const __$$kaz_component = () => {}
        </script>

        <template>
          <component :is="__$$kaz_component" />
        </template>
      `,
    },
  },
  {
    name: 'When I pass a watcher instruction with multiple watched variables, component is generated',
    input: TransformerInputFactory.create({
      instructions: [
        {
          $type: 'WatchInstruction',
          watchedVariables: [
            { name: 'color' },
            { name: 'size' },
          ],
          callbackExpression: 'console.log(color, size)',
        },
      ],
    }),
    expectedOutput: {
      'components/Test.vue': `
        <script lang="ts" setup>
        import { watch } from 'vue'

        watch([color, size], ([color, size]) => {
          console.log(color, size)
        })
        
        const __$$kaz_component = () => {}
        </script>

        <template>
          <component :is="__$$kaz_component" />
        </template>
      `,
    },
  },
]
