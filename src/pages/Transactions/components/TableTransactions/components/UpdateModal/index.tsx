import * as Dialog from '@radix-ui/react-dialog'
import { ActionButton, Content, Overlay } from './styles'
import { NewTransactionModal } from '../../../../../../components/NewTransactionModal'
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../../../../../../contexts/TransactionsContext'

interface UpdateModalProps {
  id: number
}

export function UpdateModal({ id }: UpdateModalProps) {
  const deleteTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.deleteTransactions
    },
  )

  function handleDeleteById(id: number) {
    console.log(id)
    deleteTransactions(id)
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>O que você deseja fazer com essa transação?</Dialog.Title>
        <Dialog.Root>
          <div>
            <Dialog.Trigger asChild>
              <ActionButton>Editar</ActionButton>
            </Dialog.Trigger>
            <ActionButton onClick={() => handleDeleteById(id)}>
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
