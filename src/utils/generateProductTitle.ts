import { FilterOption } from "@/@types";

export const generateProductTitle = (
  baseTitle: string,
  season: string,
  cover: string,
  size: string,
  seasonsOptions: FilterOption[],
  coversOptions: FilterOption[],
  sizesOptions: FilterOption[]
): string => {
  let title = baseTitle;

  if (season !== "all") {
    const seasonOption = seasonsOptions.find((opt) => opt.key === season);
    if (seasonOption) {
      const seasonText = seasonOption.label;
      title = title.replace("Гіпоалергенні", seasonText + " гіпоалергенні");
    }
  }

  if (cover !== "all") {
    const coverOption = coversOptions.find((opt) => opt.key === cover);
    if (coverOption) {
      title = title.replace(
        "ковдри",
        "ковдри " + "покриття " + coverOption.label.toLowerCase()
      );
    }
  }

  const sizeOption = sizesOptions.find((opt) => opt.key === size);
  if (sizeOption) {
    title += ` ${sizeOption.label.toLowerCase()}`;
  }

  return title;
};
