import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface NovaPoshtaApiResponse {
  success: boolean;
  data: Warehouse[];
  errors?: string[];
}

interface Warehouse {
  Ref: string;
  Description: string;
  CityRef: string;
  CityDescription?: string;
  Number?: string;
  ShortAddress?: string;
  PlaceMaxWeightAllowed?: number;
}

interface FormattedWarehouse {
  value: string;
  label: string;
}

export async function POST(request: Request) {
  try {
    const { cityRef } = await request.json();

    if (!cityRef) {
      return NextResponse.json(
        { error: "City reference is required" },
        { status: 400 }
      );
    }

    const response = await fetch("https://api.novaposhta.ua/v2.0/json/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apiKey: process.env.NOVA_POSHTA_API_KEY,
        modelName: "Address",
        calledMethod: "getWarehouses",
        methodProperties: {
          CityRef: cityRef,
        },
      }),
    });

    const data: NovaPoshtaApiResponse = await response.json();

    if (!data.success) {
      return NextResponse.json(
        { error: data.errors?.join(", ") || "Unknown error from Nova Poshta API" },
        { status: 400 }
      );
    }

    const formattedWarehouses: FormattedWarehouse[] = data.data.map((warehouse: Warehouse) => ({
      value: warehouse.Ref,
      label: warehouse.Description,
    }));

    return NextResponse.json(formattedWarehouses);
  } catch (error) {
    console.error("Nova Poshta API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch warehouses" },
      { status: 500 }
    );
  }
}
