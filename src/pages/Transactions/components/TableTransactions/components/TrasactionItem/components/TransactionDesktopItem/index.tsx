import { PriceHighlight, TransactionsTable } from '../../../../styles'
import {
  dateFormatter,
  priceFormatter,
} from '../../../../../../../../utils/formatter'
import { Transactions } from '../../../../../../../../contexts/TransactionsContext'

interface TransactionDesktopItemProps {
  transaction: Transactions
}

export function TransactionDesktopItem({
  transaction,
}: TransactionDesktopItemProps) {
  return (
    <TransactionsTable>
      <tbody>
        <tr>
          <td width="50%">{transaction.description}</td>
          <td width="20%">
            <PriceHighlight variant={transaction.type}>
              {transaction.type === 'outcome' && '- '}
              {priceFormatter.format(transaction.price)}
            </PriceHighlight>
          </td>
          <td width="20%">{transaction.category}</td>
          <td width="10%">
            {dateFormatter.format(new Date(transaction.createdAt))}
          </td>
        </tr>
      </tbody>
    </TransactionsTable>
  )
}
