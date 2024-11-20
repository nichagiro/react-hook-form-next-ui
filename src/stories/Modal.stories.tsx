import type { Meta, StoryObj } from '@storybook/react';
import Modal from '../components/Modal';
import React from 'react';

const meta = {
  title: 'Containers/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    cancelButton: { description: "Custom cancel button - ButtonProps" },
    acceptButton: { description: "Custom Confirm button - ButtonProps" },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const modal: Story = {
  args: {
    display: false,
    children: <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>,
    cancelButton: { name: "Cerrar", color: "danger" },
    acceptButton: { "name": "Aceptar", onClick: () => alert(true), color: "primary" },
    title: "Modal Component",
    onCancel: () => null,
  },
};
