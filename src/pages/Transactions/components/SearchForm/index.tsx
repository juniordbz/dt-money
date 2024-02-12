import { MagnifyingGlass } from 'phosphor-react'
import { SearchFormContainer } from './styles'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionsContext } from '../../../../contexts/TransactionsContext'
import { useContext, useEffect, useState } from 'react'

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {
  const { fetchTransactions } = useContext(TransactionsContext)
  const [loadedDefaultTransactions, setLoadedDefaultTransactions] =
    useState(false)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchTransactions(data: SearchFormInputs) {
    setLoadedDefaultTransactions(false)
    await fetchTransactions(data.query)
  }

  const { query } = watch()

  useEffect(() => {
    if (query?.length <= 0 && !loadedDefaultTransactions) {
      const getDefaultTransactions = async () => {
        await fetchTransactions()
      }
      getDefaultTransactions().then(() => setLoadedDefaultTransactions(true))
    }
  }, [fetchTransactions, query, loadedDefaultTransactions])

  return (
    <SearchFormContainer
      className="layoutContainer"
      onSubmit={handleSubmit(handleSearchTransactions)}
    >
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}
