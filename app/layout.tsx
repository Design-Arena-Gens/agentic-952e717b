import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mumbai Local News ? Insta-ready',
  description: 'Latest verified Mumbai city news summarized and styled for Instagram.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
