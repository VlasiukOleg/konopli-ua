import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Image,
  Button,
} from "@heroui/react";
import NextImage from "next/image";

import { useCart } from "@/store/cart";

interface ICartDrawer {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const CartDrawer: React.FC<ICartDrawer> = ({ isOpen, onOpenChange }) => {
  const { products, removeProduct } = useCart();

  const total = products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Drawer
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="right"
      radius="none"
      size="xs"
    >
      <DrawerContent>
        <>
          <DrawerHeader className="flex flex-col gap-1">Кошик</DrawerHeader>
          <DrawerBody>
            {products.length === 0 ? (
              <p>Ваш кошик порожній</p>
            ) : (
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  {products.map((product) => (
                    <div
                      className="border-b py-2"
                      key={`${product.id}-${product.size}`}
                    >
                      <div className=" flex gap-2 items-center">
                        <div className="">
                          <Image
                            alt={product.title}
                            as={NextImage}
                            className="text-center"
                            width={50}
                            height={50}
                            src={product.image}
                          />
                        </div>

                        <div className="text-sm">
                          <h3 className="font-medium ">{product.title}</h3>
                          <p>Розмір: {product.size}</p>
                          <p>
                            {product.price} грн. × {product.quantity}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="light"
                        color="danger"
                        className="p-1 h-[20px] text-xs"
                        radius="none"
                        onPress={() => removeProduct(product.id, product.size)}
                      >
                        Видалити
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="border p-4 h-fit">
                  <h2 className="text-xl font-bold mb-4">Разом</h2>
                  <div className="flex justify-between mb-2">
                    <span>Товари:</span>
                    <span>
                      {products.reduce((sum, i) => sum + i.quantity, 0)} шт.
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mb-4">
                    <span>До сплати:</span>
                    <span>{total} грн.</span>
                  </div>
                  <Button color="primary" className="w-full">
                    Оформити замовлення
                  </Button>
                </div>
              </div>
            )}
          </DrawerBody>
        </>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
