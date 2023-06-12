import { TransformerInputFactory } from '../../../factories/transform-input'

export const stateInstructionFixtures = [
  {
    name: 'When I pass a state instruction, component is generated',
    input: TransformerInputFactory.create({
      instructions: [
        {
          $type: 'StateInstruction',
          name: 'color',
          type: 'string',
        },
      ],
    }),
    expectedOutput: {
      'components/Test.vue': `
        <script lang="ts" setup>
        import { ref } from 'vue'

        const color = ref<string>()

        const __$$kaz_component = () => {}
        </script>

        <template>
          <component :is="__$$kaz_component" />
        </template>
      `,
    },
  },
  {
    name: 'When I pass a state instruction with default value, component is generated',
    input: TransformerInputFactory.create({
      instructions: [
        {
          $type: 'StateInstruction',
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
        import { ref } from 'vue'

        const color = ref<string>('red')

        const __$$kaz_component = () => {}
        </script>

        <template>
          <component :is="__$$kaz_component" />
        </template>
      `,
    },
  },
  {
    name: 'When I pass a state instruction without type, component is generated',
    input: TransformerInputFactory.create({
      instructions: [
        {
          $type: 'StateInstruction',
          name: 'color',
        },
      ],
    }),
    expectedOutput: {
      'components/Test.vue': `
        <script lang="ts" setup>
        import { ref } from 'vue'

        const color = ref()

        const __$$kaz_component = () => {}
        </script>

        <template>
          <component :is="__$$kaz_component" />
        </template>
      `,
    },
  },
  {
    name: 'When I pass multiple state instructions, component is generated',
    input: TransformerInputFactory.create({
      instructions: [
        {
          $type: 'StateInstruction',
          name: 'color',
          type: 'string',
        },
        {
          $type: 'StateInstruction',
          name: 'size',
          defaultValue: {
            expression: '10',
          },
        },
      ],
    }),
    expectedOutput: {
      'components/Test.vue': `
        <script lang="ts" setup>
        import { ref } from 'vue'

        const color = ref<string>()
        const size = ref<number>(10)

        const __$$kaz_component = () => {}
        </script>

        <template>
          <component :is="__$$kaz_component" />
        </template>
      `,
    },
  },
]
