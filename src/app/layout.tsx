import { AuthContextProvider } from '@/context/AuthContext';
import { Abril_Fatface, Open_Sans } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { SearchContextProvider } from '@/context/SearchContext';

import './globals.css';
import { ConfettiContextProvider } from '@/context/ConfettiContext';
import { NotificationContextProvider } from '@/context/NotificationContext';
import classNames from 'classnames';

export const inter = Open_Sans({ subsets: ['latin']});

export const titleFont = Abril_Fatface({
  // weight: ["500", "600", "700"],
  subsets: ["latin"],
  weight: '400',
  variable:"--font-dancing"
});

// Metadata for the application
export const metadata = {
  title: 'Heather & Adam\'s wedding website',
  description: 'RSVP and info site for wedding of Heather & Adam happening on the 31st October 2026',
};

// Root layout component for the application
export default function RootLayout({ children }: { children: React.ReactNode }) {
  // console.log(navigator.language);

  return (
    <html 
      lang="en"
      className={classNames(
        inter.className,
        titleFont.variable        
      )}
    >
      {/*
        The <head /> component will contain the components returned by the nearest parent
        head.js. It can be used to define the document head for SEO, metadata, and other purposes.
        Learn more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        {/* Wrap the children with the AuthContextProvider to provide authentication context */}
        <AuthContextProvider>
          <NextIntlClientProvider>
            <NotificationContextProvider>
              <SearchContextProvider>
                <ConfettiContextProvider>
                  {children}
                </ConfettiContextProvider>
              </SearchContextProvider>
            </NotificationContextProvider>
          </NextIntlClientProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
