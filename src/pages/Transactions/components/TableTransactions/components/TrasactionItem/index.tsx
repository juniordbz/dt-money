import * as Dialog from '@radix-ui/react-dialog'
import { useState, useEffect } from 'react'
import { useContextSelector } from 'use-context-selector'
import {
  Transactions,
  TransactionsContext,
} from '../../../../../../contexts/TransactionsContext'
import { TransactionDesktopItem } from './components/TransactionDesktopItem'
import { TransactionMobileItem } from './components/TransactionMobileItem'
import { UpdateModal } from '../UpdateModal'
import { NewTransactionModal } from '../../../../../../components/NewTransactionModal'

export function TransactionItem() {
  const [open, setOpen] = useState(false)
  const [openModalNewTransaction, setOpenModalNewTransaction] = useState(false)
  const [updateTransaction, setUpdateTransaction] = useState<Transactions>({
    id: 0,
    description: '',
    type: 'income',
    price: 0,
    category: '',
    createdAt: '',
  })

  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  const deleteTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.deleteTransactions
    },
  )

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
    <>
      {transactions.map((transaction) => {
        return (
          <>
            <Dialog.Root open={open} onOpenChange={setOpen}>
              <Dialog.Trigger
                asChild
                onClick={() => setUpdateTransaction(transaction)}
              >
                {screenWidth <= 768 ? (
                  <div>
                    <TransactionMobileItem transaction={transaction} />
                  </div>
                ) : (
                  <div>
                    <TransactionDesktopItem transaction={transaction} />
                  </div>
                )}
              </Dialog.Trigger>
              <UpdateModal
                onDelete={() => {
                  deleteTransactions(updateTransaction.id)
                  setOpen(false)
                }}
                onEdit={() => {
                  setOpenModalNewTransaction(true)
                  setOpen(false)
                }}
              />
            </Dialog.Root>

            <Dialog.Root
              open={openModalNewTransaction}
              onOpenChange={setOpenModalNewTransaction}
            >
              <NewTransactionModal
                title="Atualizar Transação"
                variant="Atualizar"
                dataUpdate={updateTransaction}
                closeModal={() => setOpenModalNewTransaction(false)}
              />
            </Dialog.Root>
          </>
        )
      })}
    </>
  )
}
