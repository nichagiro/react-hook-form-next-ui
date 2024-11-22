import type { Meta, StoryObj } from '@storybook/react';
import RHFAutocomplete from '../components/RHFAutocomplete';
import { fakerUsers } from '../static/faker';

const meta = {
  title: 'Form/Select/Autocomplete',
  component: RHFAutocomplete,
  tags: ['autodocs'],
  argTypes: {
    rules: { description: "React Hook Form Props" },
    onSelectionChange: { description: "Return function with rows param" }
  }
} satisfies Meta<typeof RHFAutocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

const data = fakerUsers().map(item => ({ key: item.key, children: item.label }))

export const Autocomplete: Story = {
  args: {
    data,
    name: "AutoCompleteField",
    label: "AutoCompleteField",
    onSelectionChange: value => console.log(value)
  },
};
