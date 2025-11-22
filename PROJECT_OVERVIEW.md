# InfluencerConnect Project Overview

## What is InfluencerConnect?

A two-sided marketplace connecting **brands** with **influencers/creators**. Key differentiator: **Privacy-first** approach where creator contact details are hidden until brands spend credits to unlock them.

---

## Tech Stack

- **Frontend**: React + Vite + JavaScript + Tailwind CSS + Zustand
- **Backend**: Node.js + Express + MongoDB
- **No TypeScript, no real auth (dummy only)**

---

## Core Features

### Brand Side
- Search/filter creators by platform, niche, followers, engagement, location
- View anonymous analytics before unlocking contact
- Spend credits to unlock email/phone
- Track profile views

### Creator Side
- Dashboard with platform analytics (Instagram, YouTube, TikTok)
- See which brands viewed your profile
- Boost visibility (appear first in searches)
- Tier system (Rising, Growth, Established)

---

## Pages

1. **Landing Page** - Hero, features, CTA buttons
2. **Auth Page** - Login/Signup with role toggle (Brand/Creator)
3. **Brand Dashboard** - Credits, unlocked creators
4. **Brand Discovery** - Search creators with filters
5. **Creator Dashboard** - Analytics, profile views, boost option
6. **Creator Profile** - Public profile with unlock mechanism

---

## How It Works

### For Brands:
1. Sign up and get 10 free credits
2. Search for creators using filters
3. View analytics (anonymous)
4. Spend 1 credit to unlock contact (email + phone)
5. Contact remains unlocked forever for that brand

### For Creators:
1. Sign up and create profile
2. Add platform stats (followers, engagement)
3. View who's checking your profile
4. Boost profile to appear at top of searches

---

## Database Models

### Creator
- name, email, phone, niche, location, bio
- platforms[] (Instagram, YouTube, TikTok)
- audience (demographics)
- tier, isBoosted, profileViews

### Brand
- name, email, industry, location
- credits (starts with 10)
- unlockedCreators[]

### ProfileView
- brandId, creatorId, viewedAt

### ContactUnlock
- brandId, creatorId, unlockedAt

---

## API Routes

**Auth:**
- POST /api/auth/signup
- POST /api/auth/login

**Creators:**
- GET /api/creators (with filters)
- GET /api/creators/:id
- POST /api/creators/:id/view
- POST /api/creators/:id/boost

**Brands:**
- GET /api/brands/:id
- POST /api/brands/:brandId/unlock/:creatorId

---

## Dummy Features (Not Production)

- ❌ No JWT tokens (localStorage only)
- ❌ No password hashing (plain text)
- ❌ No real payments (just toggle boost flag)
- ❌ No email sending

This is a **prototype/demo** to showcase the concept and UI/UX.

---

## Design Philosophy

1. **Privacy-first**: Contact details hidden by default
2. **Data-driven**: Brands see metrics before committing
3. **Fair visibility**: Micro-influencers can boost for exposure
4. **Simple UX**: Clean Tailwind design, easy navigation

---

## Files Structure

```
backend/
  models/       - Mongoose schemas
  routes/       - Express routes
  seed/         - Sample data + seeding script
  server.js     - Main entry point

client/
  src/
    api/        - API client functions
    components/ - Reusable UI (Button, Card, Modal, etc.)
    pages/      - Route pages
    store/      - Zustand state management
    router.jsx  - React Router setup
```

---

## Getting Started

See [QUICKSTART.md](QUICKSTART.md) for installation instructions.

---

**Questions?** Read the full [README.md](README.md) for detailed docs.
