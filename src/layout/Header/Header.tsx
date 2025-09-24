"use client";

import {
  Button,
  Badge,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
} from "@heroui/react";
import Link from "next/link";

import CartDrawer from "@/components/ui/CartDrawer";

import { useCart } from "@/store/cart";

import { SlMenu } from "react-icons/sl";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

import { Pages } from "@/@types";

import Logo from "@images/logo.png";
import Image from "next/image";

const Header: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { products } = useCart();

  const {
    isOpen: isCartOpen,
    onOpen: onCartOpen,
    onOpenChange: onCartOpenChange,
  } = useDisclosure();

  const handleOpen = () => {
    onOpen();
  };
  return (
    <header className="border-b-1 border-accent shadow-[inset_0_-2px_4px_0_rgba(0,0,0,0.1)]">
      <div className="container py-4 flex items-center justify-between">
        <Button
          isIconOnly
          aria-label="Like"
          variant="light"
          onPress={handleOpen}
          radius="none"
        >
          <SlMenu className="w-6 h-5 md:w-8 md:h-7" />
        </Button>

        <Link
          href={Pages.MAIN}
          className="text-accent flex items-center justify-center gap-1"
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
        <div className="flex items-center justify-center gap-3">
          <Button
            isIconOnly
            aria-label="Like"
            variant="light"
            radius="none"
            className="size-10 md:size-12"
          >
            <Badge className="bg-accent text-white" content="2">
              <FaRegHeart className="size-6 text-grey md:size-8" />
            </Badge>
          </Button>

          <Button
            isIconOnly
            aria-label="Like"
            variant="light"
            onPress={onCartOpen}
            radius="none"
            className="size-10 md:size-12"
          >
            <Badge
              className="bg-accent text-white"
              content={products.length}
              isInvisible={products.length === 0}
            >
              <FiShoppingCart className="size-6 text-grey md:size-8" />
            </Badge>
          </Button>
        </div>
      </div>
      <Drawer
        isOpen={isOpen}
        placement="top"
        onOpenChange={onOpenChange}
        radius="none"
      >
        <DrawerContent>
          <>
            <DrawerHeader className="flex flex-col gap-1">Меню</DrawerHeader>
            <DrawerBody>
              <div className="flex justify-around mb-4 font-semibold">
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
            </DrawerBody>
          </>
        </DrawerContent>
      </Drawer>
      <CartDrawer isOpen={isCartOpen} onOpenChange={onCartOpenChange} />
    </header>
  );
};

export default Header;
