import type { Meta, StoryObj } from '@storybook/react';
import Layout from '../components/Layout';
import { COLORS } from '../static/others';

const meta = {
  title: 'Containers/Layout',
  component: Layout,
  tags: ['autodocs'],
  argTypes: {
    color: { options: COLORS, control: "select", type: "string" },
    children: { control: 'text' }
  },
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const layout: Story = {
  args: {
    children: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    title: "TITULO PRINCIPAL",
    color: "primary"
  },
};
