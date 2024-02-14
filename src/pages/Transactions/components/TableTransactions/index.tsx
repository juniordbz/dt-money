import {
  CardContainer,
  CardFooter,
  PriceHighlight,
  TableTransactionsContainer,
  TransactionsTable,
} from './styles'
import { TransactionsContext } from '../../../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../../../utils/formatter'
import { useContextSelector } from 'use-context-selector'
import { useState, useEffect } from 'react'
import { CalendarBlank, TagSimple } from 'phosphor-react'

export function TableTransactions() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <TableTransactionsContainer className="layoutContainer">
      {screenWidth <= 768 ? (
        <div>
          {transactions.map((transaction) => {
            return (
              <CardContainer key={transaction.id}>
                <div>
                  <p>{transaction.description}</p>
                  <PriceHighlight variant={transaction.type}>
                    {transaction.type === 'outcome' && '- '}
                    {priceFormatter.format(transaction.price)}
                  </PriceHighlight>
                </div>
                <CardFooter>
                  <div>
                    <TagSimple size={16} />
                    {transaction.category}
                  </div>
                  <div>
                    <CalendarBlank size={16} />
                    {dateFormatter.format(new Date(transaction.createdAt))}
                  </div>
                </CardFooter>
              </CardContainer>
            )
          })}
        </div>
      ) : (
        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {transaction.type === 'outcome' && '- '}
                      {priceFormatter.format(transaction.price)}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>
                    {dateFormatter.format(new Date(transaction.createdAt))}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </TransactionsTable>
      )}
    </TableTransactionsContainer>
  )
}
