import Navbar from "@/components/ui/navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
const inter = Inter({ subsets: ["latin"] });
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Restaurant",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader color="#fff" />
        <Navbar />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
        />
        {/* <main className="max-w-7xl mx-auto px-3 lg:px-7"> */}
        {children}
        {/* </main> */}
      </body>
    </html>
  );
}
