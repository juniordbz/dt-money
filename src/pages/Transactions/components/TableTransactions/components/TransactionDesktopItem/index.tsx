import * as Dialog from '@radix-ui/react-dialog'
import { PriceHighlight } from '../../styles'
import {
  dateFormatter,
  priceFormatter,
} from '../../../../../../utils/formatter'
import {
  Transactions,
  TransactionsContext,
} from '../../../../../../contexts/TransactionsContext'
import { UpdateModal } from '../UpdateModal'
import { useState } from 'react'
import { NewTransactionModal } from '../../../../../../components/NewTransactionModal'
import { useContextSelector } from 'use-context-selector'

interface TransactionDesktopItemProps {
  transaction: Transactions
  onClickItem: () => void
}

export function TransactionDesktopItem({
  transaction,
  onClickItem,
}: TransactionDesktopItemProps) {
  const deleteTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.deleteTransactions
    },
  )

  const [open, setOpen] = useState(false)
  const [openModalNewTransaction, setOpenModalNewTransaction] = useState(false)

  return (
    <>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild key={transaction.id} onClick={onClickItem}>
          <tr>
            <td width="50%">{transaction.description}</td>
            <td>
              <PriceHighlight variant={transaction.type}>
                {transaction.type === 'outcome' && '- '}
                {priceFormatter.format(transaction.price)}
              </PriceHighlight>
            </td>
            <td>{transaction.category}</td>
            <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
          </tr>
        </Dialog.Trigger>
        <UpdateModal
          onDelete={() => {
            deleteTransactions(transaction.id)
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
          id={transaction.id}
          closeModal={() => setOpenModalNewTransaction(false)}
        />
      </Dialog.Root>
    </>
  )
}
