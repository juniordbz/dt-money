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

export function TableTransactions() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const [open, setOpen] = useState(false)
  const [id, setId] = useState(0)

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

  function getId(id: number) {
    setId(id)
  }

  function closeModal() {
    setOpen(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
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
              {transactions.map((transaction) => {
                return (
                  <Dialog.Trigger
                    asChild
                    key={transaction.id}
                    onClick={() => getId(transaction.id)}
                  >
                    <tr>
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
                  </Dialog.Trigger>
                )
              })}
            </tbody>
          </TransactionsTable>
        )}
      </TableTransactionsContainer>
      <UpdateModal id={id} closeModal={closeModal} />
    </Dialog.Root>
  )
}
