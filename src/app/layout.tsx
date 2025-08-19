import type { Metadata } from "next";
import clsx from "clsx";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

import { Providers } from "./providers";

import Header from "@/layout/Header";
import Footer from "@/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"], // выбирайте нужные веса
  variable: "--font-montserrat", // добавляем CSS переменную
});

export const metadata: Metadata = {
  title: "KONOPLI-UA",
  description: "живи на повну з Алое",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, montserrat.variable)}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
