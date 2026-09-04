<!-- Reviewed public copy. Maintained in this repository; keep security.md and security.el.md in step. -->
# GetNutria Security and Data Protection Overview (GDPR)

This overview is issued by Andreas Kalvaris, trading as **GET NUTRIA**, Business Name Registration No. ΕΕ 63204 α, of 10 Nikou Karantoni, Akropoli, 2013 Nicosia, Cyprus.

It provides a high-level summary of the controls GetNutria applies. It does not disclose confidential system details, and it describes only controls that are in place today.

## 1. Security responsibilities

GetNutria is responsible for protecting the service infrastructure and processing customer data according to the DPA. Nutritionists and clinics are responsible for authorised-user management, lawful data entry, secure devices and appropriate professional procedures.

## 2. Access control

Access to GetNutria is controlled by the application:

- protected areas of the application require an authenticated account;
- authorisation checks run on the server, based on the user's role;
- nutritionists reach client records through assignment and authorisation checks;
- clients reach their own permitted information; and
- privileged and administrative areas require an administrative role.

## 3. Database access

- The primary production database is a Supabase-hosted PostgreSQL database in Ireland.
- Application access to the database is server-mediated through GetNutria's backend using Prisma.
- Browser clients do not query database tables directly.
- The Supabase Data API is disabled for production tables.

Supabase row-level security is additionally enabled on many tables as a defence-in-depth measure. It supplements, rather than replaces, the server-side authorisation described above.

## 4. Network transport

Production traffic is served over HTTPS/TLS.

GetNutria does not claim end-to-end encryption, and it does not represent provider-side storage encryption beyond the terms published by each provider.

## 5. Administrative access

GetNutria personnel do not routinely inspect client records. Access may be permitted to authorised personnel where necessary for:

- customer-requested support;
- security investigation;
- maintenance or recovery;
- abuse prevention; or
- legal compliance.

Privileged application functions are restricted through role-based server-side authorisation. Authorised personnel are subject to confidentiality obligations, and the application records an audit entry for sensitive and security-relevant actions.

## 6. Logging and data minimisation

- The application writes audit entries for sensitive and security-relevant actions.
- Sensitive import and report payload logging has been removed from the primary import paths.
- Audit and support logging on the remediated security-sensitive paths records minimised, allowlisted metadata rather than record content.

This describes the import, support and authentication paths that have been reviewed and remediated. GetNutria does not claim that no personal data appears anywhere in application or platform logs.

## 7. Development and production separation

Production deployment and configuration are separate from local development. Under GetNutria's internal policy, real production health data is not to be copied into development, test or demonstration systems unless specifically authorised, minimised and protected, and synthetic or anonymised test data is used by default.

## 8. Change control

Automated checks run before a production release and include:

- TypeScript type checking;
- linting;
- the automated test suite; and
- a production build.

## 9. Secrets

Credentials and provider keys are supplied through environment configuration rather than being committed to source control.

## 10. Backups and resilience

- The database platform performs daily database backups.
- A separate scheduled backup workflow produces full PostgreSQL backups and stores them on separate backup infrastructure at Cloudflare R2.
- Backup copies are removed in accordance with GetNutria's operational backup-retention controls.

Restore testing is not currently published as a completed control.

## 11. Processing regions

- Vercel production functions are configured in Dublin, Ireland.
- The primary production PostgreSQL database is hosted in Ireland.

Some feature-specific providers process data in other locations depending on the service used. The current providers, purposes and locations are listed in the GetNutria Subprocessor List (GDPR), and transfer safeguards are described in the GetNutria Privacy Notice (GDPR).

## 12. Incident response

GetNutria maintains a Personal Data Breach Response Procedure (GDPR). Confirmed breaches affecting customer personal data will be communicated to the relevant controller without undue delay as required by the DPA.

## 13. Subprocessor management

Providers are assessed for purpose, security, location, contractual protections and transfer safeguards. The providers in use are listed in the GetNutria Subprocessor List (GDPR).

## 14. Data export and deletion

GetNutria provides supported export and deletion procedures. Post-termination export and deletion periods are defined in the DPA.

## 15. Customer security responsibilities

Customers should:

- use unique strong credentials;
- avoid account sharing;
- keep devices and browsers updated;
- review user access regularly;
- verify recipients before sending invitations or messages;
- report suspected incidents promptly; and
- export records where independent retention is professionally required.

## 16. Reporting security concerns

Security contact: security@getnutria.com
Privacy contact: privacy@getnutria.com
Support: support@getnutria.com

Please report a suspected vulnerability or security incident to security@getnutria.com and avoid including client health information in the report.
