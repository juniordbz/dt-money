import { useState, ReactNode } from 'react'
import { createContext } from 'use-context-selector'

interface ModalContextType {
  openNewTransaction: boolean
  openModalNewTransaction: () => void
  closeModalNewTransaction: () => void
  openUpdateTranction: boolean
  openModalUpdateTransaction: () => void
  closeModalUpdateTransaction: () => void
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const ModalContext = createContext({} as ModalContextType)

export function ModalProvider({ children }: TransactionsProviderProps) {
  const [openNewTransaction, setOpenNewTransaction] = useState(false)
  const [openUpdateTranction, setOpenUpdateTransaction] = useState(false)
  const openModalNewTransaction = () => setOpenNewTransaction(true)
  const closeModalNewTransaction = () => setOpenNewTransaction(false)
  const openModalUpdateTransaction = () => setOpenUpdateTransaction(true)
  const closeModalUpdateTransaction = () => setOpenUpdateTransaction(false)

  return (
    <ModalContext.Provider
      value={{
        openNewTransaction,
        openModalNewTransaction,
        closeModalNewTransaction,
        openUpdateTranction,
        openModalUpdateTransaction,
        closeModalUpdateTransaction,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}
