import Image from "next/image";
import { motion } from "framer-motion";

export default function FoodCircle({
  foodItems,
  currentIndex,
  onItemClick,
  radius = 200,
}: {
  foodItems: { id: number; image: string }[];
  currentIndex: number;
  onItemClick: (idx: number) => void;
  radius?: number;
}) {
  const getTargetRotation = (index: number) => {
    const itemAngle = 360 / foodItems.length;
    const currentAngle = index * itemAngle;
    const targetAngle = 200;
    return targetAngle - currentAngle;
  };

  return (
    <div className="relative w-[600px] h-[600px]">
      <div className="absolute inset-0">
        {foodItems.map((item, index) => {
          const rotationOffset = getTargetRotation(currentIndex);
          const angle =
            (index * (360 / foodItems.length) + rotationOffset) *
            (Math.PI / 180);
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const isActive = index === currentIndex;

          return (
            <motion.div
              key={item.id}
              className="absolute top-1/2 left-1/2"
              style={{
                width: 150,
                height: 150,
              }}
              animate={{
                x: x - 50,
                y: y,
                scale: isActive ? 1.4 : 1,
                zIndex: isActive ? 10 : 1,
                rotate: rotationOffset,
              }}
              transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 45,
                damping: 25,
              }}
              whileHover={{ scale: isActive ? 1.4 : 1.1 }}
              onClick={() => onItemClick(index)}
            >
              <div className="w-full h-full p-2 bg-white rounded-full shadow-lg">
                <Image
                  src={item.image}
                  alt=""
                  width={150}
                  height={150}
                  className={`w-full h-full rounded-full object-cover cursor-pointer border-4 ${
                    isActive ? "border-red-400" : "border-orange-100"
                  }`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
