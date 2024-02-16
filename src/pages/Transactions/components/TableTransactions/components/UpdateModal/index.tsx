import * as Dialog from '@radix-ui/react-dialog'
import { ActionButton, CloseButton, Content, Overlay } from './styles'
import { X } from 'phosphor-react'

interface UpdateModalProps {
  onEdit: () => void
  onDelete: () => void
}

export function UpdateModal({ onEdit, onDelete }: UpdateModalProps) {
  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <CloseButton>
          <X size={24} />
        </CloseButton>

        <Dialog.Title>O que você deseja fazer com essa transação?</Dialog.Title>

        <Dialog.Root>
          <div>
            <Dialog.Trigger asChild>
              <ActionButton onClick={onEdit}>Editar</ActionButton>
            </Dialog.Trigger>

            <ActionButton onClick={onDelete}>Deletar</ActionButton>
          </div>
        </Dialog.Root>
      </Content>
    </Dialog.Portal>
  )
}
