"use client";

import { useEffect, useRef } from "react";
import { sendGTMEvent } from "@next/third-parties/google";
import { useCart } from "@/store/cart";

export default function CheckoutTracker() {
  const { products } = useCart(); // Изменено на products
  const hasFired = useRef(false);

  useEffect(() => {
    // Проверяем, есть ли товары и не отправлялось ли событие ранее
    if (!products || products.length === 0 || hasFired.current) return;

    // Считаем общую стоимость всех товаров в чекауте
    const totalValue = products.reduce((sum, item) => {
      const itemPrice = item.salePrice || item.price;
      return sum + (Number(itemPrice) || 0);
    }, 0);

    // 1. Очищаем старые данные ecommerce
    sendGTMEvent({ ecommerce: null });

    // 2. Отправляем событие начала оформления
    sendGTMEvent({
      event: "begin_checkout",
      ecommerce: {
        currency: "UAH",
        value: totalValue,
        items: products.map((item) => ({
          item_id: item.id,
          item_name: item.title,
          price: Number(item.salePrice || item.price) || 0,
          quantity: item.quantity || 1, // Если в сторе есть количество, подставится оно, иначе 1
          item_variant: item.size || "",
        })),
      },
    });

    // Блокируем повторную отправку на этой сессии страницы
    hasFired.current = true;
  }, [products]);

  return null;
}
