// import type { StoryObj } from '@storybook/react'
import Button from '../components/Button.kaz'

Button.displayName = 'Button'

type StoryObj = unknown

export default {
  title: 'Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Button component',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      type: 'select',
      options: ['primary', 'secondary', 'tertiary'],
    },
    size: {
      type: 'select',
      options: ['small', 'normal'],
    },
    onClick: { action: 'clicked' },
  },
}

export const Primary: StoryObj = {
  args: {
    text: 'Button',
    variant: 'primary',
    size: 'normal',
  },
}

export const Secondary: StoryObj = {
  args: {
    text: 'Button',
    variant: 'secondary',
    size: 'normal',
  },
}

export const Tertiary: StoryObj = {
  args: {
    text: 'Button',
    variant: 'tertiary',
    size: 'normal',
  },
}
