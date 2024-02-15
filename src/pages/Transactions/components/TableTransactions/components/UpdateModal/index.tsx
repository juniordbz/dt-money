import * as Dialog from '@radix-ui/react-dialog'
import { ActionButton, Content, Overlay } from './styles'

export function UpdateModal() {
  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>O que você deseja fazer com essa transação?</Dialog.Title>
        <div>
          <ActionButton>Editar</ActionButton>
          <ActionButton>Deletar</ActionButton>
        </div>
      </Content>
    </Dialog.Portal>
  )
}
