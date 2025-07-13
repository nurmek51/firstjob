import api from './api'
import type { Sale, SaleCreate } from '@/types'

class SalesService {
  async getSales(limit: number = 10, offset: number = 0): Promise<Sale[]> {
    const response = await api.get<Sale[]>('/sales/', {
      params: { limit, offset },
    })
    return response.data
  }

  async getSale(saleId: number): Promise<Sale> {
    const response = await api.get<Sale>(`/sales/${saleId}`)
    return response.data
  }

  async createSale(sale: SaleCreate): Promise<Sale> {
    const response = await api.post<Sale>('/sales/', sale)
    return response.data
  }
}

export const salesService = new SalesService() 