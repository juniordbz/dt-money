import * as Dialog from '@radix-ui/react-dialog'
import { ActionButton, CloseButton, Content, Overlay } from './styles'
import { NewTransactionModal } from '../../../../../../components/NewTransactionModal'
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../../../../../../contexts/TransactionsContext'
import { X } from 'phosphor-react'

interface UpdateModalProps {
  id: number
  closeModal: () => void
}

export function UpdateModal({ id, closeModal }: UpdateModalProps) {
  const deleteTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.deleteTransactions
    },
  )

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
              <ActionButton onClick={() => closeModal()}>Editar</ActionButton>
            </Dialog.Trigger>

            <ActionButton
              onClick={() => {
                deleteTransactions(id)
                closeModal()
              }}
            >
              Deletar
            </ActionButton>
          </div>
          <NewTransactionModal
            title="Atualizar Transação"
            variant="Atualizar"
          />
        </Dialog.Root>
      </Content>
    </Dialog.Portal>
  )
}
