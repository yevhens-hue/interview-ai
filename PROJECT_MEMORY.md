# PROJECT_MEMORY.md — InterviewAI

## Статус проекта
✅ MVP задеплоен на Vercel. Лендинг живой.

**Vercel URL:** https://interview-ai-nine-murex.vercel.app  
**GitHub:** https://github.com/yevhens-hue/interview-ai  
⏳ **Supabase:** SQL-миграция ещё не запущена вручную!

## Контекст (откуда пришли)
Проект создан как тестовое задание для позиции Product Manager. После AI-скоринга 10 идей (YC-методология) и оценки AI-командой из 5 специалистов, идея **AI Mock Interviewer** была выбрана как победитель.

## Идея (ICP + Problem)
**Проблема:** Senior-разработчики из Восточной Европы/LATAM проваливают технические собеседования в зарубежные компании не из-за нехватки хардскиллов, а из-за языкового барьера, акцента и стресса.

**ICP:** Senior Frontend/Backend Engineer, 28-35 лет, уровень английского B2, ищет удаленную работу в США/ЕС ($80k+). В пятницу в 18:00 сидит и заучивает STAR-ответы перед зеркалом. Платит $50-150/час за менторов на ADPList.

**Why Now:** GPT-4o Realtime API снизил задержку голосового AI с 3-5 сек до <300ms — впервые стало возможным создать реалистичный интерактивный диалог.

**Конкуренты:** Yoodli (нет IT-контекста), Pramp (peer-to-peer, не behavioral). Мы = дешево + без стыда + глубокий IT-контекст.

## Технический стек
- **Framework:** Next.js 15.3.4 (App Router)
- **Language:** TypeScript
- **Styling:** CSS Modules (landing.module.css)
- **Backend:** Supabase (таблица `interview_waitlist`)
- **Validation:** Zod v4 (используй `.issues`, не `.errors`; `error:`, не `errorMap:`)
- **Forms:** React Hook Form + @hookform/resolvers
- **Animations:** Framer Motion
- **Deploy:** Vercel (планируется)

## Ключевые файлы
```
src/
  app/
    page.tsx              — Server Component, SEO metadata
    InterviewLanding.tsx  — Client Component, вся UI-логика
    landing.module.css    — Design system (CSS Modules)
    actions.ts            — Server Action: joinWaitlist()
    globals.css           — Минимальный сброс CSS
  lib/
    supabase-server.ts    — Server-only Supabase client (service_role)
supabase/
  migrations/
    20250704_interview_waitlist.sql  — Таблица + RLS политики
.env.local                — Supabase credentials (не коммитить!)
```

## Критические заметки (Gotchas)

### Zod v4 — Breaking Changes
```typescript
// ❌ Zod v3 (НЕ РАБОТАЕТ в этом проекте)
z.enum(['A', 'B'], { errorMap: () => ({ message: '...' }) })
parsed.error.errors[0]

// ✅ Zod v4 (ПРАВИЛЬНО)
z.enum(['A', 'B'] as const, { error: () => '...' })
parsed.error.issues[0]
```

### Supabase — SQL Migration НЕ запущена
Таблица `interview_waitlist` еще не создана в Supabase! Нужно выполнить:
`supabase/migrations/20250704_interview_waitlist.sql` через Supabase Dashboard → SQL Editor.

### GitHub — репо не создан
Нужно создать репо `yevhens-hue/interview-ai` на github.com и запушить:
```bash
git remote add origin https://github.com/yevhens-hue/interview-ai.git
git push -u origin main
```

### Vercel — не подключен
После создания GitHub репо — подключить через vercel.com/new. Добавить env vars из `.env.local`.

## TODO (следующие шаги)
- [x] Создать GitHub репо `interview-ai` → https://github.com/yevhens-hue/interview-ai
- [ ] Запустить SQL-миграцию в Supabase → https://supabase.com/dashboard/project/kapkqziyceefxluxlvqc/sql/new
- [x] Задеплоить на Vercel → https://interview-ai-nine-murex.vercel.app
- [ ] Подключить кастомный домен (interview-ai.com?)
- [ ] Добавить Posthog аналитику
- [ ] Написать пункт 3 тестового задания (Первый трафик и гипотеза)
- [ ] Написать пункт 4 тестового задания (Авто-ревю)
- [ ] Построить Business Model Canvas

## История решений
1. Скоринг 10 идей по YC-методу (Pain/Market/Feasibility/Pay)
2. AI-команда (Researcher, BA, Marketer, CTO, Engineer) выбрала Mock Interviewer
3. Причина отказа от "Курсовой ставки": юридические риски (эскроу денег пользователей)
4. Причина отказа от "WhatsApp Tutor": перегретый рынок, слабая боль
5. Surge-лендинг (статичный HTML): https://fluenttech-mock-interviews-a1ceb1.surge.sh
6. Выбран отдельный Next.js репо (а не роут внутри Pitch-Avatar) для чистоты
