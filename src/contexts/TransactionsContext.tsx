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
    id: number,
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
      const response = await api.post('/transactions', {
        ...data,
        createdAt: new Date(),
      })

      setTransactions((state) => [response.data, ...state])
    },
    [],
  )

  const updateTransactions = useCallback(
    async (id: number, dataUpdate: CreateNewTransactionProps) => {
      await api.patch(`/transactions/${id}`, dataUpdate)
      fetchTransactions()
    },

    [fetchTransactions],
  )

  const deleteTransactions = useCallback(
    async (id: number) => {
      await api.delete(`/transactions/${id}`)
      fetchTransactions()
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
