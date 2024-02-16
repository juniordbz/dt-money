import styled from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog'

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
`
export const Content = styled(Dialog.Content)`
  max-width: 32rem;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background: ${({ theme }) => theme['gray-800']};

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }

  @media screen and (max-width: 991px) {
    top: auto;
    bottom: 0;
    left: 0;
    min-width: 100%;
    transform: translate(0, 0);

    > div {
      flex-direction: column;
      gap: 0;
    }
  }
`
export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  background: transparent;
  border: 0;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0;
  cursor: pointer;
  color: ${({ theme }) => theme['gray-500']};
`

export const ActionButton = styled.button`
  height: 58px;
  width: 100%;
  border: 0;
  background: ${({ theme }) => theme['green-500']};
  color: ${({ theme }) => theme.white};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  margin-top: 1.5rem;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background: ${({ theme }) => theme['green-700']};
    transition: background-color 0.2s;
  }

  @media screen and (max-width: 991px) {
    width: 100%;
  }
`
