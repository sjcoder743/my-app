import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Thoughts — Express Freely",
  description: "A minimal, modern app to share your thoughts securely and privately.",
  authors: [{ name: "Your Name", url: "https://yourdomain.com" }],
  keywords: ["thoughts", "journal", "notes", "nextjs", "clerk", "mongodb"],
  openGraph: {
    title: "Thoughts — Express Freely",
    description: "A clean and secure platform to share your thoughts.",
    url: "https://yourdomain.com",
    siteName: "Thoughts",
    images: [
      {
        url: "https://yourdomain.com/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Navbar />
          <Toaster position="top-center" />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
