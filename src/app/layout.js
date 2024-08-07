import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/components/Provider"; // Import the custom provider
import ClientWrapper from "@/components/Clientwrapper/ClientWrapper"; // Import the ClientWrapper
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "An-Luxuries: Where Luxury Meets Affordability",
  description: "Discover the finest selection of branded bags, glasses, and watches at An-Luxuries. We bring you the perfect blend of luxury and affordability, ensuring you stand out with style and elegance. Elevate your fashion game with our premium, handpicked accessories."
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="preconnect" href="https://brightspotcdn.com" />
      <link rel="preconnect" href="https://sothebys-com.brightspotcdn.com" />
      <body className={inter.className}>
        <ReduxProvider>
          <Toaster />
          <ClientWrapper>{children}</ClientWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}