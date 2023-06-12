import { TransformerInputFactory } from '../../../factories/transform-input'

export const computedInstructionFixtures = [
  {
    name: 'When I pass a computed instruction, component is generated',
    input: TransformerInputFactory.create({
      instructions: [
        {
          $type: 'ComputedInstruction',
          name: 'computed',
          computeValue: {
            expression: '1 + 1',
          },
        },
      ],
    }),
    expectedOutput: {
      'components/Test.vue': `
        <script lang="ts" setup>
        import { computed } from 'vue'

        const computed = computed(() => 1 + 1)

        const __$$kaz_component = () => {}
        </script>

        <template>
          <component :is="__$$kaz_component" />
        </template>
      `,
    },
  },
]
