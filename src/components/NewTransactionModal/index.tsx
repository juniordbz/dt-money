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
  Transactions,
  TransactionsContext,
} from '../../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'
import { PriceInput } from './components/PriceInput'

const newTransitionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

export type newTransactionFormInput = z.infer<typeof newTransitionFormSchema>

interface NewTransactionsModalProps {
  variant: 'Cadastrar' | 'Atualizar'
  title: string
  closeModal?: () => void
  dataUpdate?: Transactions
}

export function NewTransactionModal({
  variant,
  title,
  closeModal,
  dataUpdate,
}: NewTransactionsModalProps) {
  const createTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.createTransactions
    },
  )

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
    formState: { isSubmitting },
  } = useForm<newTransactionFormInput>({
    resolver: zodResolver(newTransitionFormSchema),
    values: {
      description: dataUpdate?.description ?? '',
      price: dataUpdate?.price ?? 0,
      category: dataUpdate?.category ?? '',
      type: dataUpdate?.type ?? 'income',
    },
  })

  async function handleTransaction(data: newTransactionFormInput) {
    if (variant === 'Cadastrar') {
      await createTransactions({ ...data })
    } else {
      await updateTransactions(dataUpdate?.id, { ...data })
    }

    reset()

    if (closeModal) {
      closeModal()
    }
  }

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
          <Controller
            name="price"
            control={control}
            render={({ field: { name, onChange, value } }) => {
              return (
                <PriceInput
                  name={name}
                  onValueChange={onChange}
                  value={value}
                />
              )
            }}
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
