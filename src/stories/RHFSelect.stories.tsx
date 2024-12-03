import type { Meta, StoryObj } from '@storybook/react';
import RHFSelect from '../components/RHFSelect';
import { fakerUsers } from '../static/faker';
import React from 'react';

const meta = {
  title: 'Form/Select/Select',
  component: RHFSelect,
  tags: ['autodocs'],
  argTypes: {
    rules: { description: "React Hook Form Props" },
    onSelectionChange: { description: "Return function with rows param" },
    allOptions: { description: "SelectItemProps - NextUI" },
    allSelectText: { description: "textValue when all options is selecteds" }
  }
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
    allOptions: {
      children: <p className="text-danger">all options</p>,
      textValue: "all Selected"
    },
    allSelectText: "All Users"
  },
};
