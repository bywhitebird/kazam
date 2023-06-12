import { TransformerInputFactory } from '../../../factories/transform-input'

export const propInstructionFixtures = [
  {
    name: 'When I pass a prop instruction, component is generated',
    input: TransformerInputFactory.create({
      instructions: [
        {
          $type: 'PropInstruction',
          name: 'color',
          type: 'string',
        },
      ],
    }),
    expectedOutput: {
      'components/Test.vue': `
        <script lang="ts" setup>
        import type { PropType } from 'vue'

        const { color } = defineProps({
          color: {
            type: String as PropType<string>,
            required: true,
          },
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
    name: 'When I pass a prop instruction with default value, component is generated',
    input: TransformerInputFactory.create({
      instructions: [
        {
          $type: 'PropInstruction',
          name: 'color',
          type: 'string',
          defaultValue: {
            expression: '\'red\'',
          },
        },
      ],
    }),
    expectedOutput: {
      'components/Test.vue': `
        <script lang="ts" setup>
        import type { PropType } from 'vue'

        const { color } = defineProps({
          color: {
            type: String as PropType<string>,
            required: true,
            default: 'red',
          },
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
    name: 'When I pass a prop instruction without type, component is generated',
    input: TransformerInputFactory.create({
      instructions: [
        {
          $type: 'PropInstruction',
          name: 'color',
        },
      ],
    }),
    expectedOutput: {
      'components/Test.vue': `
        <script lang="ts" setup>
        import type { PropType } from 'vue'

        const { color } = defineProps({
          color: {
            type: String as PropType<string>,
            required: true,
          },
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
    name: 'When I pass multiple prop instructions, component is generated',
    input: TransformerInputFactory.create({
      instructions: [
        {
          $type: 'PropInstruction',
          name: 'color',
          type: 'string',
        },
        {
          $type: 'PropInstruction',
          name: 'size',
          type: 'number',
        },
      ],
    }),
    expectedOutput: {
      'components/Test.vue': `
        <script lang="ts" setup>
        import type { PropType } from 'vue'

        const { color, size } = defineProps({
          color: {
            type: String as PropType<string>,
            required: true,
          },
          size: {
            type: Number as PropType<number>,
            required: true,
          },
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
