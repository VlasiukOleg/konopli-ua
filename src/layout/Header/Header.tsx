"use client";

import {
  Button,
  Badge,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
} from "@heroui/react";

import { SlMenu } from "react-icons/sl";
import { GiVanillaFlower } from "react-icons/gi";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

const Header: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleOpen = () => {
    onOpen();
  };
  return (
    <header className="border-b-1 shadow-[inset_0_-2px_4px_0_rgba(0,0,0,0.1)]">
      <div className="container py-4 flex items-center justify-between">
        <Button
          isIconOnly
          aria-label="Like"
          variant="light"
          onPress={handleOpen}
        >
          <SlMenu className="w-6 h-5" />
        </Button>

        <div className="text-accent flex items-center justify-center gap-1">
          <GiVanillaFlower className="size-6" />
          <div className="font-semibold text-xl">KONOPLI-UA</div>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Button isIconOnly aria-label="Like" variant="light">
            <Badge className="bg-accent text-white" content="2">
              <FaRegHeart className="size-6 text-grey" />
            </Badge>
          </Button>

          <Button isIconOnly aria-label="Like" variant="light">
            <Badge className="bg-accent text-white" content="2">
              <FiShoppingCart className="size-6 text-grey" />
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
          {(onClose) => (
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
          )}
        </DrawerContent>
      </Drawer>
    </header>
  );
};

export default Header;
