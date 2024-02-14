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
import { ModalContext } from '../../../../contexts/ModalContext'

interface UpdateTransactionProps {
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
}

export function TableTransactions() {
  const [selectedTransactionId, setSelectedTransactionId] = useState(0)
  const [updateTransactionId, setUpdateTransactionId] =
    useState<UpdateTransactionProps>({})
  const openUpdateTranction = useContextSelector(ModalContext, (context) => {
    return context.openUpdateTranction
  })
  const openModalUpdateTransaction = useContextSelector(
    ModalContext,
    (context) => {
      return context.openModalUpdateTransaction
    },
  )

  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  function handleTransactionClick(id: number) {
    setSelectedTransactionId(id)
  }

  function handleUpdateTransactionClick(data: UpdateTransactionProps) {
    setUpdateTransactionId()
  }

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
      <Dialog.Root
        open={openUpdateTranction}
        onOpenChange={openModalUpdateTransaction}
      >
        {screenWidth <= 768 ? (
          <div>
            {transactions.map((transaction) => {
              return (
                <Dialog.Trigger
                  asChild
                  key={transaction.id}
                  onClick={() => handleTransactionClick(transaction.id)}
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
                    onClick={() => handleTransactionClick(transaction.id)}
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
        <UpdateModal idProp={selectedTransactionId} updateData={transactions} />
      </Dialog.Root>
    </TableTransactionsContainer>
  )
}
