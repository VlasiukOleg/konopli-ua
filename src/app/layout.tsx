import type { Metadata } from "next";
import clsx from "clsx";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { GoogleTagManager } from '@next/third-parties/google'

import { Providers } from "./providers";

import Header from "@/layout/Header";
import Footer from "@/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Konopli-Ua",
  description: "натуральні та eкологічні вироби з конопель, створені з турботою про Вас",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-P72J5XZ9" />
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
