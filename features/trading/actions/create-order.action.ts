'use server'

import { createOrder } from '../services/exchange.service'
import type { OrderRequest } from '@/types/trading'

export async function createOrderAction(request: OrderRequest) {
  try {
    const order = await createOrder(request)
    return {
      success: true,
      data: order,
    }
  } catch (error) {
    console.error('[createOrderAction] Error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create order',
    }
  }
}
