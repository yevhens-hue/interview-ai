import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import InterviewLanding from '@/app/InterviewLanding';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'InterviewAI — Ace Your Tech Interview in English',
  description:
    'AI-powered mock interviews for non-native software engineers. Practice behavioral and system design rounds with real-time voice feedback. Get the offer you deserve.',
  openGraph: {
    title: 'InterviewAI — Ace Your Tech Interview in English',
    description:
      'Stop losing offers because of your accent & nerves. Practice real FAANG-style interviews with an AI that gives brutally honest feedback.',
    type: 'website',
  },
};

export default function Home() {
  return (
    <main className={inter.variable}>
      <InterviewLanding />
    </main>
  );
}
