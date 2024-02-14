import styled from 'styled-components'

export const TableTransactionsContainer = styled.main`
  margin: 1.5rem auto 0;
`

export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;

  td {
    padding: 1.25rem 2rem;
    background: ${({ theme }) => theme['gray-700']};

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
`
interface PriceHighlightProps {
  variant: 'income' | 'outcome'
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${({ theme, variant }) =>
    variant === 'income' ? theme['green-300'] : theme['red-300']};
`

// cards para o mobile

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border-radius: 6px;

  width: 100%;
  background: ${({ theme }) => theme['gray-700']};
  padding: 1.5rem;
  margin-top: 1rem;

  span {
    font-size: 1.25rem;
    font-weight: bold;
  }

  > div:first-child {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    gap: 0.5rem;
    color: ${({ theme }) => theme['gray-500']};
  }
`
