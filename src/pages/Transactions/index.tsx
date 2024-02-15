import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { ModalProvider } from '../../contexts/ModalContext'
import { SearchForm } from './components/SearchForm'
import { TableTransactions } from './components/TableTransactions'
export function Transactions() {
  return (
    <div>
      <ModalProvider>
        <Header />
        <Summary />
        <SearchForm />
        <TableTransactions />
      </ModalProvider>
    </div>
  )
}
