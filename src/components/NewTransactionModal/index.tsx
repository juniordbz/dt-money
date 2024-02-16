import * as Dialog from '@radix-ui/react-dialog'
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from './styles'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import * as z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  CreateNewTransactionProps,
  TransactionsContext,
} from '../../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'
import { useEffect, useState } from 'react'

interface NewTransactionsModalProps {
  variant: 'Cadastrar' | 'Atualizar'
  title: string
  closeModal?: () => void
  id?: number
}

const newTransitionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

export type newTransactionFormInput = z.infer<typeof newTransitionFormSchema>

export function NewTransactionModal({
  variant,
  title,
  closeModal,
  id,
}: NewTransactionsModalProps) {
  const [updateTransaction, setUpdateTransaction] =
    useState<CreateNewTransactionProps>({
      description: '',
      price: 0,
      category: '',
      type: 'income',
    })

  const createTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.createTransactions
    },
  )

  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })
  const updateTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.updateTransactions
    },
  )

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = useForm<newTransactionFormInput>({
    resolver: zodResolver(newTransitionFormSchema),
  })

  async function handleTransaction(data: newTransactionFormInput) {
    if (variant === 'Cadastrar') {
      await createTransactions({
        ...data,
      })
    } else if (id !== undefined) {
      await updateTransactions(id, {
        ...data,
      })
    }

    reset()

    if (closeModal) {
      closeModal()
    }
  }

  function UpdateTransactionFind() {
    const newUpdateTransaction = transactions.find(
      (transaction) => transaction.id === id,
    )

    if (newUpdateTransaction) {
      setUpdateTransaction(newUpdateTransaction)
    }
  }

  useEffect(() => {
    if (variant === 'Atualizar') {
      UpdateTransactionFind()
      setValue('description', updateTransaction?.description)
      setValue('price', updateTransaction?.price)
      setValue('category', updateTransaction?.category)
      setValue('type', updateTransaction?.type)
    }
  }, [setValue, updateTransaction, variant])

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>{title}</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <form onSubmit={handleSubmit(handleTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />

          <input
            type="number"
            placeholder="Preço"
            required
            {...register('price', { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register('category')}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton variant="income" value="income">
                    <ArrowCircleUp />
                    Entrada
                  </TransactionTypeButton>
                  <TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            {variant}
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
