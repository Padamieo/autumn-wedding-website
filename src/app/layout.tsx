import { AuthContextProvider } from '@/context/AuthContext';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { SearchContextProvider } from '@/context/SearchContext';

import './globals.css';

// Load the Inter font with 'latin' subset
const inter = Inter({ subsets: ['latin'] });

// Metadata for the application
export const metadata = {
  title: 'Heather & Adams wedding website',
  description: 'RSVP and info site for wedding of Heather & Adam happening on the 31st October 2026',
};

// Root layout component for the application
export default function RootLayout({ children }: { children: React.ReactNode }) {
  // console.log(navigator.language);

  return (
    <html lang="en">
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
            <SearchContextProvider>
              {children}
            </SearchContextProvider>
          </NextIntlClientProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
