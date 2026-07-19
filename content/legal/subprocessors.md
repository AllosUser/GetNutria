<!-- Generated from GetNutria GDPR Legal Pack Version 1.0. Do not edit this generated copy directly. -->
# GetNutria Subprocessor List (GDPR)

**Version:** 1.0  
**Last updated:** 19 July 2026  
**Effective date:** 1 August 2026

GetNutria is operated by *****, trading as **GET NUTRIA**, a registered business name in the Republic of Cyprus under Business Name Registration No. ΕΕ 63204 α, of 10 Nikou Karantoni, Akropoli, 2013 Nicosia, Cyprus.

This list identifies third-party providers approved or conditionally approved to process personal data for GetNutria at the initial launch.

**Publication gate:** the public page must not describe a provider or region as active until the production account, DPA and region have been verified. The Supabase production region and executed DPA status are currently *****.

| Provider | Service and data | Processing location/region | Transfer safeguard | Launch status |
|---|---|---|---|---|
| **Supabase Pte. Ltd.** and its authorised subprocessors | Primary PostgreSQL database and file/image storage; may contain account data, client records and health-related information | ***** pending production verification | DPA status: *****; safeguards must be verified before publication | **Unverified** |
| **Vercel Inc.** | Web application hosting, server-side functions, routing and delivery; requests may contain application data | ***** pending production verification | Contractual approval for special-category health data: ***** | **Compliance blocker for health data:** do not represent Vercel as approved for client health data until written contractual permission is obtained or the sensitive-data backend is moved to a suitable provider |
| **Resend, Inc.** | Transactional email for invitations, resets and appointment/service notices; limited to recipient identity, email address and minimum message content | Primary processing in the **United States** and through listed subprocessors | Resend DPA; EU–US Data Privacy Framework where applicable; EU SCCs and equivalent subprocessor terms | Approved for minimal transactional content. Do not include measurements, diagnoses, diet details or uploaded reports in email bodies |
| **OpenAI Ireland Ltd. / OpenAI group** | Optional generation of non-personal recipe images | Processing may occur in Europe or other documented locations according to the configured API project and service | OpenAI DPA; adequacy decisions and EU SCCs for onward transfers | **Approved only for non-personal recipe-image generation at launch.** Do not send names, contact details, health reports, measurements or other client data |
| **OpenAI for AI health-report extraction** | Optional extraction of measurements from uploaded reports | Not approved at launch | Not approved | **Disabled.** May be enabled only after written confirmation that intended special-category processing is contractually permitted, EEA residency/processing is configured where available, retention is documented, and the DPIA is updated |
| **Google Document AI / external OCR** | Optional document OCR | Not approved at launch | Not approved | Disabled unless separately reviewed and added to this list |
| **SMS provider** | Appointment reminders by SMS | None selected | None | Disabled until a provider, DPA, location and message-minimisation rules are approved |
| **Payment provider** | Subscription payment processing | None selected in this pack | Provider-specific | Add before card payments are enabled; use hosted checkout so GetNutria does not store card data |
| **Error monitoring provider** | Error and performance diagnostics | None approved in this pack | Provider-specific | Do not enable production monitoring that captures request bodies, health data, messages or uploaded files until reviewed |

## International-transfer safeguards

For a transfer outside the EEA, GetNutria will use one or more of the following as applicable:

- a European Commission adequacy decision;
- the EU–US Data Privacy Framework for a currently certified recipient;
- the European Commission's 2021 Standard Contractual Clauses;
- equivalent processor-to-subprocessor contractual obligations; and
- supplementary controls such as TLS, encryption at rest, least-privilege access, data minimisation and restricted message content.

## Subprocessor principles

GetNutria will:

- use providers only for defined service purposes;
- enter into appropriate data-protection terms;
- restrict provider access to relevant information;
- assess location and transfer safeguards;
- maintain reasonable security and retention requirements;
- notify customers of material additions or replacements as described in the DPA; and
- remain responsible for subprocessor obligations to the extent required by GDPR.

## Change notification

Nutritionists and clinics will receive material subprocessor-change notices through the verified account email and the Legal & Privacy section of the platform.

The DPA objection period is **14 calendar days** from notice.
