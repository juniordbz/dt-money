import { TableTransactionsContainer } from './styles'
import { TransactionItem } from './components/TrasactionItem'

export function TableTransactions() {
  return (
    <TableTransactionsContainer className="layoutContainer">
      <TransactionItem />
    </TableTransactionsContainer>
  )
}
