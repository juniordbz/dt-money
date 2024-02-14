import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  margin: 4rem auto 0;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      color: ${({ theme }) => theme['gray-500']};
    }

    p {
      color: ${({ theme }) => theme['gray-300']};
    }
  }
`

export const SearchFormContainer = styled.form`
  display: flex;
  gap: 1rem;

  input {
    flex: 1;
    border-radius: 6px;
    border: 0;
    background: ${({ theme }) => theme['gray-900']};
    color: ${({ theme }) => theme['gray-300']};
    padding: 1rem;

    &::placeholder {
      color: ${({ theme }) => theme['gray-500']};
    }
  }

  button {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    border: 0;
    padding: 1rem;
    background: transparent;
    border: 1px solid ${({ theme }) => theme['green-300']};
    color: ${({ theme }) => theme['green-300']};
    font-weight: bold;
    border-radius: 6px;
    cursor: pointer;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      background: ${({ theme }) => theme['green-500']};
      border: 1px solid ${({ theme }) => theme['green-500']};
      color: ${({ theme }) => theme.white};
      transition:
        background-color 0.2s,
        color 0.2s,
        border-color 0.2s;
    }

    @media screen and (max-width: 991px) {
      p {
        display: none;
      }
    }
  }
`
