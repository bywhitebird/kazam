// import type { StoryObj } from '@storybook/react'
import _Select from '../components/Select.kaz'

_Select.displayName = 'Select'

type StoryObj = unknown

export default {
  title: 'Select',
  component: _Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Select component.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    values: {
      type: 'array',
      control: 'object',
    },
    placeholder: {
      type: 'string',
      control: 'text',
    },
    onChange: { action: 'onChange' },
  },
}

export const Select: StoryObj = {
  args: {
    values: [
      { value: 1, label: 'Option 1', selected: true },
      { value: 2, label: 'Option 2' },
      { value: 3, label: 'Option 3' },
    ],
    placeholder: 'Placeholder',
  },
}
