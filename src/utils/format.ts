// Date formatting utilities
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  
  const day = d.getDate().toString().padStart(2, '0')
  const month = (d.getMonth() + 1).toString().padStart(2, '0')
  const year = d.getFullYear()
  const hours = d.getHours().toString().padStart(2, '0')
  const minutes = d.getMinutes().toString().padStart(2, '0')
  
  return `${day}.${month}.${year} ${hours}:${minutes}`
}

// Currency formatting utilities
export function formatCurrency(amount: number, currency = '₸'): string {
  const formatted = new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
  
  return `${formatted} ${currency}`
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// Format item count
export function formatItemCount(count: number): string {
  const lastDigit = count % 10
  const lastTwoDigits = count % 100
  
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `${count} товаров`
  }
  
  if (lastDigit === 1) {
    return `${count} товар`
  }
  
  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${count} товара`
  }
  
  return `${count} товаров`
}

export function formatPrice(price: number): string {
  return formatCurrency(price)
} 