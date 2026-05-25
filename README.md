# Numo Web — Marketing Funnel

Web landing + onboarding + paywall for the Meta ad campaign.
User pays ₹1 here, then is redirected to the Play Store to install the app.
On app install + login with the same phone number, they get the unlocked home directly.

## Stack
- Next.js 14 (App Router) + TypeScript + Tailwind
- Firebase Web SDK (phone OTP with invisible reCAPTCHA)
- Razorpay Web Checkout
- Meta Pixel + (server-side) Conversions API

## Setup

1. Copy `.env.example` → `.env.local` and fill in:
   - **Firebase Web config**: Firebase Console → Project Settings → Add app → Web → register → copy config object
   - **Meta Pixel ID**: Events Manager → Dataset → Settings → Pixel ID

2. Install + run:
   ```bash
   npm install
   npm run dev
   ```
   Opens on http://localhost:3001

3. Firebase: add the deployed domain to **Authorized Domains** (Auth → Settings)

## Flow
1. `/` — Landing → CTA "Get my free plan"
2. `/onboarding/{goal,gender,age,...}` — 14-step questionnaire (mirrors the app)
3. `/plan` — Reveal screen with blurred numbers + ₹1 paywall card
4. `/checkout/phone` → `/checkout/otp` — Firebase phone auth
5. `/checkout/pay` — Razorpay modal (creates order, verifies on success)
6. `/success` — Play Store CTA + Pixel `Purchase` event fires

The backend (`numo/backend`) is shared between this web app and the native Android app.
Same `/auth/firebase-phone`, `/subscription/trial/checkout`, `/subscription/trial/verify` endpoints.
A new `/onboarding` endpoint persists the questionnaire so the app skips it on install.

## Deploy

### Railway (recommended)
Create a new service in the same Railway project as `numo-backend`. Connect this folder
(or the `numo` monorepo with root path `numo/web`).
Set env vars from `.env.example`.

### Custom domain
Add it in Railway → service → Settings → Domains → CNAME at registrar.
Also add it under Firebase **Authorized Domains**.
