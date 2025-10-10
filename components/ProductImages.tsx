import Image from "next/image";

export default function ProductImages({ imageUrl }: { imageUrl: string }) {
  return (
    <div>
      <div className="relative max-w-[600px] h-[420px] mx-2 w-full rounded-xl overflow-hidden mb-3">
        <Image
          src={imageUrl}
          alt="Product"
          width={600}
          height={420}
          className="object-cover w-full h-full"
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
      {/* Thumbnails removed — show single main image only */}
    </div>
  );
}
