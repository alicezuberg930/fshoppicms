import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Content from "./components/admin/content";
import Header from "./components/admin/header";
import SideBar from "./components/admin/sidebar"
import { AdminContextProvider } from "./hooks/admin.context"
import CustomProvider from "./components/StoreProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AdminContextProvider>
          <CustomProvider>
            <div className='flex h-screen'>
              <SideBar />
              <div className='flex flex-col flex-1 w-full'>
                <Header />
                <Content>
                  {children}
                </Content>
              </div>
            </div>
          </CustomProvider>
        </AdminContextProvider>
      </body>
    </html>
  );
}
