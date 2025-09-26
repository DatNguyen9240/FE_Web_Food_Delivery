import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "../components/AnnouncementBar";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ReduxProvider from "@/redux/store/ReduxProvider";
import AppToastContainer from "../components/AppToastContainer";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Dorfo - Website giao đồ ăn nhanh chóng tại kí túc xá khu B",
  description:
    "Dorfo - Nền tảng giao đồ ăn nhanh chóng và tiện lợi tại kí túc xá khu B",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        <AppToastContainer />
        <ReduxProvider>
          <AnnouncementBar />
          <Header />
          <Nav />
          {children}
          <Footer />
          {modal}
        </ReduxProvider>
      </body>
    </html>
  );
}
