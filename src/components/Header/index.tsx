import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'
import logo from '../../assets/logo.svg'
import * as Daylog from '@radix-ui/react-dialog'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent className="layoutContainer">
        <img src={logo} alt="" />
        <Daylog.Root>
          <Daylog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Daylog.Trigger>
          <Daylog.Portal>
            <Daylog.Overlay />
            <Daylog.Content>
              <Daylog.Title>Nova Transação</Daylog.Title>
              <Daylog.Close />
            </Daylog.Content>
          </Daylog.Portal>
        </Daylog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
