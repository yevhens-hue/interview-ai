# InterviewAI

> AI-powered mock interviews for non-native software engineers.

**Status:** MVP landing page ready, pending GitHub + Supabase + Vercel setup.

## Quick Start

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Stack

- **Next.js 15** (App Router, TypeScript)
- **Supabase** (waitlist storage)
- **CSS Modules** (zero Tailwind, scoped styles)
- **Framer Motion** (animations)
- **React Hook Form + Zod v4** (form validation)

## Setup

### 1. Environment variables
```bash
cp .env.local.example .env.local
# Fill in your Supabase credentials
```

### 2. Supabase migration
Run `supabase/migrations/20250704_interview_waitlist.sql` in Supabase Dashboard → SQL Editor.

### 3. Deploy
Connect GitHub repo to Vercel. Add env vars. Deploy.

## Project context
See [PROJECT_MEMORY.md](./PROJECT_MEMORY.md) for full product context, ICP, and decision history.
