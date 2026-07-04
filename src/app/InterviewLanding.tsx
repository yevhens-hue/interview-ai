'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { joinWaitlist, type WaitlistFormData } from '@/app/actions';
import s from '@/app/landing.module.css';

/* ── Validation schema (mirrors server-side) ── */
const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  eng_level: z.enum(['B1 – Intermediate', 'B2 – Upper Intermediate', 'C1 – Advanced'] as const, {
    error: () => 'Please select your English level',
  }),
  target_co: z.enum(['FAANG / Big Tech', 'EU Startup', 'Remote US Startup', 'Other'] as const, {
    error: () => 'Please select a target company type',
  }),
});

/* ── Animation variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' as const },
  }),
};

export default function InterviewLanding() {
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<WaitlistFormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: WaitlistFormData) => {
    setServerError(null);
    const result = await joinWaitlist(data);
    if (result.success) {
      setSuccess(true);
    } else {
      setServerError(result.error ?? 'Something went wrong.');
    }
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className={s.page}>
      <div className={s.wrapper}>

        {/* ── NAV ── */}
        <nav className={s.nav}>
          <div className={s.logo}>InterviewAI</div>
          <div className={s.badge}>
            <div className={s.badgeDot} />
            Early Access Open
          </div>
        </nav>

        {/* ── HERO ── */}
        <section className={s.hero}>
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
            <div className={s.eyebrow}>🎯 For non-native software engineers</div>
          </motion.div>

          <motion.h1 className={s.h1} custom={1} variants={fadeUp} initial="hidden" animate="visible">
            Stop losing offers because of your{' '}
            <span className={s.grad}>accent&nbsp;&amp;&nbsp;nerves.</span>
          </motion.h1>

          <motion.p className={s.heroSub} custom={2} variants={fadeUp} initial="hidden" animate="visible">
            Practice real FAANG-style interviews with an AI that interrupts you,
            pushes back on your answers, and gives brutally honest feedback —
            anytime, zero judgment.
          </motion.p>

          {/* ── WAITLIST FORM ── */}
          <motion.div
            ref={formRef}
            id="waitlist"
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className={s.formWrap}
          >
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  className={s.successBox}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className={s.successIcon}>🎉</div>
                  <h3 className={s.successTitle}>You&apos;re on the list!</h3>
                  <p className={s.successText}>
                    As promised, here is your free checklist. We&apos;ll reach out soon with early access details!
                  </p>
                  <a
                    href="https://docs.google.com/document/d/1ZlTytrOCvKTCNWM5UXIbzCzDR5qtDFaLliPfs4EBSUo/edit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={s.submitBtn}
                    style={{ marginTop: '16px', display: 'inline-block', textDecoration: 'none' }}
                  >
                    📄 Open Checklist
                  </a>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  className={s.formCard}
                  onSubmit={handleSubmit(onSubmit)}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                >
                  <h2 className={s.formTitle}>🚀 Get Early Access — Free</h2>
                  <p className={s.formSubtitle}>
                    Join the waitlist to get our free checklist: &quot;10 FAANG Questions That Fail Non-Natives&quot;
                  </p>

                  {/* Name */}
                  <div>
                    <input
                      {...register('name')}
                      type="text"
                      placeholder="Your name"
                      aria-label="Your name"
                      className={`${s.input} ${errors.name ? s.inputError : ''}`}
                    />
                    {errors.name && <p className={s.fieldError}>{errors.name.message}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="Work email (required)"
                      aria-label="Work email"
                      className={`${s.input} ${errors.email ? s.inputError : ''}`}
                    />
                    {errors.email && <p className={s.fieldError}>{errors.email.message}</p>}
                  </div>

                  {/* English Level */}
                  <div>
                    <select
                      {...register('eng_level')}
                      aria-label="English level"
                      className={`${s.select} ${errors.eng_level ? s.inputError : ''}`}
                      defaultValue=""
                    >
                      <option value="" disabled>Your English level</option>
                      <option>B1 – Intermediate</option>
                      <option>B2 – Upper Intermediate</option>
                      <option>C1 – Advanced</option>
                    </select>
                    {errors.eng_level && <p className={s.fieldError}>{errors.eng_level.message}</p>}
                  </div>

                  {/* Target Company */}
                  <div>
                    <select
                      {...register('target_co')}
                      aria-label="Target company type"
                      className={`${s.select} ${errors.target_co ? s.inputError : ''}`}
                      defaultValue=""
                    >
                      <option value="" disabled>Target company type</option>
                      <option>FAANG / Big Tech</option>
                      <option>EU Startup</option>
                      <option>Remote US Startup</option>
                      <option>Other</option>
                    </select>
                    {errors.target_co && <p className={s.fieldError}>{errors.target_co.message}</p>}
                  </div>

                  {/* Server error */}
                  {serverError && <p className={s.serverError}>{serverError}</p>}

                  <button
                    type="submit"
                    className={s.submitBtn}
                    disabled={isSubmitting}
                    aria-label="Join waitlist"
                  >
                    {isSubmitting ? '⏳ Joining...' : '🎤 Reserve My Spot'}
                  </button>
                  <p className={s.formHint}>No credit card · Takes 30 seconds</p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* ── PROOF STRIP ── */}
        <motion.div
          className={s.proofStrip}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {[
            { stat: '340+', label: 'engineers on waitlist' },
            { stat: '<300ms', label: 'AI voice latency' },
            { stat: '10x', label: 'cheaper than tutors' },
            { stat: '24/7', label: 'available, no scheduling' },
          ].map(({ stat, label }) => (
            <div key={label} className={s.proofItem}>
              <strong>{stat}</strong> {label}
            </div>
          ))}
        </motion.div>

        {/* ── WHY NOW ── */}
        <section style={{ marginBottom: '80px' }}>
          <p className={s.sectionLabel}>Why now, not a year ago</p>
          <h2 className={s.sectionH2}>
            The tech finally caught up<br />to the real problem
          </h2>
          <div className={s.cardsGrid}>
            {[
              {
                icon: '🎙️',
                iconClass: s.iconBlue,
                tagClass: s.tagBlue,
                tag: 'Technology · 2025',
                title: 'Voice AI with <300ms latency',
                text: 'A year ago AI voice models had 3–5 second delays. That destroyed any sense of real conversation. GPT-4o Realtime API changed everything — now the AI feels like an actual recruiter in the room.',
              },
              {
                icon: '📈',
                iconClass: s.iconPurple,
                tagClass: s.tagPurple,
                tag: 'Market · 2025',
                title: 'Remote hiring at an all-time high',
                text: 'Post-2024 recovery pushed global remote tech hiring up 40%. Eastern European and LATAM engineers now compete directly for $80–150k roles. The language gap is the #1 blocker between them and the offer.',
              },
              {
                icon: '💡',
                iconClass: s.iconGreen,
                tagClass: s.tagGreen,
                tag: 'Psychology · Proven',
                title: 'Zero shame = 3x more practice',
                text: 'Research shows engineers practice 3x more with AI than with human coaches because there\'s no social judgment. More reps = faster improvement. It\'s the gym, not the competition.',
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                className={s.card}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
              >
                <div className={`${s.cardIcon} ${card.iconClass}`}>{card.icon}</div>
                <span className={`${s.cardTag} ${card.tagClass}`}>{card.tag}</span>
                <h3 className={s.cardH3}>{card.title}</h3>
                <p className={s.cardP}>{card.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section>
          <p className={s.sectionLabel}>Early beta testers</p>
          <h2 className={s.sectionH2}>What engineers who tried it said</h2>
          <div className={s.testiGrid}>
            {[
              {
                stars: '★★★★★',
                text: '"I failed 3 behavioral rounds in a row because I kept blanking under pressure. After 2 weeks with InterviewAI, I got an offer from Revolut. The AI kept interrupting me on purpose — brutal and exactly what I needed."',
                initial: 'D',
                name: 'Dmytro K.',
                role: 'Senior Frontend Eng · Kyiv → London',
                avClass: s.av1,
              },
              {
                stars: '★★★★★',
                text: '"I was spending $80/session on ADPList mentors and still felt embarrassed about my accent. With InterviewAI I practiced every evening for free. No shame, just reps. Landed a remote job in Berlin."',
                initial: 'A',
                name: 'Ana M.',
                role: 'Backend Engineer · Bucharest → Berlin',
                avClass: s.av2,
              },
              {
                stars: '★★★★★',
                text: '"The system design round felt scarily real. The AI asked follow-up questions I didn\'t expect and called out my vague answers. It\'s like having a staff engineer grilling you at 2am — without judgment."',
                initial: 'R',
                name: 'Ricardo S.',
                role: 'Staff Engineer · São Paulo → Remote US',
                avClass: s.av3,
              },
            ].map((t, i) => (
              <motion.div
                key={t.name}
                className={s.testiCard}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
              >
                <div className={s.testiStars}>{t.stars}</div>
                <p className={s.testiText}>{t.text}</p>
                <div className={s.testiAuthor}>
                  <div className={`${s.avatar} ${t.avClass}`}>{t.initial}</div>
                  <div>
                    <div className={s.authorName}>{t.name}</div>
                    <div className={s.authorRole}>{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── BOTTOM CTA ── */}
        <section className={s.bottomCta}>
          <h2>
            Your next interview could be<br />
            <span className={s.grad}>the one that changes everything.</span>
          </h2>
          <p>Join 340+ engineers already on the waitlist. Early access is free.</p>
          <button className={s.scrollBtn} onClick={scrollToForm} aria-label="Scroll to waitlist form">
            🚀 Join the Waitlist — It&apos;s Free
          </button>
        </section>

      </div>

      {/* ── FOOTER ── */}
      <footer className={s.footer}>
        <div className={s.wrapper}>
          © 2025 InterviewAI. Built for engineers who refuse to let language stand in the way.
        </div>
      </footer>
    </div>
  );
}
