import {
  Modal as ModalComponent, ModalContent, ModalHeader,
  ModalBody, ModalFooter, Button, useDisclosure, ModalProps,
  ButtonProps
} from "@nextui-org/react";

import React, { ReactNode, useEffect, useState } from "react";

interface AcceptButton extends Omit<ButtonProps, "onClick"> {
  onClick: () => void | Promise<void>;
}

interface RHFNextUiModalProps extends ModalProps {
  display: boolean;
  onCancel: () => void;
  title?: string;
  cancelButton?: ButtonProps;
  acceptButton?: AcceptButton;
  children: ReactNode
}

export default function Modal({
  display = false, children, title, onCancel,
  cancelButton, acceptButton, ...props

}: RHFNextUiModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (display) {
      onOpen()
    }
  }, [display, onOpen])


  const handleChange = () => {
    onOpenChange();
    onCancel();
  }

  const onAccept = async () => {
    if (acceptButton?.onClick) {
      setLoading(true);
      await acceptButton.onClick();
      setLoading(false);
    }
  }

  return (
    <ModalComponent isOpen={isOpen} onOpenChange={handleChange} {...props}>
      <ModalContent>
        {onClose => (
          <>
            {
              title &&
              <ModalHeader className="flex flex-col gap-1">
                {title}
              </ModalHeader>
            }
            <ModalBody>
              {children}
            </ModalBody>
            <ModalFooter>
              {
                cancelButton &&
                <Button
                  {...cancelButton}
                  isDisabled={loading}
                  onPress={() => { onClose(); onCancel() }}
                >
                  {cancelButton?.name ?? "Cerrar"}
                </Button>
              }
              {
                acceptButton &&
                <Button
                  {...acceptButton}
                  isLoading={loading}
                  onPress={() => onAccept()}
                >
                  {acceptButton.name ?? "Aceptar"}
                </Button>
              }
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </ModalComponent>
  );
}
