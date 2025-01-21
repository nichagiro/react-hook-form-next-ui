import type { Meta, StoryObj } from '@storybook/react';
import Modal from '../components/Modal';
import React, { useState } from 'react';
import { Button } from '@heroui/react';

const meta = {
  title: 'Containers/Modal',
  component: Modal,
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const modal: Story = {
  args: {
    display: false,
    children: <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>,
    cancelButton: { children: "Cerrar", color: "danger" },
    acceptButton: { "children": "Aceptar", onPress: () => alert(true), color: "primary" },
    title: "Modal Component",
    onClose: () => null,
  },
  render: (args) => <ModalWithState {...args} />
};

const ModalWithState: React.FC<typeof modal.args> = (args) => {
  const [display, setDisplay] = useState(args.display);
  return (
    <>
      <Button onPress={() => setDisplay(true)}>Open Modal</Button>
      <Modal {...args} display={display} onClose={() => setDisplay(false)} />
    </>
  );
};
