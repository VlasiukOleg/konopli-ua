"use client";

import { Button, Link } from "@heroui/react";

import { GiVanillaFlower } from "react-icons/gi";
import { FaTelegramPlane } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaPhoneVolume } from "react-icons/fa6";

import styles from "@/layout/Footer/Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={`pb-5 pt-9 ${styles.bgFooter}`}>
      <div className="container">
        <div className="text-accent flex items-center justify-center gap-1 mb-4">
          <GiVanillaFlower className="size-6" />
          <div className="font-semibold text-xl">KONOPLI-UA</div>
        </div>
        <div className="flex justify-between mb-4 font-semibold">
          <div>
            <p className="text-accent mb-2">Покупцям</p>
            <ul className="text-black text-xs flex flex-col gap-2">
              <li>Про нас</li>
              <li>Контакти</li>
              <li>FAQs</li>
            </ul>
          </div>
          <div>
            <p className="text-accent mb-2">Каталог</p>
            <ul className="text-black text-xs flex flex-col gap-2">
              <li>Постіль конопляна</li>
              <li>Подушки</li>
              <li>Ковдри та пледи</li>
            </ul>
          </div>
        </div>
        <div className="text-center text-black mb-4 text-xs">
          Графік роботи інтернет магазину 10.00 до 19.00 Субота та неділя
          вихідні дні.
        </div>
        <div className="h-[1px] bg-black mb-4"></div>
        <div className="flex items-center justify-center gap-2 mb-4">
          <Button
            isIconOnly
            aria-label="Like"
            variant="solid"
            radius="full"
            className="bg-black  transition-colors duration-200"
          >
            <FaTelegramPlane className="size-4 text-white" />
          </Button>

          <Button
            isIconOnly
            aria-label="Like"
            variant="solid"
            radius="full"
            className="bg-black"
          >
            <RiInstagramFill className="size-4 text-white" />
          </Button>
          <Button
            isIconOnly
            aria-label="Like"
            variant="solid"
            radius="full"
            className="bg-black"
          >
            <FaPhoneVolume className="size-4 text-white" />
          </Button>
        </div>
        <div className="text-center text-xs mb-1">
          © 2025 Konopli-Ua. Всі права захищено.
        </div>
        <div className="text-center">
          <Link as={Link} className="text-accent cursor-pointer text-xs">
            Політика конфіденційності
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
