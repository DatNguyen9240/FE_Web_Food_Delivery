import api from "./axios";

export interface CreateOrderPayload {
  cartId: string;
  deliveryAddressId: string;
  notes?: string;
  paymentMethod?: 'cash' | 'transfer';
}

export async function createOrder(payload: CreateOrderPayload) {
  const res = await api.post("Orders", payload);
  return res.data;
}

const ordersClient = { createOrder };

export default ordersClient;
