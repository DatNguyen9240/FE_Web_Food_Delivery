"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store/store";
import { useEffect, useMemo, useState } from "react";
import { fetchAddresses, AddressItem } from "@/lib/address";
import { toast } from "react-toastify";
import { createOrder } from "@/lib/orders";
import { paymentCheckoutRequest } from "@/redux/slice/Payment/PaymentSlice";
import type { PaymentCheckoutResponse } from "@/redux/slice/Payment/PaymentSlice";
import MoneyVND from "@/components/MoneyVND";
import Image from "next/image";

export default function OrderPageClient() {
  const params = useSearchParams();
  const router = useRouter();
  const merchantId = params.get("merchantId");
  const carts = useSelector((s: RootState) => s.cart.carts || []);
  const cart = useMemo(() => carts.find((c) => (c.merchant?.merchantId || c.merchantId) === merchantId), [carts, merchantId]);
  const dispatch = useDispatch();
  // extend RootState locally to access Payment slice without using `any`
  type RootWithPayment = RootState & { Payment?: { result?: PaymentCheckoutResponse } };
  const paymentResult = useSelector((s: RootWithPayment) => s.Payment?.result);

  const [addresses, setAddresses] = useState<AddressItem[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  // payment method: default from query param 'payment' or 'cash'
  const initialPayment = params.get("payment") === "transfer" ? "transfer" : "cash";
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'transfer'>(initialPayment as 'cash' | 'transfer');

  // Local loose type for cart items (backend shapes vary between endpoints)
  type LooseCartItem = {
    cartItemId?: string;
    menuItemId?: string;
    menuItemName?: string;
    productName?: string;
    name?: string;
    quantity?: number;
    priceAtAdd?: number;
    price?: number;
    options?: Array<{
      optionName?: string;
      selectedValues?: Array<{ valueName?: string }>
    }>;
    note?: string;
  };

  // normalize items to LooseCartItem[] for rendering/calculation
  const items: LooseCartItem[] = Array.isArray(cart?.items) ? (cart!.items as LooseCartItem[]) : [];

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchAddresses();
        setAddresses(res || []);
      } catch (err) {
        console.error("Failed to load addresses", err);
      }
    })();
  }, []);

  if (!merchantId) return <div className="p-8">Chưa chọn quán</div>;
  if (!cart) return <div className="p-8">Không tìm thấy giỏ hàng cho quán này</div>;

  const subtotal = (cart.subTotal != null)
    ? cart.subTotal
    : items.reduce((s, it) => s + ((it.priceAtAdd ?? it.price ?? 0) * (it.quantity ?? 1)), 0);

  const handlePlaceOrder = async () => {
    if (!cart.cartId) return;
    if (!selectedAddress) {
      toast.warning("Vui lòng chọn địa chỉ giao hàng");
      return;
    }
    setLoading(true);
    try {
      if (paymentMethod === 'transfer') {
        // use payment checkout flow which will create order + return payment info
        dispatch(paymentCheckoutRequest({ merchantId: merchantId as string, payload: cart }));
        toast.info('Đang tạo yêu cầu thanh toán...');
        // don't navigate away — wait for payment result to appear in state
      } else {
        await createOrder({ cartId: cart.cartId, deliveryAddressId: selectedAddress, notes, paymentMethod });
        toast.success("Đơn hàng đã tạo thành công");
        router.push("/");
      }
    } catch (err) {
      console.error(err);
      toast.error("Tạo đơn thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <h2 className="text-xl font-semibold mb-4">Xác nhận đơn hàng</h2>

      <div className="bg-white rounded-lg border p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-sm text-gray-600">Quán</div>
            <div className="font-medium">{cart.merchant?.merchantName || cart.merchantId || 'Quán'}</div>
            <div className="text-xs text-gray-500">Mã giỏ hàng: {cart.cartId}</div>
          </div>
          <div className="text-sm text-gray-600">{Array.isArray(cart.items) ? `${cart.items.length} món` : ''}</div>
        </div>

        <div className="border-t pt-3">
          {items.length > 0 && items.map((it: LooseCartItem) => (
            <div key={it.cartItemId || it.menuItemId || JSON.stringify(it)} className="flex justify-between py-2">
              <div className="max-w-[60%]">
                <div className="font-medium">{it.menuItemName || it.productName || it.name}</div>
                <div className="text-sm text-gray-500">x{it.quantity}</div>
                {it.options && Array.isArray(it.options) && (
                  <div className="text-xs text-gray-600 mt-1">
                    {it.options.map((opt, idx: number) => (
                      <div key={idx}><span className="font-medium">{opt.optionName}:</span> {Array.isArray(opt.selectedValues) ? opt.selectedValues.map((v) => v.valueName).join(', ') : ''}</div>
                    ))}
                  </div>
                )}
                {it.note && <div className="text-xs text-gray-600 mt-1">Ghi chú: {it.note}</div>}
              </div>
              <div className="font-medium"><MoneyVND value={(it.priceAtAdd ?? it.price ?? 0) * (it.quantity ?? 1)} /></div>
            </div>
          ))}
        </div>

        <div className="mt-3 space-y-2">
          <div className="flex justify-between items-center text-sm text-gray-700">
            <div>Tạm tính</div>
            <div><MoneyVND value={cart.subTotal ?? subtotal} /></div>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-700">
            <div>Phí vận chuyển</div>
            <div><MoneyVND value={cart.deliveryFee ?? 0} /></div>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-700">
            <div>Phí dịch vụ</div>
            <div><MoneyVND value={cart.serviceFee ?? 0} /></div>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-700">
            <div>Giảm giá</div>
            <div><MoneyVND value={cart.discount ?? 0} /></div>
          </div>
          <div className="flex justify-between items-center text-lg font-semibold mt-2">
            <div>Tổng cộng</div>
            <div><MoneyVND value={(cart.subTotal ?? subtotal) + (cart.deliveryFee ?? 0) + (cart.serviceFee ?? 0) - (cart.discount ?? 0)} /></div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-4 mb-4">
        <h3 className="font-medium mb-2">Địa chỉ giao hàng</h3>
        {addresses.length === 0 ? (
          <div className="text-sm text-gray-500">
            <div>Bạn chưa có địa chỉ. Vui lòng thêm trên trang hồ sơ.</div>
            <div className="mt-3">
              <button
                onClick={() => router.push('/profile')}
                className="px-4 py-2 bg-pink-600 text-white rounded-lg mt-2 cursor-pointer"
              >
                Thêm địa chỉ
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-2">
            {addresses.map((a) => (
              <label key={a.addressId} className={`p-3 rounded-lg border ${selectedAddress === a.addressId ? 'border-sky-600 bg-sky-50' : 'border-gray-100'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{a.addressLabel}</div>
                    <div className="text-sm text-gray-600">{a.street}</div>
                  </div>
                  <input type="radio" name="deliveryAddress" checked={selectedAddress === a.addressId} onChange={() => setSelectedAddress(a.addressId)} />
                </div>
              </label>
            ))}
          </div>
        )}
        <div className="mt-3">
          <label className="text-sm text-gray-500">Ghi chú</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full mt-1 p-2 border rounded-lg" rows={3} />
        </div>
        <div className="mt-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">Phương thức thanh toán</label>
          <div className="flex gap-4 items-center">
            <label className="inline-flex items-center">
              <input type="radio" name="payment" value="cash" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} className="mr-2" />
              <span className="font-medium">Tiền mặt</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="payment" value="transfer" checked={paymentMethod === 'transfer'} onChange={() => setPaymentMethod('transfer')} className="mr-2" />
              <span className="font-medium">Chuyển khoản</span>
            </label>
          </div>
          {paymentMethod === 'transfer' && (
            <div className="text-xs text-gray-500 mt-2">Bạn sẽ nhận hướng dẫn chuyển khoản sau khi tạo đơn.</div>
          )}
        </div>
        {paymentResult && (
          <div className="bg-white rounded-lg border p-4 mb-4">
            <h3 className="font-medium mb-2">Chi tiết thanh toán</h3>
            <div className="text-sm text-gray-700 mb-2">Nhà cung cấp: {paymentResult.provider} — Mã tham chiếu: {paymentResult.providerReference}</div>
            <div className="flex items-center gap-4">
              {paymentResult.qrImage && (
                <Image
                  src={paymentResult.qrImage}
                  alt="QR"
                  width={144}
                  height={144}
                  className="object-cover rounded"
                />
              )}
              <div>
                <div className="text-sm text-gray-600">Số tiền</div>
                <div className="font-semibold text-lg"><MoneyVND value={paymentResult.amount} /></div>
                <div className="mt-2">
                  <a href={paymentResult.paymentUrl} target="_blank" rel="noreferrer" className="px-3 py-2 bg-pink-600 text-white rounded-md inline-block">Mở trang thanh toán</a>
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-3">Mã đơn: {paymentResult.orderRef}</div>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button onClick={handlePlaceOrder} disabled={loading} className="px-4 py-2 rounded-lg bg-pink-600 text-white">{loading ? 'Đang xử lý...' : 'Xác nhận & Tạo đơn'}</button>
      </div>
    </div>
  );
}
