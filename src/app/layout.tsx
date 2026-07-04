import type { Metadata } from 'next';
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
      <body>{children}</body>
    </html>
  );
}
