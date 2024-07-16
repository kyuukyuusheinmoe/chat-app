import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "@/containers/SideBar";
import MainContentArea from "@/containers/MainContentArea";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Q Chat App",
  description: "created by kyukyusheinmoe97@gmail.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, "flex")}>
        <SideBar />
        <MainContentArea />
      </body>
    </html>
  );
}
