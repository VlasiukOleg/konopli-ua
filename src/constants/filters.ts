import { FilterOption } from "@/@types";

export const sizes: FilterOption[] = [
  { key: "1", label: "140x200 см" },
  { key: "2", label: "150x210 см" },
  { key: "3", label: "160x200 см" },
  { key: "4", label: "172x205 см" },
  { key: "5", label: "180x200 см" },
  { key: "6", label: "200x220 см" },
  { key: "7", label: "220x240 см" },
  { key: "8", label: "240x260 см" },
];

export const seasons: FilterOption[] = [
  { key: "all", label: "Всі" },
  { key: "summer", label: "Літні" },
  { key: "allSeason", label: "Вcесезонні (4 сезони)" },
  { key: "winter", label: "Зимові" },
];

export const covers: FilterOption[] = [
  { key: "all", label: "Всі" },
  { key: "Сатин", label: "Сатин" },
  { key: "Бавовна", label: "Бавовна" },
  { key: "Конопляна тканина", label: "Конопляна тканина" },
];
