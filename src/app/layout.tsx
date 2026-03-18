import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConditionalLayout } from "@/components/layout/conditional-layout";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { BackToTop } from "@/components/ui/back-to-top";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: "Ember Dental - Hệ thống Quản lý Nha khoa",
    template: "%s | Ember Dental",
  },
  description: "Giải pháp quản lý phòng khám nha khoa toàn diện, chuyên nghiệp và hiệu quả.",
  keywords: ["nha khoa", "quản lý phòng khám", "dental clinic", "hồ sơ bệnh án", "lịch hẹn"],
  authors: [{ name: "Ember Dental Team" }],
  creator: "Ember Dental",
  openGraph: {
    title: "Ember Dental - Quản lý Phòng khám",
    description: "Giải pháp quản lý phòng khám nha khoa toàn diện.",
    url: '/',
    siteName: "Ember Dental",
    type: "website",
    locale: "vi_VN",
  },
};

import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`} suppressHydrationWarning>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
          >
            <SmoothScrollProvider>
              <ConditionalLayout>
                {children}
              </ConditionalLayout>
              <BackToTop />
              <Toaster
                position="top-right"
                richColors
                closeButton
                toastOptions={{
                  duration: 4000,
                }}
              />
            </SmoothScrollProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
