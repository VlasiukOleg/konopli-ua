import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface NovaPoshtaApiResponse {
  success: boolean;
  data: City[];
  errors?: string[];
}

interface City {
  Ref: string;
  Description: string;
  AreaDescription: string;
}

interface FormattedCity {
  value: string;
  label: string;
}

export async function POST(request: Request) {
  try {
    const { search } = await request.json();

    const response = await fetch("https://api.novaposhta.ua/v2.0/json/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apiKey: process.env.NOVA_POSHTA_API_KEY,
        modelName: "Address",
        calledMethod: "getCities",
        methodProperties: {
          FindByString: search || "",
          Limit: 50,
        },
      }),
    });

    const data: NovaPoshtaApiResponse = await response.json();

    if (!data.success) {
      if (data.errors?.some((e) => e.includes("FindByString"))) {
        return NextResponse.json([], { status: 200 });
      }
      return NextResponse.json(
        { error: data.errors?.join(", ") || "Unknown error" },
        { status: 400 }
      );
    }

    const formattedCities: FormattedCity[] = data.data.map((city: City) => ({
      value: city.Ref,
      label: `${city.Description} (${city.AreaDescription})`,
    }));

    return NextResponse.json(formattedCities);
  } catch (error) {
    console.error("Nova Poshta API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch cities" },
      { status: 500 }
    );
  }
}
