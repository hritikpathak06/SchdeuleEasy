import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/client/LandingPage/Header";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/client/LandingPage/Footer";
import { CreateEvent } from "@/components/client/Shared/CreateEvent";
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ScheduleEasy",
  description: "Meeting Scheduling Web App",
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
          <Header />
          <main className="min-h-screen bg-gradient-to-b from-blue-50 to-zinc-300">
            <Toaster/>
            {children}
          </main>
         <Footer/>
        <CreateEvent/>
        </body>
      </html>
    </ClerkProvider>
  );
}
