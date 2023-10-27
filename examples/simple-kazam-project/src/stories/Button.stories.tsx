import type { StoryObj } from '@storybook/react'

import Button from '../components/Button.kaz'

export default {
  title: 'Example/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    callback: { action: 'clicked' },
  },
}

export const Primary: StoryObj = {
  args: {
    buttonText: 'Button',
    color: 'red',
  },
}
