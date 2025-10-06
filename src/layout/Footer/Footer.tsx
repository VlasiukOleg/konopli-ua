"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { FaTelegramPlane } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaPhoneVolume } from "react-icons/fa6";

import { Pages } from "@/@types";

import Logo from "@images/logo.png";

import categoriesData from "@/data/categoryList.json";

const Footer: React.FC = () => {
  const pathName = usePathname();

  return (
    <footer className="pb-5 pt-9 bg-sectionBg border-accent border-t-1 xl:bg-bgWhite">
      <div className="container">
        <Link
          href={Pages.MAIN}
          className="text-accent flex items-center justify-center gap-1 mb-4"
        >
          <div className="font-semibold font-montserrat text-lg flex md:text-2xl xl:text-3xl">
            KONOPLI
            <Image
              src={Logo}
              alt="logo"
              className="size-6 md:size-7 xl:size-8"
            />
            UA
          </div>
        </Link>
        <div className="flex justify-between mb-4 md:mb-6 xl:justify-around">
          <div>
            <p className="text-accent font-bold mb-2 md:text-lg">Покупцям</p>
            <ul className="text-black text-xs font-semibold flex flex-col gap-2 md:text-sm">
              <li>
                <Link href={`/${Pages.ABOUT}`} className="text-xs md:text-sm">
                  Про нас
                </Link>
              </li>
              <li>
                <Link
                  href={`/${Pages.CONTACTS}`}
                  className="text-xs md:text-sm"
                >
                  Контакти
                </Link>
              </li>
              <li>Доставка та оплата</li>
            </ul>
          </div>
          <div>
            <p className="text-accent font-bold mb-2 md:text-lg">Каталог</p>
            <ul className="text-black font-semibold text-xs flex flex-col gap-2 md:text-sm md:grid md:grid-cols-2">
              {categoriesData.list.map((category) => (
                <Link
                  href={`/${Pages.CATALOG}/${category.href}`}
                  key={category.id}
                >
                  {category.title}
                </Link>
              ))}
            </ul>
          </div>
        </div>
        <div className="text-center text-black mb-4 text-xs md:text-sm">
          Графік роботи інтернет магазину 10.00 до 19.00 Субота та неділя
          вихідні дні.
        </div>
        <div className="h-[1px] bg-black mb-4 md:h-[1px]"></div>
        <div className="flex items-center justify-center gap-2 mb-4">
          <Button
            isIconOnly
            aria-label="Like"
            variant="solid"
            radius="full"
            className="bg-black md:size-12"
          >
            <FaTelegramPlane className="size-4 text-white md:size-6" />
          </Button>

          <Button
            isIconOnly
            aria-label="Like"
            variant="solid"
            radius="full"
            className="bg-black md:size-12"
          >
            <RiInstagramFill className="size-4 text-white md:size-6" />
          </Button>
          <Button
            isIconOnly
            aria-label="Like"
            variant="solid"
            radius="full"
            className="bg-black md:size-12"
          >
            <FaPhoneVolume className="size-4 text-white md:size-6" />
          </Button>
        </div>
        <div className="text-center text-xs mb-1 md:text-sm">
          © 2025 Konopli-Ua. Всі права захищено.
        </div>
        <div className="text-center">
          {pathName === `/${Pages.POLICY}` ? (
            <Link
              href={`/${Pages.MAIN}`}
              className="text-accent cursor-pointer text-xs md:text-sm"
            >
              Головна
            </Link>
          ) : (
            <Link
              href={`/${Pages.POLICY}`}
              className="text-accent cursor-pointer text-xs md:text-sm"
            >
              Політика конфіденційності
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
