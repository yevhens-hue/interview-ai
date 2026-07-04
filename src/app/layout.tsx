import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';

export const metadata: Metadata = {
  title: 'InterviewAI',
  description: 'AI-powered mock interviews for non-native software engineers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <GoogleAnalytics gaId="G-F2XK03JKG1" />
      </body>
    </html>
  );
}
