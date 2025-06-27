"use client";

import Image from "next/image";

import { Button } from "@heroui/react";
import { FaArrowRight } from "react-icons/fa";

import categoriesData from "@/data/categoryList.json";

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

const colorMap: Record<string, string> = {
  blue: "bg-blue-300",
  red: "bg-red-300",
  yellow: "bg-yellow-300",
  grey: "bg-grey-300",
};

const CategoryCard: React.FC<IHeroProps> = ({ category }) => {
  const bgColorClass = colorMap[category.bgColor] || "grey-300";
  return (
    <>
      <div
        className={`relative p-4 text-lg font-semibold rounded-lg min-h-[120px] overflow-hidden mb-2 ${bgColorClass}`}
      >
        <div className="relative z-10">
          <p className="mb-3">{category.title}</p>
          <Button
            size="sm"
            radius="sm"
            className="bg-accent font-semibold text-white"
          >
            {categoriesData.button}
            <FaArrowRight />
          </Button>
        </div>

        <Image
          src={category.src}
          alt={category.alt}
          width={category.width}
          height={category.height}
          className="absolute right-0 bottom-[-20px] opacity-90"
          priority={false}
        />
      </div>
    </>
  );
};

export default CategoryCard;
