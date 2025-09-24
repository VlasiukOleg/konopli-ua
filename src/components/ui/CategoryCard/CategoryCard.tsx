"use client";

import Image from "next/image";
import Link from "next/link";

import { Pages } from "@/@types";

export interface IHeroProps {
  category: {
    id: number;
    title: string;
    width: number;
    height: number;
    src: string;
    alt: string;
    bgColor: string;
    href: string;
  };
}

const CategoryCard: React.FC<IHeroProps> = ({ category }) => {
  return (
    <>
      <Link
        href={`${Pages.CATALOG}/${category.href}`}
        className="group block h-[200px] w-full relative overflow-hidden rounded-lg"
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

        <div className="absolute bottom-0 left-0 right-0 p-3 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="font-semibold text-white text-xs md:text-sm text-center xl:text-base">
            {category.title}
          </div>
        </div>
      </Link>
    </>
  );
};

export default CategoryCard;
