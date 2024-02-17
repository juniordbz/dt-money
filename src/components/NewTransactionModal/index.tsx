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
import { useEffect } from 'react'

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
    } else {
      await updateTransactions(dataUpdate.id, {
        ...data,
      })
    }
    reset()

    if (closeModal) {
      closeModal()
    }
  }

  console.log(dataUpdate)

  useEffect(() => {
    if (variant === 'Atualizar') {
      setValue('description', dataUpdate?.description)
      setValue('price', dataUpdate?.price)
      setValue('category', dataUpdate?.category)
      setValue('type', dataUpdate?.type)
    }
  }, [setValue, dataUpdate, variant])

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
