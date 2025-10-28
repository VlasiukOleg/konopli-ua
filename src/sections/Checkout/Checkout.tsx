"use client";

import React, { useState, useCallback, useEffect } from "react";
import clsx from "clsx";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useMask } from "@react-input/mask";
import * as yup from "yup";
import { Input, Textarea, Checkbox, RadioGroup } from "@heroui/react";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import DeliveryRadio from "@/components/common/DeliveryRadio";

import { useCart } from "@/store/cart";

import sendingEmail from "@/utils/sendEmail";

const phoneRegex = /^\+38 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;

export interface IFormState {
  firstName?: string;
  email?: string;
  phone: string;
  address?: string;
  message?: string | null;
  policy: boolean;
  city: string;
  warehouse?: string;
}

interface City {
  value: string;
  label: string;
}

interface Warehouse {
  value: string;
  label: string;
}

const Checkout: React.FC = ({}) => {
  const inputRef = useMask({
    mask: "+38 (___) ___-__-__",
    replacement: { _: /\d/ },
    showMask: true,
  });

  const router = useRouter();
  const { products, clearCart } = useCart();

  const [query, setQuery] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSendError] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [isLoadingWarehouses, setIsLoadingWarehouses] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedWarehouseLabel, setSelectedWarehouseLabel] = useState("");

  const [selectedDeliveryRadio, setSelectedDeliveryRadio] =
    React.useState("novaposhta");

  const orderValidationSchema = yup.object({
    firstName: yup.string(),
    email: yup.string().email("Не правильний email"),
    phone: yup
      .string()
      .matches(phoneRegex, "Формат +38 (XXX) XXX-XX-XX")
      .required("Це поле є обов'язковим до заповнення"),
    address:
      selectedDeliveryRadio === "ukrposhta"
        ? yup.string().required("Це поле є обов'язковим до заповнення")
        : yup.string().optional(),
    city: yup.string().required("Оберіть місто"),
    warehouse:
      selectedDeliveryRadio === "novaposhta"
        ? yup.string().required("Оберіть відділення")
        : yup.string().optional(),
    message: yup.string().nullable(),
    policy: yup
      .boolean()
      .oneOf([true])
      .required("Це поле є обов'язковим до заповнення"),
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(orderValidationSchema),
    defaultValues: {
      policy: false,
    },
  });

  const onCityInputChange = (value: string) => {
    setQuery(value);
  };

  const isCity = cities.some((city) => city.value === selectedCity);

  useEffect(() => {
    if (isCity) {
      return;
    }
    if (query) {
      searchCities(query);
    }
  }, [isCity, query]);

  const fetchWarehouses = useCallback(async (cityRef: string) => {
    if (!cityRef) return;

    setIsLoadingWarehouses(true);
    try {
      const response = await fetch("/api/novaposhta/warehouses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cityRef }),
      });
      const data = await response.json();
      setWarehouses(data);
      setQuery("");
    } catch (error) {
      console.error("Error fetching warehouses:", error);
    } finally {
      setIsLoadingWarehouses(false);
    }
  }, []);

  const searchCities = async (searchTerm: string) => {
    setIsLoadingCities(true);
    try {
      const response = await fetch("/api/novaposhta/cities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ search: searchTerm }),
      });
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    } finally {
      setIsLoadingCities(false);
    }
  };

  const handleCitySelect = (cityRef: string) => {
    setSelectedCity(cityRef);
    fetchWarehouses(cityRef);
  };

  const handleWarehouseSelect = (warehouseKey: string) => {
    const warehouse = warehouses.find(
      (warehouse) => warehouse.value === warehouseKey
    );

    setSelectedWarehouseLabel(warehouse?.label || "");
  };

  const onSubmit = async (data: IFormState) => {
    setSendError(false);

    const selectedCityData = cities.find((city) => city.value === data.city);
    const selectedWarehouseData = warehouses.find(
      (warehouse) => warehouse.value === data.warehouse
    );

    const sanitizedData = {
      ...data,
      firstName: data.firstName?.trim() || "",
      phone: data.phone.replace(/[\s()-]/g, ""),
      email: data.email?.trim() || "",
      address: data.address?.trim() || "",
      message: data.message?.trim() || "",
      city: selectedCityData?.label || "",
      warehouse: selectedWarehouseData?.label || "",
      products,
    };

    try {
      setIsSending(true);
      await sendingEmail(sanitizedData);
      router.push("/thanks");
      reset();
      clearCart();
    } catch (error) {
      console.error(error);
      setSendError(true);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="py-5">
      <div className="container">
        <h2 className="text-2xl text-grey mb-2 text-center">
          Оформити замовлення
        </h2>
        <form className="w-full xl:w-[48%] " onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 bg-bgWhite border-[1px] border-grey p-4 md:space-y-4">
            <div className="relative">
              <Input
                {...register("firstName")}
                isClearable
                radius="none"
                label="Ваше ім'я"
                placeholder="Введіть ім'я"
                size="md"
                labelPlacement="outside"
                variant="bordered"
                classNames={{
                  label: "text-xs font-semibold md:text-sm !text-grey",
                  inputWrapper: "group-data-[focus=true]:border-accent",
                }}
              />
              <p className="absolute left-0 bottom-[-20px] text-[10px]/6 text-red-600">
                {errors.firstName?.message}
              </p>
            </div>
            <div className="relative">
              <Input
                {...register("email")}
                isClearable
                radius="none"
                label="Email"
                placeholder="Введіть email"
                size="md"
                labelPlacement="outside"
                variant="bordered"
                classNames={{
                  label: "text-xs font-semibold md:text-sm !text-grey",
                  inputWrapper: "group-data-[focus=true]:border-accent",
                }}
              />
              <p className="absolute left-0 bottom-[-20px] text-[10px]/6 text-red-600">
                {errors.email?.message}
              </p>
            </div>
            <div className="relative">
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: "Це поле є обов'язковим до заповнення",
                  pattern: {
                    value: /^\+38 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
                    message: "Формат +38 (XXX) XXX-XX-XX",
                  },
                }}
                render={({ field, fieldState }) => (
                  <div className="relative">
                    <Input
                      {...field}
                      ref={inputRef}
                      label="Телефон"
                      placeholder="Введіть телефон"
                      size="md"
                      radius="none"
                      labelPlacement="outside"
                      variant="bordered"
                      classNames={{
                        label: "text-xs font-semibold md:text-sm !text-grey",
                        inputWrapper: "group-data-[focus=true]:border-accent",
                      }}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                    {fieldState.error && (
                      <p className="absolute left-0 bottom-[-20px] text-[10px]/6 text-red-600">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <Controller
              name="city"
              control={control}
              render={({ field, fieldState }) => (
                <div className="relative">
                  <Autocomplete
                    label={
                      <span className="text-xs  font-semibold md:text-sm !text-grey">
                        Місто
                      </span>
                    }
                    placeholder="Введіть Ваше місто"
                    radius="none"
                    isLoading={isLoadingCities}
                    onInputChange={onCityInputChange}
                    variant="bordered"
                    labelPlacement="outside"
                    defaultItems={cities}
                    selectedKey={field.value}
                    onSelectionChange={(key) => {
                      handleCitySelect(key as string);
                      field.onChange(key);
                    }}
                    classNames={{
                      base: "group-data-[focus=true]:border-accent",
                    }}
                  >
                    {(item) => (
                      <AutocompleteItem key={item.value}>
                        {item.label}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                  {fieldState.error && (
                    <p className="absolute left-0 bottom-[-20px] text-[10px]/6 text-red-600 ">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />

            {selectedCity && (
              <div>
                <RadioGroup
                  label="Доставка"
                  value={selectedDeliveryRadio}
                  onValueChange={setSelectedDeliveryRadio}
                  classNames={{
                    base: "",
                    wrapper: "gap-4",
                  }}
                >
                  <div className="border-2 border-accent rounded-xl p-2 pb-4">
                    <DeliveryRadio
                      description="За тарифами перевізника"
                      value="novaposhta"
                    >
                      Самовивіз з відділення «Нова Пошта»
                    </DeliveryRadio>
                    {selectedDeliveryRadio === "novaposhta" && (
                      <div className="pb-1 mt-2">
                        <Controller
                          name="warehouse"
                          control={control}
                          rules={{ required: "Оберіть відділення" }}
                          render={({ field, fieldState }) => (
                            <div className="relative">
                              <Autocomplete
                                label={
                                  <span className="text-xs  font-semibold md:text-sm !text-grey">
                                    Відділення нової пошти
                                  </span>
                                }
                                placeholder={
                                  selectedCity
                                    ? "Введіть номер відділення"
                                    : "Спочатку оберіть місто"
                                }
                                defaultItems={warehouses}
                                radius="none"
                                variant="bordered"
                                isLoading={isLoadingWarehouses}
                                onSelectionChange={(key) => {
                                  handleWarehouseSelect(key as string);
                                  field.onChange(key);
                                }}
                                labelPlacement="outside"
                              >
                                {(item) => (
                                  <AutocompleteItem key={item.value}>
                                    {item.label}
                                  </AutocompleteItem>
                                )}
                              </Autocomplete>
                              {selectedWarehouseLabel && (
                                <p className="mt-2 text-xs text-green-700">
                                  Обрано: {selectedWarehouseLabel}
                                </p>
                              )}
                              {fieldState.error && (
                                <p className="absolute left-0 bottom-[-20px] text-[10px]/6 text-red-600">
                                  {fieldState.error.message}
                                </p>
                              )}
                            </div>
                          )}
                        />
                      </div>
                    )}
                  </div>
                  <div className="border-2 border-accent rounded-xl p-2 pb-4">
                    <DeliveryRadio
                      description="За тарифами перевізника"
                      value="ukrposhta"
                    >
                      Самовивіз з відділення «Укрпошта»
                    </DeliveryRadio>
                    {selectedDeliveryRadio === "ukrposhta" && (
                      <div className="relative">
                        <Input
                          {...register("address")}
                          isClearable
                          label="Адреса відділення"
                          placeholder="Введіть адресу відділення"
                          size="md"
                          radius="none"
                          labelPlacement="outside"
                          variant="bordered"
                          classNames={{
                            label:
                              "text-xs  font-semibold md:text-sm !text-grey",
                            inputWrapper:
                              "group-data-[focus=true]:border-accent",
                          }}
                        />
                        <p className="absolute  left-0 bottom-[-20px] text-[10px]/6 text-red-600">
                          {errors.address?.message}
                        </p>
                      </div>
                    )}
                  </div>
                </RadioGroup>
              </div>
            )}

            <Textarea
              {...register("message")}
              label="Додаткова інформація"
              labelPlacement="outside"
              size="md"
              radius="none"
              placeholder="Напишіть додаткову інформацію якщо потрібно"
              variant="bordered"
              classNames={{
                label: "text-xs font-semibold md:text-sm !text-grey",
                inputWrapper: "group-data-[focus=true]:border-accent",
              }}
            />
            <Controller
              control={control}
              name="policy"
              render={({ field }) => (
                <Checkbox
                  {...register("policy")}
                  isSelected={field.value}
                  onValueChange={field.onChange}
                  color="success"
                  radius="none"
                  classNames={{
                    label: clsx(
                      "text-xs md:text-sm",
                      errors.policy?.message && "text-red-500"
                    ),
                    wrapper: errors.policy?.message && "before:!border-red-500",
                  }}
                >
                  Даю згоду на обробку персональних даних
                </Checkbox>
              )}
            />
          </div>

          <div className="text-center mt-4 flex justify-center">
            <Button
              type="submit"
              size="sm"
              radius="none"
              className="bg-accent text-white font-medium text-base h-10 xl:text-lg xl:h-12"
              isLoading={isSending}
            >
              Оформити замовлення
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Checkout;
