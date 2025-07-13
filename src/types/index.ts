export * from './product'
export * from './category'
export * from './sale'

// Navigation Types
export interface NavigationItem {
  id: string
  icon: string
  label: string
  active: boolean
  route?: string
}

// API Response Types
export interface ApiResponse<T> {
  data: T
  status: number
  message?: string
} 