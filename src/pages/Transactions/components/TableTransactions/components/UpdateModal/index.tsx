import * as Dialog from '@radix-ui/react-dialog'
import { ActionButton, Content, Overlay } from './styles'
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../../../../../../contexts/TransactionsContext'
import { ModalContext } from '../../../../../../contexts/ModalContext'

interface UpdateModalProps {
  idProp: number
}
interface UpdateTransactionsProps {
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
}

export function UpdateModal({ idProp }: UpdateModalProps) {
  const closeModalUpdateTransaction = useContextSelector(
    ModalContext,
    (context) => {
      return context.closeModalUpdateTransaction
    },
  )
  const deleteTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.deleteTransactions
    },
  )
  const UpdateTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.UpdateTransactions
    },
  )

  function handleDeleteTransactions(id: number) {
    deleteTransactions(id)
    closeModalUpdateTransaction()
  }
  function handleEditTransactions(data: UpdateTransactionsProps) {
    UpdateTransactions(...data)
    closeModalUpdateTransaction()
  }

  return (
    <Dialog.Portal>
      <Overlay onClick={closeModalUpdateTransaction} />
      <Content>
        <Dialog.Title>O que você deseja fazer com essa transação?</Dialog.Title>
        <div>
          <ActionButton onClick={() => handleEditTransactions(data)}>
            Editar
          </ActionButton>
          <ActionButton onClick={() => handleDeleteTransactions(idProp)}>
            Deletar
          </ActionButton>
        </div>
      </Content>
    </Dialog.Portal>
  )
}
