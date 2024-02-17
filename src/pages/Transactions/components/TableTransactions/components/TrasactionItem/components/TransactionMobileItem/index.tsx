import { TagSimple, CalendarBlank } from 'phosphor-react'
import {
  priceFormatter,
  dateFormatter,
} from '../../../../../../../../utils/formatter'
import { CardContainer, PriceHighlight, CardFooter } from '../../../../styles'
import { Transactions } from '../../../../../../../../contexts/TransactionsContext'

interface TransactionMobileItemProps {
  transaction: Transactions
}
export function TransactionMobileItem({
  transaction,
}: TransactionMobileItemProps) {
  return (
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
  )
}
