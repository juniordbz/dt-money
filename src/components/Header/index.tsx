import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'
import logo from '../../assets/logo.svg'
import * as Dialog from '@radix-ui/react-dialog'
import { NewTransactionModal } from '../NewTransactionModal'
import { useState } from 'react'

export function Header() {
  const [open, setOpen] = useState(false)

  function closeModal() {
    setOpen(false)
  }
  return (
    <HeaderContainer>
      <HeaderContent className="layoutContainer">
        <img src={logo} alt="" />
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>
          <NewTransactionModal
            closeModal={closeModal}
            title="Nova Transação"
            variant="Cadastrar"
          />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
