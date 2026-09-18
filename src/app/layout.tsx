import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@/lib/store';
import { AppShell } from '@/components/layout/app-shell';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Adviser's Toolkit Pro v6 - Grade 7 ROSAL (KNCHS)",
  description: 'Department of Education School Forms & Academic Tracking System for Koronadal National Comprehensive High School',
  icons: {
    icon: '/assets/image55.png',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <AppShell>
            {children}
          </AppShell>
        </StoreProvider>
      </body>
    </html>
  );
}
