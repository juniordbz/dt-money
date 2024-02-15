import { useState, ReactNode } from 'react'
import { createContext } from 'use-context-selector'

interface ModalContextType {
  openNewTransaction: boolean
  openModalNewTransaction: () => void
  closeModalNewTransaction: () => void
  openUpdateTranction: boolean
  openModalUpdateTransaction: () => void
  closeModalUpdateTransaction: () => void
  handleControlUpdateTransacion: (value: boolean) => void
  controlUpdateTransaction: boolean
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const ModalContext = createContext({} as ModalContextType)

export function ModalProvider({ children }: TransactionsProviderProps) {
  const [controlUpdateTransaction, setControlUpdateTransaction] =
    useState(false)

  const handleControlUpdateTransacion = (value: boolean) =>
    setControlUpdateTransaction(value)

  // controle de abertura dos modais
  const [openNewTransaction, setOpenNewTransaction] = useState(false)
  const [openUpdateTranction, setOpenUpdateTransaction] = useState(false)
  const openModalNewTransaction = () => setOpenNewTransaction(true)
  const closeModalNewTransaction = () => setOpenNewTransaction(false)
  const openModalUpdateTransaction = () => setOpenUpdateTransaction(true)
  const closeModalUpdateTransaction = () => {
    setControlUpdateTransaction(false)
    setOpenUpdateTransaction(false)
  }

  return (
    <ModalContext.Provider
      value={{
        openNewTransaction,
        openModalNewTransaction,
        closeModalNewTransaction,
        openUpdateTranction,
        openModalUpdateTransaction,
        closeModalUpdateTransaction,
        handleControlUpdateTransacion,
        controlUpdateTransaction,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}
