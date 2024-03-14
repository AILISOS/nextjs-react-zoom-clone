import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import Navbar from "./components/Navbar";
import ClientProvider from "./ClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meetings App",
  description: "A video calling app built with Next.js & Stream",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <ClientProvider>
        <Navbar />
        <main className="max-w-5xl mx-auto px-3 py-6">{children}</main>
        </ClientProvider>
        </body>
    </html>
    </ClerkProvider>
  );
}
