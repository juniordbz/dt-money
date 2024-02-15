import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'
import logo from '../../assets/logo.svg'
import * as Dialog from '@radix-ui/react-dialog'
import { NewTransactionModal } from './components/NewTransactionModal'
import { ModalContext } from '../../contexts/ModalContext'
import { useContextSelector } from 'use-context-selector'

export function Header() {
  const openNewTransaction = useContextSelector(ModalContext, (context) => {
    return context.openNewTransaction
  })

  const handleControlUpdateTransacion = useContextSelector(
    ModalContext,
    (context) => {
      return context.handleControlUpdateTransacion
    },
  )
  const openModalNewTransaction = useContextSelector(
    ModalContext,
    (context) => {
      return context.openModalNewTransaction
    },
  )

  return (
    <HeaderContainer>
      <HeaderContent className="layoutContainer">
        <img src={logo} alt="" />
        <Dialog.Root
          open={openNewTransaction}
          onOpenChange={openModalNewTransaction}
        >
          <Dialog.Trigger asChild>
            <NewTransactionButton
              onClick={() => handleControlUpdateTransacion(false)}
            >
              Nova transação
            </NewTransactionButton>
          </Dialog.Trigger>
          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
