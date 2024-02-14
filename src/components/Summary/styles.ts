import styled, { css } from 'styled-components'

export const SumarryContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin: -5rem auto 0;

  @media screen and (max-width: 991px) {
    overflow-x: auto;
    scrollbar-width: none;
  }
`

interface SumarryCardProps {
  variant?: 'green'
}

export const SummaryCard = styled.div<SumarryCardProps>`
  background: ${({ theme }) => theme['gray-600']};
  border-radius: 6px;
  padding: 2rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${({ theme }) => theme['gray-300']};
  }

  strong {
    display: block;
    margin-top: 1rem;
    font-size: 2rem;
  }

  ${({ variant, theme }) =>
    variant === 'green' &&
    css`
      background-color: ${theme['green-700']};
    `}
`
