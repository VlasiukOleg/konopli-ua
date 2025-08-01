"use client";

import { Radio, cn } from "@heroui/react";

interface IDeliveryRadio {
  children: React.ReactNode;
  value: string;
  description: string;
}

export const DeliveryRadio: React.FC<IDeliveryRadio> = (props) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
          "flex-row-reverse w-full cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent"
        ),
      }}
    >
      {children}
    </Radio>
  );
};

export default DeliveryRadio;
