import type { Metadata } from "next";
import clsx from "clsx";
import { Inter } from "next/font/google";
import "./globals.css";

import { Providers } from "./providers";

import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import AnnouncementBar from "@/components/ui/AnnouncementBar";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={clsx(inter.className)}>
        <Providers>
          <AnnouncementBar />
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
