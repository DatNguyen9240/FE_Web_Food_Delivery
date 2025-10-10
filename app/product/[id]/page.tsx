"use client";
import ProductModal from "@/app/@modal/product/pop-up/[id]/page";
import ProductInforTab from "@/components/ProductInforTab";
import ProductsTitle from "@/components/ProductsTitle";

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <>
      <ProductModal isModal={false} params={Promise.resolve(params)} />
      <div className="mt-20">
        <ProductInforTab />
      </div>
      <section className="max-w-[1300px] w-full mx-auto mt-12 overflow-hidden">
        <ProductsTitle
          title="Món ăn liên quan"
          description="Không thể bỏ lỡ những món ăn hấp dẫn này!"
        />
  
      </section>
    </>
  );
}
