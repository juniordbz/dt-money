import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { SearchForm } from './components/SearchForm'
import { TableTransactions } from './components/TableTransactions'
export function Transactions() {
  return (
    <div>
      <Header />
      <Summary />
      <SearchForm />
      <TableTransactions />
    </div>
  )
}
