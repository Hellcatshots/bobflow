# BobFlow: Technical Architecture Overview

## 1. Overall Architecture

**BobFlow** is a single-page React application built with modern web technologies:

**Tech Stack:**
- **Frontend:** React 19.2.5 with TypeScript 6.0.2
- **Routing:** React Router DOM 7.14.2
- **Styling:** Tailwind CSS 4.2.4 with Vite plugin
- **Icons:** Lucide React 1.14.0
- **Build:** Vite 8.0.10
- **Testing:** Vitest 4.1.5 + Testing Library

## 2. Main Application Flow

User journey: Landing page → New Ticket form → Package generation (1.5s simulation) → Package view with 9 tabs. The [`Layout`](src/components/Layout.tsx:1) component provides sidebar navigation with saved packages list that updates in real-time via custom events.

## 3. Important React Components

- **[`Layout.tsx`](src/components/Layout.tsx:1)** - Application shell with sidebar, navigation, and real-time package list updates
- **[`NewTicket.tsx`](src/pages/NewTicket.tsx:1)** - Form for creating implementation packages with controlled state
- **[`PackageView.tsx`](src/pages/PackageView.tsx:1)** - Tabbed interface displaying 9 generated sections
- **[`Tracker.tsx`](src/pages/Tracker.tsx:1)** - Interactive hackathon submission checklist with progress tracking
- **[`DemoScript.tsx`](src/pages/DemoScript.tsx:1)** - Pre-written 3-minute pitch script with copy functionality

## 4. Important TypeScript Types

**[`TicketPackage`](src/lib/storage.ts:1-19)** - Core data structure containing user inputs (title, story, criteria, stack, complexity) and 9 generated sections (summary, plan, fileTree, apiContract, starterCode, tests, docs, cicd, bobPlan)

**[`TrackerState`](src/lib/storage.ts:40-46)** - Boolean flags tracking hackathon submission checklist completion

## 5. Implementation Package Generation

**Location:** [`NewTicket.tsx`](src/pages/NewTicket.tsx:22-51) [`handleGenerate`](src/pages/NewTicket.tsx:22) function

**Process:** Form submission → 1.5s simulated AI processing → Creates [`TicketPackage`](src/pages/NewTicket.tsx:30) with 9 mocked sections → Saves via [`savePackage()`](src/pages/NewTicket.tsx:46) → Dispatches `bobflow-packages-updated` event → Navigates to package view

## 6. localStorage Usage

**Storage Module:** [`src/lib/storage.ts`](src/lib/storage.ts:1)

- **Package Storage** (key: `bobflow_packages`): [`savePackage()`](src/lib/storage.ts:23-27), [`getPackages()`](src/lib/storage.ts:29-32), [`getPackageById()`](src/lib/storage.ts:34-36)
- **Tracker Storage** (key: `bobflow_tracker`): [`saveTrackerState()`](src/lib/storage.ts:48-50), [`getTrackerState()`](src/lib/storage.ts:52-62)
- **Real-time Updates:** [`Layout.tsx`](src/components/Layout.tsx:11-20) listens for storage events and custom `bobflow-packages-updated` events

## 7. Hackathon Theme: "Turn idea into impact faster"

**BobFlow demonstrates speed acceleration:**
- Reduces setup time from hours to seconds
- Generates 9 comprehensive artifacts per ticket (plan, file tree, API contracts, starter code, tests, docs, CI/CD, Bob usage plan)
- Eliminates "blank slate" paralysis with structured planning
- Enables immediate focus on business logic instead of boilerplate

**IBM Bob Integration:**
- Bob Usage Plan tab shows how to leverage Bob for each feature
- Evidence Tracker ensures hackathon compliance
- Demo Script articulates Bob's value proposition
- Project itself was built using Bob (documented in [`README.md`](README.md:69-74))

**Impact:** Transforms vague tickets into implementation-ready packages instantly, showcasing Bob's practical developer productivity value.