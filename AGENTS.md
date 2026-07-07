<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# News ThinkFLOW — Project Status

## Goal
Platformă agregare știri tech cu 8 categorii, backend Python pipeline, frontend Next.js 16.2.10. Deploy pe Vercel.

## Domain
news.thinkflow.ro → Vercel, live.

## Progress

### Done
- Backend: toate parser-ele (RSS, Reddit, GitHub trending, GitHub releases, HN) acceptă `source_category` din YAML
- `fetch_all()` actualizat să treacă `src.get("category")` la fiecare parser
- `news_sources.yaml` — toate categoriile actualizate la cele 8 noi: trending, community, open_source, releases, ai_labs, research, newsletters, industry
- `category_boost` actualizat cu noile categorii
- Frontend types.ts — 8 categorii cu label-uri, culori, iconițe
- NewsFilter.tsx — 8 tab-uri cu lucide-react icons (Flame, MessageCircle, GitGraph, Rocket, FlaskRound, BookOpen, Newspaper, Building2)
- SourceBadge.tsx — iconițe per categorie + clasa `.source-*`
- NewsCard.tsx — score icons + fallback letters actualizate
- category/[type]/page.tsx — 8 categorii valide
- sitemap.ts — 8 categorii în sitemap
- globals.css — gradient + source classes pentru toate
- Date istorice migrate (iulie 2026) + pipeline re-rulat
- Deploy: GitHub → Vercel auto-deploy, live la news.thinkflow.ro

### In Progress
- (none)

### Blocked
- Cron pipeline news (Task Scheduler Windows) — neactivat

### Next Steps
1. Activează cron pipeline (Task Scheduler)
2. Adaugă link către thinkflow.ro în header

## Relevant Files
- `M:\thinkflow\openclaw\scripts\news_aggregator.py` — Parser-ele actualizate cu `source_category`
- `M:\thinkflow\openclaw\config\news_sources.yaml` — Config final cu 8 categorii
- `M:\thinkflow\openclaw\scripts\news_pipeline.py` — Orchestrator 6 pași
- `src/lib/types.ts` — 8 categorii cu culori + iconițe
- `src/components/NewsFilter.tsx` — 8 tab-uri
- `src/components/SourceBadge.tsx` — Iconițe per categorie
- `src/app/globals.css` — Clase gradient + source
