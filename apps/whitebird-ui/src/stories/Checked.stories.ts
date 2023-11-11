// import type { StoryObj } from '@storybook/react'
import _Checkbox from '../components/Checkbox.kaz'

_Checkbox.displayName = 'Checkbox'

type StoryObj = unknown

export default {
  title: 'Checkbox',
  component: _Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Checkbox component.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      type: 'boolean',
    },
    name: {
      type: 'string',
      control: 'text',
    },
    onChange: { action: 'onChange' },
  },
}

export const Checkbox: StoryObj = {
  args: {
    value: false,
  },
}
