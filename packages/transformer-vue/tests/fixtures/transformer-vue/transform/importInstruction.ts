import { TransformerInputFactory } from '../../../factories/transform-input'

export const importInstructionFixtures = [
  {
    name: 'When I pass a default import instruction, component is generated',
    input: TransformerInputFactory.create({
      instructions: [
        {
          $type: 'ImportInstruction',
          imports: [
            {
              $type: 'DefaultImport',
              name: 'UI',
            },
          ],
          from: 'whitebird-ui',
        },
      ],
    }),
    expectedOutput: {
      'components/Test.vue': `
        <script lang="ts" setup>
        import UI from 'whitebird-ui'

        const __$$kaz_component = () => {}
        </script>

        <template>
          <component :is="__$$kaz_component" />
        </template>
      `,
    },
  },
  {
    name: 'When I pass a named import instruction, component is generated',
    input: TransformerInputFactory.create({
      instructions: [
        {
          $type: 'ImportInstruction',
          imports: [
            {
              $type: 'NamedImport',
              name: 'Button',
            },
          ],
          from: 'whitebird-ui',
        },
      ],
    }),
    expectedOutput: {
      'components/Test.vue': `
        <script lang="ts" setup>
        import { Button } from 'whitebird-ui'

        const __$$kaz_component = () => {}
        </script>

        <template>
          <component :is="__$$kaz_component" />
        </template>
      `,
    },
  },
  {
    name: 'When I pass a namespace import instruction, component is generated',
    input: TransformerInputFactory.create({
      instructions: [
        {
          $type: 'ImportInstruction',
          imports: [
            {
              $type: 'NamespaceImport',
              name: 'components',
            },
          ],
          from: 'whitebird-ui',
        },
      ],
    }),
    expectedOutput: {
      'components/Test.vue': `
        <script lang="ts" setup>
        import * as components from 'whitebird-ui'

        const __$$kaz_component = () => {}
        </script>

        <template>
          <component :is="__$$kaz_component" />
        </template>
      `,
    },
  },
  {
    name: 'When I pass a default and named import instruction, component is generated',
    input: TransformerInputFactory.create({
      instructions: [
        {
          $type: 'ImportInstruction',
          imports: [
            {
              $type: 'DefaultImport',
              name: 'UI',
            },
            {
              $type: 'NamedImport',
              name: 'Button',
            },
          ],
          from: 'whitebird-ui',
        },
      ],
    }),
    expectedOutput: {
      'components/Test.vue': `
        <script lang="ts" setup>
        import UI, { Button } from 'whitebird-ui'

        const __$$kaz_component = () => {}
        </script>

        <template>
          <component :is="__$$kaz_component" />
        </template>
      `,
    },
  },
  {
    name: 'When I pass a default and namespace import instruction, component is generated',
    input: TransformerInputFactory.create({
      instructions: [
        {
          $type: 'ImportInstruction',
          imports: [
            {
              $type: 'DefaultImport',
              name: 'UI',
            },
            {
              $type: 'NamespaceImport',
              name: 'components',
            },
          ],
          from: 'whitebird-ui',
        },
      ],
    }),
    expectedOutput: {
      'components/Test.vue': `
        <script lang="ts" setup>
        import UI from 'whitebird-ui'
        import * as components from 'whitebird-ui'

        const __$$kaz_component = () => {}
        </script>

        <template>
          <component :is="__$$kaz_component" />
        </template>
      `,
    },
  },
]
