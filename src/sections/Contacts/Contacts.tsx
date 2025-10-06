"use client";

import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";
import Link from "next/link";

import { Pages } from "@/@types";

import { FaTelegramPlane } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaPhoneVolume } from "react-icons/fa6";

const About: React.FC = () => {
  return (
    <section className="section">
      <div className="container">
        <Breadcrumbs className="mb-4">
          <BreadcrumbItem href="/">Головна</BreadcrumbItem>
          <BreadcrumbItem href={`${Pages.ABOUT}`}>Контакти</BreadcrumbItem>
        </Breadcrumbs>
        <h1 className="section-title mb-2">Контакти</h1>
        <Link
          href="tel:+380632790437"
          className="flex items-center gap-2 text-sm md:text-sm xl:text-lg mb-2"
        >
          <FaPhoneVolume className="size-4  xl:size-5" />
          +38 (096) 93 444 30
        </Link>
        <Link
          href="https://t.me/vl_oleg_frontend"
          className="flex items-center gap-2 text-sm md:text-sm xl:text-lg mb-2"
        >
          <FaTelegramPlane className="size-4  xl:size-5" />
          Telegram
        </Link>
        <Link
          href="https://www.instagram.com/konoplia_ua"
          className="flex items-center gap-2 text-sm md:text-sm xl:text-lg mb-4"
        >
          <RiInstagramFill className="size-4  xl:size-5" />
          Instagram
        </Link>

        <p className="text-sm md:text-sm xl:text-lg">
          Графік роботи інтернет магазину 11.00 до 19.00 Субота та неділя
          вихідні дні.
        </p>
      </div>
    </section>
  );
};

export default About;
