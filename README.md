# Tandem (Next.js + TypeScript + Tailwind v4)

A multi-role clinical consultation app: a home page where someone chooses to
continue as a **Consultant** or a **Patient**, each landing on its own
dashboard.

## Routes

| Route                    | File                              | Description                                  |
| ------------------------ | ---------------------------------- | --------------------------------------------- |
| `/`                       | `app/page.tsx`                     | Home / role selector                          |
| `/dashboard/consultant`   | `app/dashboard/consultant/page.tsx`| Clinician's live consultation dashboard       |
| `/dashboard/patient`      | `app/dashboard/patient/page.tsx`   | Patient's live consultation dashboard         |

## Structure

```
app/
  layout.tsx                          # root layout, loads globals.css
  globals.css                         # Tailwind v4 theme (@theme tokens) + base styles
  page.tsx                            # home page — "Join as Consultant" / "Join as Patient"
  dashboard/
    consultant/page.tsx               # consultant dashboard — composes components/*
    patient/page.tsx                  # patient dashboard — composes components/patient/*

components/
  Card.tsx                            # base panel surface, used by both dashboards
  Badge.tsx                           # Live / New / Draft / status pill
  TopBanner.tsx                       # scrolling announcement strip (shared)
  AppHeader.tsx                       # logo + "Get a demo" + menu (shared)
  Sidebar.tsx                         # consultant nav + doctor profile footer
  ConsultationHeader.tsx              # consultant: title, live badge, timer, recording/end
  AudioWaveform.tsx                   # static waveform bars (consultant "live" card)
  LiveTranscriptCard.tsx              # consultant: waveform card + transcript
  AudioStatusCard.tsx                 # consultant: latency/packet loss/jitter/bitrate/mic
  AIClinicalNoteCard.tsx              # consultant: SOAP note, regenerate/transfer actions
  ConsultationTimelineCard.tsx        # consultant: chronological event checklist
  Icd10CodesCard.tsx                  # consultant: suggested ICD-10 codes
  ClinicalShortcutsCard.tsx           # consultant: quick action tiles
  AIClinicalAssistantCard.tsx         # consultant: chat-style AI assistant panel

  home/
    RoleOptionCard.tsx                # reusable "Join as X" card on the home page

  patient/
    PatientSidebar.tsx                # patient nav + profile card + settings/help/logout
    PatientConsultationHeader.tsx     # patient: title, live badge, timer, recording/end
    VideoTile.tsx                     # single video call tile (placeholder feed)
    VideoCallPanel.tsx                # both video tiles + controls bar
    CallControlsBar.tsx               # mic / camera / share / chat / more / leave
    TranscriptCard.tsx                # patient: transcript list (no waveform)
    AudioQualityCard.tsx              # patient: per-metric Good/Fair/Poor tags
    ChatPanel.tsx                     # in-call chat with the clinician
    ConsultationSummaryCard.tsx       # AI-generated summary with bolded key terms
    PatientAIClinicalNoteCard.tsx     # patient: SOAP note with thumbs up/down feedback
    DocumentsCard.tsx                 # documents list + "Send to my doctor"

types/
  index.ts                            # shared types (transcript, SOAP note, ICD-10, etc.)
  patient.ts                          # patient-only types (call, chat, documents, summary)

data/
  demoData.ts                         # mock data for the consultant dashboard
  patientDemoData.ts                  # mock data for the patient dashboard
```

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000 — you'll land on the role selector, which
links to `/dashboard/consultant` and `/dashboard/patient`.

## Notes

- **Tailwind v4**: theme tokens (`lime`, `ink`, `bg`, `chip-*`, `live`, etc.)
  are defined in `app/globals.css` via `@theme`, not a `tailwind.config.ts`.
  Custom utility classes are generated straight from those `--color-*`
  variables, so token names stay kebab-case end to end (e.g.
  `--color-chip-blue-bg` → `bg-chip-blue-bg`).
- **Mock data**: `data/demoData.ts` and `data/patientDemoData.ts` are shaped
  exactly like `types/index.ts` / `types/patient.ts` — swap either import for
  a real data source (API route, server fetch, websocket) without touching
  any component.
- **Shared components**: `TopBanner` and `AppHeader` live at the top level of
  `components/` and are imported by both dashboards and the home page. If you
  reorganize either dashboard's components into its own subfolder later,
  keep these two shared or duplicate them per-route — just update the import
  paths accordingly.
- **Video tiles**: `components/patient/VideoTile.tsx` renders a placeholder
  colored panel with initials, not a real stream. Swap in a `<video>` element
  bound to your WebRTC track when the call is wired up for real.
- Interactive components (chat input, nav buttons, call controls) are marked
  `'use client'`; all three `page.tsx` files stay server components that just
  compose everything else.