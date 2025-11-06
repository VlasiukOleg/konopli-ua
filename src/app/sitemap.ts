import type { MetadataRoute } from "next";

import { Pages } from "@/@types";

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE_URL = "https://konopli-ua.com";
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/${Pages.CATALOG}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/${Pages.CATALOG}/${Pages.KOVDRI}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/${Pages.CATALOG}/${Pages.PODUSHKI}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/${Pages.CATALOG}/${Pages.POSTIL}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/${Pages.CATALOG}/${Pages.SHKARPETKI}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/${Pages.CATALOG}/${Pages.VANNA}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/${Pages.CATALOG}/${Pages.KOSMETIKA}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/${Pages.CATALOG}/${Pages.BILYZNA}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
