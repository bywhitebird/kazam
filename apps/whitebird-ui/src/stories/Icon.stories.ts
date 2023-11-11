// import type { StoryObj } from '@storybook/react'
import { token } from '../../styled-system/tokens'
import _Icon from '../components/Icon.kaz'

_Icon.displayName = 'Icon'

type StoryObj = unknown

export default {
  title: 'Icon',
  component: _Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Icon component. The icons are from [Remix Icon](https://remixicon.com/).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      type: 'string',
      control: 'text',
    },
    fill: {
      type: 'boolean',
    },
    color: {
      control: 'color',
    },
    size: {
      type: 'string',
      control: 'text',
    },
  },
}

export const Icon: StoryObj = {
  args: {
    name: 'circle',
    fill: true,
    color: token('colors.highContrastForeground'),
    size: '24',
  },
}
