import type { Meta, StoryObj } from '@storybook/react-vite';
import RHFSelect from '../components/RHFSelect';
import { fakerUsers } from '../static/faker';

const meta = {
  title: 'Form/Select/Select',
  component: RHFSelect,
  tags: ['autodocs'],
} satisfies Meta<typeof RHFSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const data = fakerUsers().map(item => ({ key: item.key, children: item.label }))

export const Select: Story = {
  args: {
    data,
    name: "SelectField",
    label: "SelectField",
    selectionMode: "multiple",
    onSelectionChange: value => console.log(value),
  },
};
