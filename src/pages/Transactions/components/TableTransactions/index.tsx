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
import * as Dialog from '@radix-ui/react-dialog'
import { UpdateModal } from './components/UpdateModal'
import { TransactionDesktopItem } from './components/TransactionDesktopItem'

export function TableTransactions() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  function getId(id: number) {}

  return (
    <TableTransactionsContainer className="layoutContainer">
      {screenWidth <= 768 ? (
        <div>
          {transactions.map((transaction) => {
            return (
              <Dialog.Trigger
                asChild
                key={transaction.id}
                onClick={() => getId(transaction.id)}
              >
                <CardContainer>
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
              </Dialog.Trigger>
            )
          })}
        </div>
      ) : (
        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => (
              <TransactionDesktopItem
                key={transaction.id}
                transaction={transaction}
                onClickItem={() => getId(transaction.id)}
              />
            ))}
          </tbody>
        </TransactionsTable>
      )}
    </TableTransactionsContainer>
  )
}
