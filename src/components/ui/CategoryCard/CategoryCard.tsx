"use client";

import Image from "next/image";
import Link from "next/link";

export interface IHeroProps {
  category: {
    id: number;
    title: string;
    width: number;
    height: number;
    src: string;
    alt: string;
    bgColor: string;
  };
}

const CategoryCard: React.FC<IHeroProps> = ({ category }) => {
  return (
    <>
      <Link
        href=""
        className="group block h-[240px] w-full relative overflow-hidden"
      >
        <div className="absolute inset-0 transition-all duration-700 group-hover:scale-110">
          <Image
            src={category.src}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt={category.alt}
            className="object-cover"
          />
        </div>
        <div className="absolute bottom-4 left-4 bg-black font-semibold text-white text-xs p-2">
          {category.title}
        </div>{" "}
      </Link>
    </>
  );
};

export default CategoryCard;
