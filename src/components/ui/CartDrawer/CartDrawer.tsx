import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Image,
  Button,
  Input,
  DrawerFooter,
} from "@heroui/react";
import NextImage from "next/image";

import { useCart } from "@/store/cart";

import { FaMinus, FaPlus } from "react-icons/fa6";
import { RiDeleteBin2Fill } from "react-icons/ri";

interface ICartDrawer {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const CartDrawer: React.FC<ICartDrawer> = ({ isOpen, onOpenChange }) => {
  const { products, removeProduct, updateQuantity } = useCart();

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
      <DrawerContent className="h-[100dvh] max-h-[100dvh] flex flex-col">
        <>
          <DrawerHeader className="shrink-0 border-b border-default-200 px-4 py-3">
            Кошик
          </DrawerHeader>
          <DrawerBody className="flex-1 overflow-hidden flex flex-col">
            {products.length === 0 ? (
              <p className="text-center">Ваш кошик порожній</p>
            ) : (
              <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                <div className="flex-1 overflow-y-auto">
                  {products.map((product) => (
                    <div
                      className="border-b py-2"
                      key={`${product.id}-${product.size}`}
                    >
                      <div className=" flex gap-2 items-center mb-2">
                        <Image
                          alt={product.title}
                          as={NextImage}
                          className="text-center"
                          width={70}
                          height={70}
                          src={product.image}
                        />

                        <div className="text-sm">
                          <h3 className="font-medium ">{product.title}</h3>
                          <p>Розмір: {product.size}</p>
                          <div className="flex items-center justify-between">
                            <p>{product.price} грн.</p>
                            <Button
                              isIconOnly
                              variant="light"
                              color="danger"
                              className="p-1 h-[20px]"
                              radius="none"
                              onPress={() =>
                                removeProduct(product.id, product.size)
                              }
                            >
                              <RiDeleteBin2Fill className="size-5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Button
                            isIconOnly
                            aria-label="Take a photo"
                            className=" border-accent h-6 w-6 min-w-6"
                            radius="none"
                            variant="bordered"
                            onPress={() =>
                              updateQuantity(
                                product.id,
                                product.size,
                                product.quantity - 1
                              )
                            }
                          >
                            <FaMinus className=" text-accent" />
                          </Button>
                          <Input
                            name="quantity"
                            variant="bordered"
                            type="number"
                            radius="none"
                            classNames={{
                              inputWrapper:
                                "group-data-[focus=true]:border-accent min-h-7 h-7 w-20",
                              base: " mx-2 w-20",
                              input: "text-center",
                            }}
                            value={product.quantity.toString()}
                            onValueChange={(value) =>
                              updateQuantity(
                                product.id,
                                product.size,
                                Number(value) || 1
                              )
                            }
                          />
                          <Button
                            isIconOnly
                            aria-label="Take a photo"
                            className=" border-accent h-6 w-6 min-w-6"
                            radius="none"
                            variant="bordered"
                            onPress={() =>
                              updateQuantity(
                                product.id,
                                product.size,
                                product.quantity + 1
                              )
                            }
                          >
                            <FaPlus className=" text-accent" />
                          </Button>
                        </div>

                        <p>{product.price * product.quantity} грн.</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </DrawerBody>
          <DrawerFooter className="justify-center flex-col">
            {products.length > 0 && (
              <div className="border p-2 h-fit">
                <div className="flex justify-between mb-2 text-sm">
                  <span>Кільксть товарів:</span>
                  <span>
                    {products.reduce((sum, i) => sum + i.quantity, 0)} шт.
                  </span>
                </div>
                <div className="flex justify-between mb-2 text-sm">
                  <span>Вартість товарів:</span>
                  <span>{total} грн.</span>
                </div>
                <div className="flex justify-between mb-2 text-sm">
                  <span>Знижка:</span>
                  <span>5%</span>
                </div>
                <div className="flex justify-between font-bold text-lg mb-4">
                  <span>До сплати:</span>
                  <span>{(total / 1.05).toFixed(0)} грн.</span>
                </div>
                <Button
                  size="md"
                  radius="none"
                  variant="bordered"
                  className="font-semibold text-accent border-accent w-full"
                >
                  Оформити замовлення
                </Button>
              </div>
            )}

            <Button
              size="sm"
              radius="none"
              className="bg-accent font-semibold text-white text-center"
              onPress={() => onOpenChange(false)}
            >
              ПРОДОВЖИТИ ПОКУПКИ
            </Button>
          </DrawerFooter>
        </>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
