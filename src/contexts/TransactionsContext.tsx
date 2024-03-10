import { ReactNode, useState, useCallback, useEffect } from 'react'
import { api } from '../lib/axios'
import { createContext } from 'use-context-selector'

export interface Transactions {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface TransactionsProviderProps {
  children: ReactNode
}

export interface CreateNewTransactionProps {
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
}

interface TransactionsContextType {
  transactions: Transactions[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransactions: (data: CreateNewTransactionProps) => Promise<void>
  deleteTransactions: (id: number) => Promise<void>
  quantityTransactions: number
  updateTransactions: (
    id: number | undefined,
    data: CreateNewTransactionProps,
  ) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transactions[]>([])

  const quantityTransactions = transactions.length

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })
    setTransactions(response.data)
  }, [])

  const createTransactions = useCallback(
    async (data: CreateNewTransactionProps) => {
      try {
        // Realizar a requisição POST para criar a transação
        const response = await api.post('/transactions', {
          ...data,
          createdAt: new Date().toISOString(), // Ajustar a data para ser uma string ISO
        })

        // Atualizar o estado local com a nova transação retornada pela API
        setTransactions((prevTransactions) => [
          response.data,
          ...prevTransactions,
        ])
        fetchTransactions()
      } catch (error) {
        console.error('Erro ao criar transação:', error)
        // Em caso de erro, não atualizar o estado local
        fetchTransactions()
      }
    },
    [fetchTransactions],
  )

  const updateTransactions = useCallback(
    async (id: number | undefined, dataUpdate: CreateNewTransactionProps) => {
      // Atualizando localmente de forma otimista
      setTransactions((prevTransactions) =>
        prevTransactions.map((transaction) =>
          transaction.id === id
            ? { ...transaction, ...dataUpdate }
            : transaction,
        ),
      )

      try {
        await api.patch(`/transactions/${id}`, dataUpdate)
        fetchTransactions()
      } catch (error) {
        console.error('Erro ao atualizar transação:', error)
        // Em caso de erro, reverter o estado local
        fetchTransactions() // Recarregando os dados da API para refletir o estado atual
      }
    },
    [fetchTransactions],
  )

  const deleteTransactions = useCallback(
    async (id: number) => {
      // Removendo localmente de forma otimista
      setTransactions((prevTransactions) =>
        prevTransactions.filter((transaction) => transaction.id !== id),
      )

      try {
        await api.delete(`/transactions/${id}`)
        fetchTransactions()
      } catch (error) {
        console.error('Erro ao excluir transação:', error)
        // Em caso de erro, recarregar os dados da API para refletir o estado atual
        fetchTransactions()
      }
    },
    [fetchTransactions],
  )

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransactions,
        quantityTransactions,
        deleteTransactions,
        updateTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
