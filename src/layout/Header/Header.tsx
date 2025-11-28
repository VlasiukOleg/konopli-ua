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
import Image from "next/image";
import { useRouter } from "next/navigation";

import CartDrawer from "@/components/ui/CartDrawer";

import { useCart } from "@/store/cart";

import { SlMenu } from "react-icons/sl";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

import { Pages } from "@/@types";

import Logo from "@images/logo.png";

import categoriesData from "@/data/categoryList.json";
import { useFavorite } from "@/store/favorite";

const Header: React.FC = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { products } = useCart();
  const { favoriteIds } = useFavorite();
  const router = useRouter();
  const {
    isOpen: isCartOpen,
    onOpen: onCartOpen,
    onOpenChange: onCartOpenChange,
  } = useDisclosure();

  const totalFavoriteCount = favoriteIds.length;

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
            onPress={() => router.push(`/${Pages.FAVORITES}`)}
          >
            <Badge
              className="bg-accent text-white"
              content={totalFavoriteCount}
              isInvisible={favoriteIds.length === 0}
            >
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
              <div className="flex justify-between mb-4 md:mb-6 xl:justify-around">
                <div>
                  <p className="text-accent font-bold mb-2 md:text-lg">
                    Покупцям
                  </p>
                  <ul className="text-black text-xs font-semibold flex flex-col gap-2 md:text-sm">
                    <li>
                      <Link
                        href={`/${Pages.ABOUT}`}
                        className="text-xs md:text-sm"
                        onNavigate={() => {
                          onClose();
                        }}
                      >
                        Про нас
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/${Pages.CONTACTS}`}
                        className="text-xs md:text-sm"
                        onNavigate={() => {
                          onClose();
                        }}
                      >
                        Контакти
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/${Pages.DOSTAVKA_OPLATA}`}
                        className="text-xs md:text-sm"
                        onNavigate={() => {
                          onClose();
                        }}
                      >
                        Доставка і оплата
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/${Pages.RETURNS}`}
                        className="text-xs md:text-sm"
                        onNavigate={() => {
                          onClose();
                        }}
                      >
                        Обмін та повернення
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="text-accent font-bold mb-2 md:text-lg">
                    Каталог
                  </p>
                  <ul className="text-black font-semibold text-xs flex flex-col gap-2 md:text-sm md:grid md:grid-cols-2">
                    {categoriesData.list.map((category) => (
                      <Link
                        href={`/${Pages.CATALOG}/${category.href}`}
                        key={category.id}
                        onNavigate={() => {
                          onClose();
                        }}
                      >
                        {category.title}
                      </Link>
                    ))}
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
