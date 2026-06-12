# GetNutria Nutritionist User Guide

Audience: nutritionists and dietitians using the staff web app.

## What GetNutria Is

GetNutria is a nutrition practice workspace for managing clients, diet plans, measurements, imports, messages, appointments, recipes, foods, and follow-up work. Nutritionists use the web app. Clients can use the client web portal and the Expo mobile app.

## Login And Dashboard

1. Open the GetNutria web app.
2. Sign in with your email and password at `/login`.
3. After login, the dashboard at `/app` shows practice activity such as client snapshots, progress, next appointments, and shortcuts.
4. Use the left sidebar on desktop. On mobile web, staff use the top menu drawer.

## Managing Clients

Use `/app/clients` to view and manage your client list.

- Admins can see all clients.
- Nutritionists see assigned clients.
- Client records include name, contact details, notes, goals, tags, and profile fields.
- Client diet editing is available from `/app/clients/[id]/diet`.

## Creating Or Editing Client Profiles

1. Go to `/app/clients`.
2. Create a client or open an existing client workflow.
3. Fill in profile details such as name, email, phone, goals, height, activity level, and notes.
4. Save the profile.

Keep contact email accurate if you plan to send an invite.

## Sending Client Invites

1. Open a client record from `/app/clients`.
2. Use the invite action.
3. GetNutria creates a `ClientInviteToken` and sends an invite email when email delivery is configured.
4. The client accepts at `/accept-invite` or through the mobile app activation flow.

Invites expire. If a client cannot accept, revoke and send a new invite.

## Diet Plans

### Assigning And Viewing Diets

- Staff manage client plans at `/app/clients/[id]/diet`.
- Clients view only published plans at `/app/diet` on web or the Diet tab on mobile.
- PDF export is implemented at `/api/clients/[clientId]/diet/export-pdf` and exposed through the diet editor.

### Creating Diet Templates

1. Go to `/app/diet-templates`.
2. Create a template.
3. Add days, meals, foods, recipes, quantities, notes, and meal timing where relevant.
4. Save the template for reuse.

Templates are owned by the staff user who created them.

### Assigning Templates To Clients

1. Open `/app/diet-templates`.
2. Choose a template.
3. Use the assign action and search for a client.
4. GetNutria creates a client-specific `DietPlan` from the template.
5. Review and publish when ready.

### Editing Client Diet Plans

Use `/app/clients/[id]/diet`.

- Add or remove meals.
- Add food items from the food library.
- Add recipes.
- Edit quantities, notes, and macro snapshots.
- Publish the plan when it is ready for the client.

Time-based plans are supported in the data model and editor components through `timeBasedData` and `planKind = "time_based"`, but some workflows are still evolving. Treat this as Partial.

## Food Library

Use `/app/foods`.

- Search foods by name or category.
- Add custom foods.
- Edit your own custom foods.
- For system foods, GetNutria stores per-nutritionist overrides instead of changing the global food record.

## Recipe Library

Use `/app/recipes`.

- Create, edit, archive, and view recipes.
- Add ingredients from foods or manual ingredients.
- Add steps, servings, tags, meal type, notes, and macro overrides.
- Upload recipe images through Supabase storage when configured.
- Generate recipe images with AI when OpenAI and image storage settings are configured.

AI recipe image generation is staff-only and logs usage for admin review.

## Measurements

Use `/app/measurements`.

You can view charts, historical measurement tables, goals, body composition trends, and progress summaries. 
Clients can see their own measurements, while staff access is scoped by role and assignment.

### Adding Manual Measurements

1. Go to `/app/measurements`.
2. Select the client if prompted.
3. Use the add measurement action.
4. Enter measured date and available values, such as weight, body fat, muscle, water, BMI, visceral fat, BMR, phase angle, and notes.
5. Save.

### Importing CSV/PDF Body Composition Files

Use `/app/imports`.

Supported import sources in the schema and parser registry include:

| Source | Use When |
|--------|----------|
| CSV InBody | You have an InBody CSV export. |
| CSV SECA | You have a SECA CSV export. |
| CSV MA801 | You have an MA801 CSV export. |
| PDF text | The PDF has selectable embedded text. |
| PDF OCR | The PDF is scanned or image-based. |
| PDF AI | The report format is difficult and needs AI extraction. |

The import flow creates `ImportJob` records, parses rows, validates data, and creates `Measurement` records after commit/process.

### PDF AI Import

Use PDF AI import when text extraction or OCR gives incomplete data, the report layout varies, or the file contains Greek/English body composition reports that need structured extraction. It requires `OPENAI_API_KEY` and is tracked in `AiUsageLog`.

Use non-AI CSV or PDF text import when the file is clean and predictable. It is cheaper and easier to verify.

## Charts And Progress

The measurements area uses Recharts and domain components under `src/components/measurements`. Charts include weight, body composition, muscle/fat trends, goal progress, and progress intelligence panels.

## Messaging Clients

Use `/app/messages`.

- Start a conversation from the messages area or a client shortcut.
- Each client has one conversation with a nutritionist.
- Unread badges appear in navigation.
- Admins can use broadcast messaging; nutritionists can broadcast only to assigned clients.

## Appointments, Reminders, And Blocked Time

Use `/app/appointments`.

- Create and edit appointments.
- View calendar/list modes.
- Mark status as scheduled, completed, cancelled, or missed.
- Create recurring series.
- Add blocked time so appointment slots are not available.
- Send appointment details emails.
- Reminder sending is available through `/api/reminders/send-appointment-reminders` and can be run by a scheduler.

Clients can view appointments in the web portal. Mobile currently has no dedicated appointments tab.

## Settings, Profile, And Logo

Use `/app/settings`.

- Update profile and account details.
- Change password.
- Adjust preferences such as theme, compact mode, text size, food sorting, meal structure, and serving unit.
- Upload avatar or business logo through the settings image upload API when Supabase storage is configured.

Nutritionists can access settings on desktop and through the staff mobile web drawer. The bottom mobile web nav hides staff nav items by design.

## Common Troubleshooting

| Problem | What To Check |
|---------|---------------|
| Client cannot log in | Confirm the invite was accepted and the client has a linked user account. |
| Invite email did not arrive | Check email delivery mode, `EMAIL_FROM`, Resend key, webhook/console logs, and admin email delivery logs. |
| No diet appears for client | Confirm the plan is published and assigned to the right client. |
| Import creates no measurements | Review parser choice, preview rows, row errors, client matching, and import job status. |
| PDF AI import fails | Check `OPENAI_API_KEY`, model availability, file size, PDF readability, and AI usage logs. |
| Recipe image upload fails | Check Supabase URL, anon key, service role key, bucket policy, and allowed image domains. |
| Appointment email fails | Check Resend/email delivery mode and appointment reminder logs. |

## Best-Practice Workflow

1. Create or update the client profile.
2. Send the invite if the client needs web/mobile access.
3. Add baseline measurements manually or import CSV/PDF data.
4. Review charts and goals with the client.
5. Create or select a diet template.
6. Assign the template and customize the client diet plan.
7. Publish the diet and export a PDF if needed.
8. Message the client with expectations.
9. Schedule the next appointment and reminders.
10. At follow-up, import new measurements, compare progress, adjust the plan, and document next steps.
