import Image from "next/image";
import { ProductBadge } from "@/app/components/ProductCard";

export default function ProductImages() {
  return (
    <div>
      <div className="relative max-w-[600px] h-[420px] mx-2 w-full rounded-xl overflow-hidden mb-3">
        <Image
          src="/sell_off/01.jpg"
          alt="Product"
          width={600}
          height={420}
          className="object-cover w-full h-full"
          style={{ objectFit: "cover" }}
          priority
        />
        <ProductBadge percent="8%" />
      </div>
      <div className="flex gap-2 ml-2 w-full max-w-[600px]">
        {[1, 2, 3, 4].map((i) => (
          <Image
            key={i}
            src={`/sell_off/01.jpg`}
            alt={`Thumb ${i}`}
            width={140}
            height={80}
            className="object-cover rounded-lg border flex-1 h-[80px] min-w-0"
            style={{ objectFit: "cover" }}
          />
        ))}
      </div>
    </div>
  );
}
