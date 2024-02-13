import { ReactNode, useEffect, useState, useCallback } from 'react'
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
}

export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transactions[]>([])

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

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
