import api from "./axios";

export interface CreateOrderPayload {
  cartId: string;
  deliveryAddressId: string;
  notes?: string;
}

export async function createOrder(payload: CreateOrderPayload) {
  const res = await api.post("Orders", payload);
  return res.data;
}

export default { createOrder };
