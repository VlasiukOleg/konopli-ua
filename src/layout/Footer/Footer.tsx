"use client";

import { Button, Link } from "@heroui/react";
import { usePathname } from "next/navigation";

import { FaTelegramPlane } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaPhoneVolume } from "react-icons/fa6";

import { Pages } from "@/@types";

import categoriesData from "@/data/categoryList.json";

const Footer: React.FC = () => {
  const pathName = usePathname();

  const isPolicyPage = pathName === `/${Pages.POLICY}`;

  return (
    <footer className="pb-5 pt-9 bg-sectionBg border-accent border-t-1 xl:bg-bgWhite">
      <div className="container">
        <div className="flex justify-between mb-4 md:mb-6 xl:justify-around">
          <div>
            <p className="text-accent font-bold mb-2 md:text-lg">Покупцям</p>
            <ul className="font-semibold flex flex-col gap-1">
              <li>
                <Link
                  href={`/${Pages.ABOUT}`}
                  className="text-black text-xs md:text-sm"
                >
                  Про нас
                </Link>
              </li>
              <li>
                <Link
                  href={`/${Pages.CONTACTS}`}
                  className="text-black text-xs md:text-sm"
                >
                  Контакти
                </Link>
              </li>
              <li>
                <Link
                  href={`/${Pages.DOSTAVKA_OPLATA}`}
                  className="text-black text-xs md:text-sm"
                >
                  Доставка і оплата
                </Link>
              </li>
              <li>
                <Link
                  href={`/${Pages.RETURNS}`}
                  className="text-black text-xs md:text-sm"
                >
                  Обмін та повернення
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-accent font-bold mb-2 md:text-lg">Каталог</p>
            <ul className="font-semibold flex flex-col gap-2 md:grid md:grid-cols-2">
              {categoriesData.list.map((category) => (
                <Link
                  href={`/${Pages.CATALOG}/${category.href}`}
                  key={category.id}
                  className="text-black text-xs md:text-sm"
                >
                  {category.title}
                </Link>
              ))}
            </ul>
          </div>
        </div>
        <div className="text-center text-black mb-4 text-xs md:text-sm">
          Графік роботи інтернет магазину 10.00 до 19.00. Субота та неділя
          вихідні дні (але Ви можете оформлювати замовлення онлайн у будь-який
          час)
        </div>
        <div className="h-[1px] bg-black mb-4 md:h-[1px]"></div>
        <div className="flex items-center justify-center gap-2 mb-4">
          <Button
            as={Link}
            href="https://t.me/konopliua"
            target="_blank"
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
            as={Link}
            href="https://www.instagram.com/konopli_ua/"
            aria-label="Like"
            variant="solid"
            radius="full"
            className="bg-black md:size-12"
          >
            <RiInstagramFill className="size-4 text-white md:size-6" />
          </Button>
          <Button
            as={Link}
            href="tel:+380931265157"
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
          {isPolicyPage ? (
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
