// import type { StoryObj } from '@storybook/react'
import _TextInput from '../components/TextInput.kaz'

_TextInput.displayName = 'TextInput'

type StoryObj = unknown

export default {
  title: 'TextInput',
  component: _TextInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'TextInput component.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      type: 'string',
      control: 'text',
    },
    placeholder: {
      type: 'string',
      control: 'text',
    },
    iconName: {
      type: 'string',
      control: 'text',
    },
    onChange: { action: 'onChange' },
  },
}

export const TextInput: StoryObj = {
  args: {
    value: '',
    placeholder: 'Placeholder',
    iconName: 'search',
  },
}
