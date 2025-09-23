import { Toaster } from "@/components/ui/sonner";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import Transition from "@/components/shared/transitions";
import { CartProvider } from "@/contexts/CartContext";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin"],
  display: "swap",
  weight: ["100","200","300","400","500","600","700","800","900"],
});


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" data-theme="wishzy" suppressHydrationWarning>
      <body className={`${beVietnamPro.variable} antialiased`}>
        <CartProvider>
          <Transition>
            {children}
            <Toaster position="top-right" richColors />
          </Transition>
        </CartProvider>
      </body>
    </html>
  );
}
