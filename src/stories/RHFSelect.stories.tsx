import type { Meta, StoryObj } from '@storybook/react';
import RHFSelect from '../components/RHFSelect';
import { fakerUsers } from '../static/faker';

const meta = {
  title: 'Form/Select/Select',
  component: RHFSelect,
  tags: ['autodocs'],
  argTypes: {
    rules: { description: "React Hook Form Props" },
    onSelectionChange: { description: "Return function with rows param" }
  }
} satisfies Meta<typeof RHFSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const data = fakerUsers()

export const Select: Story = {
  args: {
    data,
    name: "SelectField",
    label: "SelectField",
    onSelectionChange: value => console.log(value)
  },
};
