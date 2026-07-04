import type { Metadata } from 'next';
import Link from 'next/link';
import s from './checklist.module.css';

export const metadata: Metadata = {
  title: '10 FAANG Questions That Fail Non-Natives — InterviewAI',
  description:
    'The 10 most common behavioral and technical interview questions that trip up non-native English-speaking developers. Free checklist by InterviewAI.',
};

const questions = [
  {
    id: 1,
    category: 'Behavioral',
    categoryColor: '#6366f1',
    title: '"Tell me about yourself."',
    why: 'Candidates give a 5-minute monologue or just read their CV aloud. FAANG expects a 90-second "elevator pitch": Past → Present → Future.',
    tip: 'Structure: 1–2 sentences on background, 1–2 on current role/impact, 1 on why this company specifically.',
  },
  {
    id: 2,
    category: 'Behavioral',
    categoryColor: '#6366f1',
    title: '"Tell me about a time you disagreed with your manager."',
    why: 'Non-natives either avoid conflict entirely ("I always agree") or are too blunt. The right answer: stood your ground AND preserved the relationship.',
    tip: 'Use STAR method. Emphasize data-driven reasoning, not personal opinion.',
  },
  {
    id: 3,
    category: 'Behavioral',
    categoryColor: '#6366f1',
    title: '"What is your greatest weakness?"',
    why: '"I work too hard" = automatic rejection. Interviewers spot the deflection instantly.',
    tip: 'Pick a real, non-core weakness. Describe 2–3 concrete steps you are already taking to improve it.',
  },
  {
    id: 4,
    category: 'Behavioral',
    categoryColor: '#6366f1',
    title: '"Describe a time you handled ambiguous / unclear requirements."',
    why: 'Candidates describe the technical solution instead of the decision-making process. FAANG evaluates your ability to ask the right questions and act with incomplete information.',
    tip: 'Focus on HOW you reduced ambiguity: stakeholder questions, prototyping, data gathering.',
  },
  {
    id: 5,
    category: 'Behavioral',
    categoryColor: '#6366f1',
    title: '"Where do you see yourself in 5 years?"',
    why: '"In management" sounds disloyal to an IC role. "I don\'t know" signals no ambition. Either can kill the offer.',
    tip: 'Connect your growth to the company\'s mission. Show you\'ve researched the career ladder.',
  },
  {
    id: 6,
    category: 'System Design',
    categoryColor: '#8b5cf6',
    title: '"Design a URL shortener like bit.ly."',
    why: 'Candidates jump straight to architecture. FAANG expects: clarifying questions → estimation → high-level design → deep dive. Non-natives often skip Step 1 due to the language barrier.',
    tip: 'Spend 5 minutes on requirements. Ask: read-heavy or write-heavy? QPS? Latency SLA? Custom aliases?',
  },
  {
    id: 7,
    category: 'Frontend',
    categoryColor: '#0ea5e9',
    title: '"How does the browser render a webpage?"',
    why: 'Surface answer: "loads HTML, CSS, JS." That\'s not enough. The follow-up will expose your depth.',
    tip: 'Cover the Critical Rendering Path: HTML parsing → DOM → CSSOM → Render Tree → Layout → Paint → Composite. Mention reflow vs repaint.',
  },
  {
    id: 8,
    category: 'CS Fundamentals',
    categoryColor: '#10b981',
    title: '"Explain the difference between a process and a thread."',
    why: 'Candidates know the textbook answer but freeze on follow-ups: "How does Node.js handle concurrent requests if it\'s single-threaded?"',
    tip: 'Know the event loop. Know when Go goroutines, Python GIL, or Java threads come up. Prepare one concrete example.',
  },
  {
    id: 9,
    category: 'Backend / DB',
    categoryColor: '#f59e0b',
    title: '"How would you optimize a slow SQL query?"',
    why: 'First answer is always "add an index." The interviewer immediately asks: "When does an index NOT help?" — and most candidates go silent.',
    tip: 'Know: query plan (EXPLAIN), N+1 problem, covering index, partial index, denormalization, caching layers.',
  },
  {
    id: 10,
    category: 'Incident Mgmt',
    categoryColor: '#ef4444',
    title: '"You have a bug in production affecting 10% of users. What do you do?"',
    why: 'Non-natives focus on the technical fix and forget stakeholder communication. FAANG evaluates the full loop.',
    tip: 'Structure: Detect → Mitigate (rollback/feature flag) → Communicate (status page, Slack) → Root Cause → Post-mortem.',
  },
];

export default function ChecklistPage() {
  return (
    <div className={s.page}>
      <div className={s.wrapper}>

        {/* NAV */}
        <nav className={s.nav}>
          <Link href="/" className={s.logo}>InterviewAI</Link>
          <Link href="/#waitlist" className={s.ctaBtn}>🚀 Join Waitlist — Free</Link>
        </nav>

        {/* HERO */}
        <header className={s.hero}>
          <div className={s.eyebrow}>🎯 Free Checklist</div>
          <h1 className={s.h1}>
            10 FAANG Questions<br />
            <span className={s.grad}>That Fail Non-Natives</span>
          </h1>
          <p className={s.sub}>
            These questions look simple — but they hide traps that trip up even
            Senior engineers with 5+ years of experience. Here is exactly why
            they fail, and what a great answer looks like.
          </p>
          <div className={s.meta}>
            <span>✅ Behavioral rounds</span>
            <span>✅ System Design</span>
            <span>✅ Technical deep-dives</span>
          </div>
        </header>

        {/* QUESTIONS */}
        <section className={s.questions}>
          {questions.map((q) => (
            <div key={q.id} className={s.card}>
              <div className={s.cardHeader}>
                <span className={s.number}>#{q.id}</span>
                <span
                  className={s.category}
                  style={{ color: q.categoryColor, borderColor: q.categoryColor + '40', background: q.categoryColor + '15' }}
                >
                  {q.category}
                </span>
              </div>
              <h2 className={s.question}>{q.title}</h2>
              <div className={s.block}>
                <div className={s.blockLabel}>🚨 Why it fails non-natives</div>
                <p className={s.blockText}>{q.why}</p>
              </div>
              <div className={s.block}>
                <div className={s.blockLabel}>💡 What great looks like</div>
                <p className={s.blockText}>{q.tip}</p>
              </div>
            </div>
          ))}
        </section>

        {/* BOTTOM CTA */}
        <section className={s.cta}>
          <div className={s.ctaBox}>
            <div className={s.ctaIcon}>🎤</div>
            <h2 className={s.ctaTitle}>
              Reading about it is not the same as doing it.
            </h2>
            <p className={s.ctaText}>
              Practice answering these questions out loud — with an AI that
              pushes back, interrupts, and gives honest feedback. Zero judgment.
              Anytime.
            </p>
            <Link href="/#waitlist" className={s.ctaBtn} style={{ fontSize: '1.1rem', padding: '16px 40px' }}>
              🚀 Practice with InterviewAI — It&apos;s Free
            </Link>
          </div>
        </section>

      </div>

      <footer className={s.footer}>
        <div className={s.wrapper}>
          © 2025 InterviewAI · <Link href="/" className={s.footerLink}>Back to homepage</Link>
        </div>
      </footer>
    </div>
  );
}
