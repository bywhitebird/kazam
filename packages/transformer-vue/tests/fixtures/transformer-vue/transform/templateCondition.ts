import { TransformerInputFactory } from '../../../factories/transform-input'

export const templateConditionFixtures = [
  {
    name: 'When I pass conditional content, component is generated',
    input: TransformerInputFactory.create({
      template: [
        {
          $type: 'IfLogical',
          condition: '0 === 0',
          children: [{ $type: 'Text', text: 'Hello world' }],
        },
      ],
    }),
    expectedOutput: {
      'components/Test.vue': `
        <script lang="ts" setup>
        </script>

        <template>
          <div v-if="0 === 0">Hello world</div>
        </template>
      `,
    },
  },
  {
    name: 'When I pass conditional content with else, component is generated',
    input: TransformerInputFactory.create({
      template: [
        {
          $type: 'IfLogical',
          condition: '0 === 0',
          children: [{ $type: 'Text', text: 'Hello world' }],
          else: {
            $type: 'ElseLogical',
            children: [{ $type: 'Text', text: 'Goodbye world' }],
          },
        },
      ],
    }),
    expectedOutput: {
      'components/Test.vue': `
        <script lang="ts" setup>
        </script>

        <template>
          <div v-if="0 === 0">Hello world</div>
          <div v-else>Goodbye world</div>
        </template>
      `,
    },
  },
  {
    name: 'When I pass conditional content with multiple else if and else, component is generated',
    input: TransformerInputFactory.create({
      template: [
        {
          $type: 'IfLogical',
          condition: '0 === 0',
          children: [{ $type: 'Text', text: 'Hello world' }],
          else: {
            $type: 'ElseLogical',
            if: {
              $type: 'ElseIfLogical',
              condition: '0 === 1',
              children: [{ $type: 'Text', text: 'Goodbye world' }],
              else: {
                $type: 'ElseLogical',
                if: {
                  $type: 'ElseIfLogical',
                  condition: '0 === 2',
                  children: [{ $type: 'Text', text: 'Good night world' }],
                  else: {
                    $type: 'ElseLogical',
                    children: [{ $type: 'Text', text: 'Bad night world' }],
                  },
                },
              },
            },
          },
        },
      ],
    }),
    expectedOutput: {
      'components/Test.vue': `
        <script lang="ts" setup>
        const __$$kaz_component = (() => {
          if (0 === 0) {
            return 'Hello world'
          } else if (0 === 1) {
            return 'Goodbye world'
          } else if (0 === 2) {
            return 'Good night world'
          } else {
            return 'Bad night world'
          }
        })
        </script>

        <template>
          <component :is="__$$kaz_component" />
        </template>
      `,
    },
  },
]
