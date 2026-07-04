import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
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
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
