"use client";

import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";
import Link from "next/link";

import { Pages } from "@/@types";

import { FaTelegramPlane } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaPhoneVolume } from "react-icons/fa6";

const Contacts: React.FC = () => {
  return (
    <section className="section">
      <div className="container">
        <Breadcrumbs className="mb-4">
          <BreadcrumbItem href="/">Головна</BreadcrumbItem>
          <BreadcrumbItem href={`${Pages.DOSTAVKA_OPLATA}`}>
            Контакти
          </BreadcrumbItem>
        </Breadcrumbs>
        <h1 className="section-title mb-2">Контакти</h1>
        <Link
          href="tel:+380931265157"
          className="flex items-center gap-2 text-sm md:text-sm xl:text-lg mb-2"
        >
          <FaPhoneVolume className="size-4  xl:size-5" />
          +38 (093) 126 51 57
        </Link>
        <Link
          href="https://t.me/konopliua"
          className="flex items-center gap-2 text-sm md:text-sm xl:text-lg mb-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTelegramPlane className="size-4  xl:size-5" />
          Telegram
        </Link>
        <Link
          href="https://www.instagram.com/konoplia_ua"
          className="flex items-center gap-2 text-sm md:text-sm xl:text-lg mb-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          <RiInstagramFill className="size-4  xl:size-5" />
          Instagram
        </Link>

        <div className="text-sm md:text-sm xl:text-lg">
          <div className="mb-2">
            {" "}
            Ми працюємо для вас з понеділка по п’ятницю з 11:00 до 19:00.
          </div>
          <div>
            У вихідні дні наш офіс відпочиває, але Ви можете оформлювати
            замовлення онлайн у будь-який час — ми обов’язково опрацюємо їх у
            перший робочий день.
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
