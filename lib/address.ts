import api from "./axios";

export interface AddressItem {
  addressId: string;
  addressLabel: string;
  street: string;
  ward?: string;
  district?: string;
  city?: string;
  country?: string;
  isDefault?: boolean;
  createdAt?: string;
}

export async function fetchAddresses(): Promise<AddressItem[]> {
  const res = await api.get<AddressItem[]>("Address");
  return res.data;
}

export async function createAddress(payload: Partial<AddressItem>) {
  const res = await api.post<AddressItem>("Address", payload);
  return res.data;
}

export async function updateAddress(addressId: string, payload: Partial<AddressItem>) {
  const res = await api.put<AddressItem>(`Address/${addressId}`, payload);
  return res.data;
}

export async function deleteAddress(addressId: string) {
  const res = await api.delete<void>(`Address/${addressId}`);
  return res.data;
}

const addressClient = { fetchAddresses, createAddress, updateAddress, deleteAddress };

export default addressClient;
