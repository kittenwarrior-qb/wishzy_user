// Layout chính ở đây, import header, toast, ...

import {NextIntlClientProvider, hasLocale, } from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import { setRequestLocale, getMessages } from 'next-intl/server';
import Header from '@/components/layouts/header';
import Footer from '@/components/layouts/footer';
import SubHeader from '@/components/layouts/subheader';
 
export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header/>
          {children}
          <Footer/>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
