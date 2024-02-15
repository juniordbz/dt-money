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
import { TransactionsContext } from '../../../../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'
import { ModalContext } from '../../../../contexts/ModalContext'

const newTransitionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

export type newTransactionFormInput = z.infer<typeof newTransitionFormSchema>

export function NewTransactionModal() {
  const closeModalTransaction = useContextSelector(ModalContext, (context) => {
    return context.closeModalNewTransaction
  })

  const controlUpdateTransaction = useContextSelector(
    ModalContext,
    (context) => {
      return context.controlUpdateTransaction
    },
  )

  const handleControlUpdateTransacion = useContextSelector(
    ModalContext,
    (context) => {
      return context.handleControlUpdateTransacion
    },
  )

  const createTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.createTransactions
    },
  )

  const UpdateTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.UpdateTransactions
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
  })

  async function handleCreateNewTransaction(data: newTransactionFormInput) {
    await createTransactions({
      ...data,
    })

    reset()
    closeModalTransaction()
  }

  return (
    <Dialog.Portal>
      <Overlay onClick={closeModalTransaction} />
      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>
        <CloseButton onClick={closeModalTransaction}>
          <X size={24} />
        </CloseButton>
        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
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

          <button
            type="submit"
            disabled={isSubmitting}
            onClick={() => handleControlUpdateTransacion(false)}
          >
            {controlUpdateTransaction === false ? 'Cadastrar' : 'Atualizar'}
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
