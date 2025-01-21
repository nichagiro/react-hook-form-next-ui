import {
  Modal as ModalComponent, ModalContent, ModalHeader,
  ModalBody, ModalFooter, Button, ModalProps, ButtonProps
} from "@heroui/react"

import React, { ReactNode } from "react";
interface RHFNextUiModalProps extends Omit<ModalProps, "onOpenChange" | "isOpen"> {
  display: boolean
  children: ReactNode
  title?: string
  onClose: () => void
  cancelButton?: ButtonProps
  acceptButton?: ButtonProps
}

export default function Modal({
  display = false,
  onClose,
  children,
  title = "",
  cancelButton,
  acceptButton,
  ...props

}: RHFNextUiModalProps) {

  return (
    <ModalComponent isOpen={display} onOpenChange={onClose}  {...props}>
      <ModalContent>

        <ModalHeader className="flex flex-col gap-1">
          {title}
        </ModalHeader>

        <ModalBody>
          {children}
        </ModalBody>

        <ModalFooter>
          {cancelButton && <Button {...cancelButton} onPress={onClose} />}
          {acceptButton && <Button {...acceptButton} />}
        </ModalFooter>

      </ModalContent>
    </ModalComponent>
  );
}
