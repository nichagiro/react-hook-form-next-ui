import type { Meta, StoryObj } from '@storybook/react-vite';
import RHFRadioGroup from '../components/RHFRadioGroup';

const meta = {
  title: 'Form/RadioGroup',
  component: RHFRadioGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof RHFRadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RadioGroup: Story = {
  args: {
    name: "radioField",
    data: [{
      value: "1",
      children: "Radio1",
      color: "danger"
    }, {
      value: "2",
      children: "Radio2"
    }, {
      value: "3",
      children: "Radio2",
      isDisabled: true
    }],
  },
};
