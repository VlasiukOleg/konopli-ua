"use client";

import { Button, Badge } from "@heroui/react";

import { SlMenu } from "react-icons/sl";
import { PiFlowerLotusLight } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

const Header: React.FC = () => {
  return (
    <header className="border-b-1 shadow-[inset_0_-2px_4px_0_rgba(0,0,0,0.1)]">
      <div className="container py-4 flex items-center justify-between">
        <SlMenu className="w-6 h-5" />
        <div className="text-accent flex items-center justify-center gap-1">
          <PiFlowerLotusLight className="size-8" />
          <div className="font-semibold text-xl">AloeStyle</div>
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
    </header>
  );
};

export default Header;
