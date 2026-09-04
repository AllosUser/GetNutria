<!-- Reviewed public copy. Maintained in this repository; keep subprocessors.md and subprocessors.el.md in step. -->
# GetNutria Subprocessor List (GDPR)

GetNutria is operated by Andreas Kalvaris, trading as **GET NUTRIA**, a registered business name in the Republic of Cyprus under Business Name Registration No. ΕΕ 63204 α, of 10 Nikou Karantoni, Akropoli, 2013 Nicosia, Cyprus.

This list identifies the third-party providers GetNutria uses to operate the service, the purpose each one serves and the categories of data each one may process.

## 1. Core infrastructure providers

These providers are used whenever GetNutria is running.

### Vercel

**Purpose:** Application hosting and server-side compute.

**Data:** Account and client information and, where required to serve an application request, health-related application data.

**Location:** GetNutria's production functions are configured in Dublin, Ireland (`dub1`). Other platform processing carried out by Vercel, such as routing, platform operations and service logging, follows the provider's own platform terms and is not limited to that region.

### Supabase

**Purpose:** Primary PostgreSQL database and selected object and image storage.

**Data:** Account, client and health records in PostgreSQL. Storage holds selected images, including recipe images, avatars, practice and business branding and branding used in PDF headers and footers.

**Location:** The primary production project is hosted in Ireland (`eu-west-1`). Control-plane, backup and support processing carried out by the provider follows the provider's own platform terms and is not necessarily limited to that region.

**Access model:** Application access to the database is server-mediated through GetNutria's own backend. Browser clients do not query database tables directly, and the Supabase Data API is disabled for production tables.

### GitHub

**Purpose:** Source control, continuous integration and hosted backup automation.

**Data:** Repository and build information. Hosted automation transiently handles a database dump while the scheduled backup workflow runs.

### Cloudflare R2

**Purpose:** Separate storage for database backups.

**Data:** Full PostgreSQL database backup files and their checksums.

### Railway

**Purpose:** PDF rendering, text-extraction and OCR service.

**Data:** Uploaded PDF documents and the rendered pages, extracted text and OCR output produced from them when this processing path is used. Uploaded documents may contain identifiable health information.

## 2. Feature-dependent providers

These providers receive data only when the relevant feature is used or enabled.

### OpenAI

**Purpose:** AI-assisted report and document processing, client, diet and progress features, and image and content helpers, where such a feature is invoked.

**Data:** Feature-dependent. Depending on the feature invoked, this may include rendered document pages, extracted or OCR report text, client summaries, body-composition information, diet and health context, and recipe or content prompts. It may therefore include personal data and health data.

### Resend

**Purpose:** Transactional email, including client invitations, password resets, appointment communications and reminders, and delivery of individualised diet PDFs where that flow is used.

**Data:** Recipient email address, account and service information, appointment information and, where applicable, a diet-plan attachment.

### Brevo and WebSmsCY

**Purpose:** SMS delivery, where SMS is enabled. GetNutria supports both providers; which one is used depends on the configured routing for the relevant deployment.

**Data:** Recipient telephone number and the appointment or service message content.

## 3. Third-party integrations available when configured

### Charder

**Purpose:** Optional integration with Charder body-composition devices and services. Whether this integration is in use depends on the practice's own configuration and equipment.

**Data:** Where the integration is configured and used, client demographic and body-composition information may be exchanged with the relevant device or service.

## 4. International-transfer safeguards

For a transfer outside the EEA, GetNutria uses one or more of the following as applicable:

- a European Commission adequacy decision;
- the EU–US Data Privacy Framework for a currently certified recipient;
- the European Commission's 2021 Standard Contractual Clauses;
- equivalent processor-to-subprocessor contractual obligations; and
- supplementary controls such as encryption in transit, least-privilege access, data minimisation and restricted message content.

## 5. Subprocessor principles

GetNutria will:

- use providers only for defined service purposes;
- enter into appropriate data-protection terms;
- restrict provider access to relevant information;
- assess location and transfer safeguards;
- maintain reasonable security and retention requirements;
- notify customers of material additions or replacements as described in the DPA; and
- remain responsible for subprocessor obligations to the extent required by GDPR.

## 6. Change notification

Nutritionists and clinics receive material subprocessor-change notices through the verified account email and the Legal & Privacy section of the platform.

The DPA objection period is **14 calendar days** from notice.

## 7. Contact

Questions about this list: privacy@getnutria.com
