

import type { Metadata } from "next";
import { getTranslations } from 'next-intl/server'
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import Transition from "@/components/shared/transitions";


const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin"],
  display: "swap",
  weight: [
    "100", "200", "300", "400", "500", "600", "700", "800", "900"
  ],
});

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'HomePage' })

  return {
    title: t('title'),
    description: t('description') || 'Wishzy - Nền tảng học trực tuyến.',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" data-theme="wishzy" suppressHydrationWarning>
      <body className={`${beVietnamPro.variable} antialiased`}>
        <Transition>{children}</Transition>
      </body> 
    </html>
  );
}
