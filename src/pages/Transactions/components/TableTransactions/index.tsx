import {
  PriceHighlight,
  TableTransactionsContainer,
  TransactionsTable,
} from './styles'

export function TableTransactions() {
  return (
    <TableTransactionsContainer className="layoutContainer">
      <TransactionsTable>
        <tbody>
          <tr>
            <td width="50%"> Desenvolvimento do site</td>
            <td>
              <PriceHighlight variant="income">R$ 12.000,00</PriceHighlight>
            </td>
            <td>Venda</td>
            <td>13/04/2022</td>
          </tr>
          <tr>
            <td width="50%"> Hamburguer</td>
            <td>
              <PriceHighlight variant="outcome"> -R$57,00</PriceHighlight>
            </td>
            <td>Alimentação</td>
            <td>10/04/2022</td>
          </tr>
        </tbody>
      </TransactionsTable>
    </TableTransactionsContainer>
  )
}
