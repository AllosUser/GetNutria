# GetNutria Product Overview

Audience: partners, internal team members, and non-technical stakeholders.

## Executive Summary

GetNutria is a nutrition practice management platform for dietitians and nutrition clinics. It combines a staff web app, a client web portal, and a client mobile app. The product helps practitioners manage clients, build diet plans, import body composition reports, track progress, schedule appointments, and communicate with clients.

## Problem Statement

Nutrition practices often rely on separate tools for client records, body composition reports, spreadsheets, diet templates, messaging, appointments, and email. This creates duplicate data entry, lost context, slow follow-up, and inconsistent client experience.

## Target Users

| User | Need |
|------|------|
| Nutritionist or dietitian | Manage clients, build plans, review progress, and follow up. |
| Client or patient | View the plan, understand progress, and message the practitioner. |
| Platform owner/admin | Monitor operations, AI usage, staff access, imports, and settings. |

## Main Product Value

GetNutria centralizes nutrition practice workflows. Its strongest value is reducing manual admin work, especially around measurement imports and repeatable diet planning, while giving clients a clear portal and mobile companion.

## Core Modules

- Client CRM and profile management.
- Client invites and account activation.
- Diet templates and client diet plans.
- Food library with system foods and nutritionist overrides.
- Recipe library with ingredients, steps, images, and AI image generation.
- Measurements with charts and progress views.
- CSV/PDF imports, OCR, and AI PDF parsing.
- Messaging and unread counts.
- Appointments, recurring series, blocked time, details emails, and reminders.
- Staff profile, preferences, themes, avatar, and business logo.
- Admin AI usage tracking.
- Client mobile app for dashboard, diet, messages, metrics, profile, and settings.
- Desktop companion work is present in the repo as an offline/read-only direction, with sync APIs under development.

## Nutritionist Journey

1. Log in to the staff web app.
2. Create or open a client profile.
3. Invite the client to GetNutria.
4. Import or add baseline measurements.
5. Create a diet template or reuse an existing template.
6. Assign and customize the client diet plan.
7. Publish the plan and optionally export a PDF.
8. Message the client and schedule follow-up.
9. Import new measurements and adjust the plan over time.

## Client Journey

1. Accept an invite.
2. Log in on web or mobile.
3. View dashboard, diet plan, recipes, and measurements.
4. Message the nutritionist.
5. View appointments on web.
6. Update mobile profile/goals and sign out from settings.

## Admin Journey

1. Log in as admin.
2. Review all clients and platform activity.
3. Create nutritionist accounts.
4. Monitor email delivery logs.
5. Review AI usage, costs, logs, and quotas.
6. Help troubleshoot imports, reminders, and production configuration.

## Differentiators

Implemented today:

- Body composition import pipeline with CSV, PDF text, OCR, and AI paths.
- Integrated client diet planning with templates, foods, recipes, and published client plans.
- Client mobile app connected to the same backend.
- Admin AI usage tracking instead of unobserved AI calls.
- Appointment workflows with reminders and blocked time.

Future opportunity:

- Multi-clinic tenancy and white-label branding.
- Push notifications.
- More integrations with calendars, payment, labs, devices, and EHR/CRM systems.
- Advanced analytics and cohort reporting.

## AI Automation Value

AI is used where manual work is high-friction:

- PDF body composition extraction when static parsers are not enough.
- Recipe image generation.
- Progress forecast and copilot-style summaries where enabled.

Admin usage logs and cost utilities help keep this honest and observable.

## Mobile App Value

The mobile app gives clients a simpler daily touchpoint than the staff web app. It supports login, invite acceptance, dashboard, diet view, messages, metrics, profile editing, theme settings, and sign out.

Partial: mobile does not currently expose a dedicated appointments tab or full client settings parity.

## Current Maturity

GetNutria is more than a prototype. 
The repo includes real domain models, role-based access, staff and client UI, mobile integration, imports, AI, email, appointments, 
and tests. 
It is still a product in active development, with some workflows Partial and some operational setup dependent on external services.

## Known Limitations And Improvement Opportunities

- No explicit organization or clinic tenant model in Prisma yet.
- Mobile appointments and push notifications are not implemented.
- Client web settings are limited.
- Analytics route exists but is not a main navigation item.
- Desktop/offline mode is a companion direction, not a full offline replacement.
- Some AI features depend on environment variables and service availability.
- Admin nutritionist management is functional but not a full staff lifecycle console.

## Suggested Roadmap

| Horizon | Suggested Work |
|---------|----------------|
| Quick wins | Navigation consistency, client help copy, import error UX, appointment terminology cleanup. |
| Short term | Mobile appointments, push notifications, stronger admin staff controls, better client settings. |
| Medium term | Organization/clinic tenancy, billing, white-label theme domains, calendar integrations. |
| Long term | Advanced analytics, device/lab integrations, offline desktop write sync, marketplace-ready SaaS packaging. |
