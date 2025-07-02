import type { Meta, StoryObj } from '@storybook/react-vite';
import RHFCheckboxGroup from '../components/RHFCheckboxGroup';

const meta = {
  title: 'Form/Check/CheckboxGroup',
  component: RHFCheckboxGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof RHFCheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Checkbox: Story = {
  args: {
    name: "checkField",
    data: [{
      value: "1",
      children: "Check1",
      color: "danger",
    }, {
      value: "2",
      children: "Check2"
    }, {
      value: "3",
      children: "Check3",
      isDisabled: true
    }],
  },
};
