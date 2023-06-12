import { TransformerInputFactory } from '../../../factories/transform-input'

export const templateTagFixtures = [
  {
    name: 'When I pass content with tag, component is generated',
    input: TransformerInputFactory.create({
      template: [
        {
          $type: 'Tag',
          tagName: 'div',
          attributes: [],
          children: [{ $type: 'Text', text: 'Hello world' }],
        },
      ],
    }),
    expectedOutput: {
      'components/Test.vue': `
        <script lang="ts" setup>
        import { h } from 'vue'

        const __$$kaz_component = () => {
          return h('div', null, 'Hello world')
        }
        </script>

        <template>
          <component :is="__$$kaz_component" />
        </template>
      `,
    },
  },
  {
    name: 'When I pass content with tag and attributes, component is generated',
    input: TransformerInputFactory.create({
      template: [
        {
          $type: 'Tag',
          tagName: 'div',
          attributes: [
            {
              $type: 'TagAttribute',
              name: 'class',
              value: 'hello',
            },
            {
              $type: 'TagAttribute',
              name: 'id',
              expression: 'id',
            },
          ],
          children: [{ $type: 'Text', text: 'Hello world' }],
        },
      ],
    }),
    expectedOutput: {
      'components/Test.vue': `
        <script lang="ts" setup>
        import { h } from 'vue'

        const __$$kaz_component = () => {
          return h('div', { class: 'hello', id: id }, 'Hello world')
        }
        </script>

        <template>
          <component :is="__$$kaz_component" />
        </template>
      `,
    },
  },
  {
    name: 'When I pass content with tag without children, component is generated',
    input: TransformerInputFactory.create({
      template: [
        {
          $type: 'Tag',
          tagName: 'div',
          attributes: [],
          children: [],
        },
      ],
    }),
    expectedOutput: {
      'components/Test.vue': `
        <script lang="ts" setup>
        import { h } from 'vue'

        const __$$kaz_component = () => {
          return h('div')
        }
        </script>

        <template>
          <component :is="__$$kaz_component" />
        </template>
      `,
    },
  },
  {
    name: 'When I pass content with tag and events, component is generated',
    input: TransformerInputFactory.create({
      template: [
        {
          $type: 'Tag',
          tagName: 'div',
          attributes: [
            {
              $type: 'TagEventAttribute',
              name: 'click',
              expression: 'handleClick',
            },
          ],
          children: [],
        },
      ],
    }),
    expectedOutput: {
      'components/Test.vue': `
        <script lang="ts" setup>
        import { h } from 'vue'

        const __$$kaz_component = () => {
          return h('div', { onClick: handleClick })
        }
        </script>

        <template>
          <component :is="__$$kaz_component" />
        </template>
      `,
    },
  },
  {
    name: 'When I pass content with tag and children, component is generated',
    input: TransformerInputFactory.create({
      template: [
        {
          $type: 'Tag',
          tagName: 'div',
          attributes: [],
          children: [
            {
              $type: 'Tag',
              tagName: 'span',
              attributes: [],
              children: [{ $type: 'Text', text: 'Hello world' }],
            },
          ],
        },
      ],
    }),
    expectedOutput: {
      'components/Test.vue': `
        <script lang="ts" setup>
        import { h } from 'vue'

        const __$$kaz_component = () => {
          return h('div', null, h('span', null, 'Hello world'))
        }
        </script>

        <template>
          <component :is="__$$kaz_component" />
        </template>
      `,
    },
  },
]
