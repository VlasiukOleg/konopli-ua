"use client";

import { useEffect, useRef } from "react";
import { sendGTMEvent } from "@next/third-parties/google";
import { useCart } from "@/store/cart";

export default function PurchaseTracker() {
  // Підтягуємо товари та метод очищення кошика з твого стору
  const { products, clearCart } = useCart();
  const hasFired = useRef(false);

  useEffect(() => {
    // Якщо кошик уже порожній або подія вже відпрацювала — нічого не робимо
    if (!products || products.length === 0 || hasFired.current) return;

    // Рахуємо фінальну вартість усієї покупки
    const totalValue = products.reduce((sum, item) => {
      const itemPrice = item.salePrice || item.price;
      return sum + (Number(itemPrice) || 0);
    }, 0);

    // 1. Очищаємо попередні дані ecommerce в GTM
    sendGTMEvent({ ecommerce: null });

    // 2. Відправляємо головну подію покупки для TikTok (CompletePayment)
    sendGTMEvent({
      event: "purchase",
      ecommerce: {
        // Генеруємо тимчасовий ID транзакції на основі часу, якщо бекенд не повертає його у стор
        transaction_id: `order_${Date.now()}`,
        currency: "UAH",
        value: totalValue,
        items: products.map((item) => ({
          item_id: item.id,
          item_name: item.title,
          price: Number(item.salePrice || item.price) || 0,
          quantity: item.quantity || 1,
          item_variant: item.size || "",
        })),
      },
    });

    // Фіксуємо, що подія відправлена, щоб StrictMode не викликав її дубль
    hasFired.current = true;

    // 3. Очищаємо кошик ПІСЛЯ того, як аналітика успішно зафіксувала дані
    if (clearCart) {
      clearCart();
    }
  }, [products, clearCart]);

  return null;
}
