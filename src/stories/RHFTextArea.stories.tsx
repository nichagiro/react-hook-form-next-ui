import type { Meta, StoryObj } from '@storybook/react-vite';
import RHFTextArea from '../components/RHFTextArea';

const meta = {
  title: 'Form/Text/TextArea',
  component: RHFTextArea,
  tags: ['autodocs'],
} satisfies Meta<typeof RHFTextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextArea: Story = {
  args: {
    name: "textAreaField",
    label: "textAreaField",
    defaultValue: "Lorem, ipsum dolor sit amet consectetur adipisicing elit."
  },
};
