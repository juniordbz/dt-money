import React from 'react'

interface PriceInputProps {
  onValueChange: (value: number) => void
  name: string
  value: number
}

export function PriceInput({ name, onValueChange, value }: PriceInputProps) {
  const formatValueToCurrency = (value: number): string => {
    if (!value) return ''

    const stringValue = value.toFixed(2)
    const [integerPart, decimalPart] = stringValue.split('.')

    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

    return `R$ ${formattedInteger},${decimalPart}`
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.replace(/\D/g, '')

    const floatValue = parseFloat(input) / 100

    onValueChange(floatValue)
  }

  return (
    <input
      name={name}
      value={formatValueToCurrency(value)}
      onChange={handleChange}
      placeholder="Preço"
      required
    />
  )
}
