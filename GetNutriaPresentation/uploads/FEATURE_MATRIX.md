# GetNutria Feature Matrix

Audience: internal team.

Legend: **Y** = implemented primary path; **Partial** = implemented but scoped, limited, or not fully surfaced; **-** = not applicable or not implemented.

| Feature | Admin | Nutritionist | Client Web | Client Mobile | Evidence / Notes |
|---------|-------|--------------|------------|---------------|------------------|
| Web login | Y | Y | Y | - | `/login`, NextAuth credentials. |
| Mobile login | - | - | - | Y | `/api/auth/mobile/login`, client role only. |
| Password reset | Y | Y | Y | Partial | Web flow exists; mobile can use web reset outside app. |
| Accept invite | - | - | Y | Y | `/accept-invite`, mobile `AcceptInviteScreen`, `/api/auth/client-invite/accept`. |
| Dashboard | Y | Y | Y | Y | `/app`, mobile Dashboard. |
| Client CRM | Y | Y | - | - | `/app/clients`; nutritionists scoped to assigned clients. |
| Client profile self-edit | - | - | Partial | Y | Mobile Profile uses `/api/me/profile`; client web settings limited. |
| Send/revoke client invites | Y | Y | - | - | `/api/clients/[clientId]/invite`, revoke route. |
| Full client visibility | Y | - | - | - | Admin routes bypass some assignment filters. |
| Diet templates | Y | Y | - | - | `/app/diet-templates`, server actions. |
| Assign template to client | Y | Y | - | - | `assign-diet` components/actions. |
| Client diet editor | Y | Y | - | - | `/app/clients/[id]/diet`. |
| Client diet viewer | - | - | Y | Y | `/app/diet`, `/api/me/diet`, mobile Diet. |
| PDF diet export | Y | Y | - | - | `/api/clients/[clientId]/diet/export-pdf`. |
| Time-based plans | Partial | Partial | Partial | Partial | Data fields/components exist; workflow needs QA. |
| Food library | Y | Y | - | - | `/app/foods`, `FoodItem`, `FoodOverride`. |
| Recipe library | Y | Y | - | - | `/app/recipes`, recipe actions. |
| Recipe image upload | Y | Y | - | - | `/api/recipes/upload-image`, Supabase. |
| AI recipe images | Y | Y | - | - | `src/app/app/recipes/actions.ts`, OpenAI image usage. |
| Measurements view | Y | Y | Y | Y | `/app/measurements`, `/api/me/measurements`, mobile Metrics. |
| Manual measurement entry | Y | Y | - | - | Staff measurement actions/modal. |
| Measurement CSV import | Y | Y | - | - | `/app/imports`, parser registry. |
| PDF text/OCR import | Y | Y | - | - | `pdf-text.ts`, `pdf-ocr.ts`, upload route. |
| AI PDF import | Y | Y | - | - | `pdf-ai.ts`, OpenAI, `AiUsageLog`. |
| Measurement export | Y | Y | Partial | - | `/api/measurements/export`, staff-oriented. |
| Charts/progress | Y | Y | Y | Y | Recharts components and mobile metrics. |
| Messaging | Y | Y | Y | Y | `/app/messages`, mobile Messages, `/api/messages/*`. |
| Broadcast messaging | Y | Y | - | - | `/api/messages/broadcast`; nutritionists scoped. |
| Unread counts | Y | Y | Y | Y | `/api/messages/unread-count`. |
| Appointments | Y | Y | Y | - | `/app/appointments`; mobile app has no appointments tab. |
| Appointment requests | Y | Y | Y | - | `/api/appointment-requests/*`; client web support. |
| Blocked time | Y | Y | - | - | `/api/blocked-times/*`, appointment UI. |
| Appointment reminders | Y | Y | Receives | - | Reminder API, email templates, logs. |
| Staff settings/profile | Y | Y | - | - | `/app/settings`, role guard Admin/Nutritionist. |
| Client settings/profile | - | - | Partial | Y | Mobile Profile/Settings; web client settings limited. |
| Theme/appearance | Y | Y | Partial | Y | Web appearance provider and mobile ThemeContext. |
| Business logo/avatar upload | Y | Y | - | - | `/api/settings/upload-image`, `User.businessLogoUrl`. |
| Nutritionist account creation | Y | - | - | - | Admin settings creates nutritionists. |
| Email delivery logs | Y | - | - | - | Admin settings reads `AuditLog`. |
| AI usage admin console | Y | - | - | - | `/app/ai-usage`, `AiUsageLog`. |
| Sync/desktop companion | Partial | Partial | - | - | `desktop/`, `/api/sync/*`; not full offline write sync. |
| Multi-clinic tenancy | - | - | - | - | No `Organization`/`Clinic` model yet. |
| Billing/subscriptions | - | - | - | - | Not present in repo. |
| Push notifications | - | - | - | - | Not present in mobile/web. |

## Role Summary

- Admin: platform operator with broad visibility and AI/email/staff oversight.
- Nutritionist: practitioner scoped primarily by assigned clients.
- Client web: portal for own plan, measurements, messages, and appointments.
- Client mobile: daily companion for dashboard, diet, messages, metrics, profile, and settings.
