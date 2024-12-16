import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ReduxStoreProvider from "./components/ReduxStoreProvider";
import NextAuthSessionProvider from "./components/NextAuthSessionProvider";
import { auth } from "./configs/auth.config";

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
  title: "Đăng Nhập | CMS",
  description: "Trang đăng nhập quản lý CMS cho future life",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await auth()

  return (
    <html lang="en">
      <head>
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextAuthSessionProvider session={session}>
          <ReduxStoreProvider>
            {children}
          </ReduxStoreProvider>
        </NextAuthSessionProvider>
        <ToastContainer
          closeOnClick
          draggable
          pauseOnHover
          pauseOnFocusLoss
        />
      </body>
    </html>
  );
}