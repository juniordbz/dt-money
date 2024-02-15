import * as Dialog from '@radix-ui/react-dialog'
import { ActionButton, Content, Overlay } from './styles'
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../../../../../../contexts/TransactionsContext'
import { ModalContext } from '../../../../../../contexts/ModalContext'

interface UpdateModalProps {
  idProp: number
}

export function UpdateModal({ idProp }: UpdateModalProps) {
  const closeModalUpdateTransaction = useContextSelector(
    ModalContext,
    (context) => {
      return context.closeModalUpdateTransaction
    },
  )
  const openModalNewTransaction = useContextSelector(
    ModalContext,
    (context) => {
      return context.openModalNewTransaction
    },
  )
  const handleControlUpdateTransacion = useContextSelector(
    ModalContext,
    (context) => {
      return context.handleControlUpdateTransacion
    },
  )
  const deleteTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.deleteTransactions
    },
  )
  const getID = useContextSelector(TransactionsContext, (context) => {
    return context.getID
  })

  function handleDeleteTransactions(id: number) {
    deleteTransactions(id)
    closeModalUpdateTransaction()
  }
  function handleEditTransactions(id: number) {
    closeModalUpdateTransaction()
    openModalNewTransaction()
    handleControlUpdateTransacion(true)
    console.log(id)
    getID(id)
  }

  return (
    <Dialog.Portal>
      <Overlay onClick={closeModalUpdateTransaction} />
      <Content>
        <Dialog.Title>O que você deseja fazer com essa transação?</Dialog.Title>
        <div>
          <ActionButton onClick={() => handleEditTransactions(idProp)}>
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
