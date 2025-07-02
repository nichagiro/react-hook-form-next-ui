import type { Meta, StoryObj } from '@storybook/react-vite';
import Panel from '../components/Panel';
import { COLORS } from '../static/others';

const meta = {
  title: 'Containers/Panel',
  component: Panel,
  tags: ['autodocs'],
  argTypes: {
    color: { options: COLORS, control: "select", type: "string" },
    children: { control: 'text' }
  },
} satisfies Meta<typeof Panel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const panel: Story = {
  args: {
    children: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    title: "TITULO PANEL",
    collapse: false,
    color: "primary"
  },
};
