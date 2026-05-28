import type { Metadata } from 'next';
import './globals.css';
import { PixelScript } from '@/lib/pixel';

export const metadata: Metadata = {
  title: 'Numo — Your AI calorie coach by Inspiration Tech',
  description: 'Get your personalised nutrition plan. Scan meals, hit your goals.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className="min-h-screen bg-bg text-ink">
        <PixelScript />
        {children}
      </body>
    </html>
  );
}
