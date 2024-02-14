import { ReactNode, useState, useCallback, useEffect } from 'react'
import { api } from '../lib/axios'
import { createContext } from 'use-context-selector'

interface Transactions {
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

interface CreateNewTransactionProps {
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
  UpdateTransactions: (data: CreateNewTransactionProps) => Promise<void>
  quantityTransactions: number
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
      const response = await api.post('transactions', {
        ...data,
        createdAt: new Date(),
      })

      setTransactions((state) => [response.data, ...state])
    },
    [],
  )

  const UpdateTransactions = useCallback(
    async (data: CreateNewTransactionProps) => {
      const response = await api.put('transactions', {
        ...data,
      })

      setTransactions((state) => [response.data, ...state])
    },
    [],
  )

  const deleteTransactions = useCallback(
    async (id: number) => {
      await api.delete(`transactions/${id}`)

      setTransactions(
        transactions.filter((transaction) => transaction.id !== id),
      )
    },
    [transactions],
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
        UpdateTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
