<!-- Generated from GetNutria GDPR Legal Pack Version 1.0. Do not edit this generated copy directly. -->
# GetNutria Security and Data Protection Overview (GDPR)

**Version:** 1.0  
**Last reviewed:** 19 July 2026  
**Effective date:** 1 August 2026

This overview is issued by *****, trading as **GET NUTRIA**, Business Name Registration No. ΕΕ 63204 α, of 10 Nikou Karantoni, Akropoli, 2013 Nicosia, Cyprus.

This document provides a high-level overview for customers. It does not disclose confidential system details and must describe only controls that are actually implemented and verified.

## 1. Security responsibilities

GetNutria is responsible for protecting the service infrastructure and processing customer data according to the DPA. Nutritionists and clinics are responsible for authorised-user management, lawful data entry, secure devices and appropriate professional procedures.

## 2. Access control

GetNutria is designed to use role-based access:

- nutritionists access clients assigned or otherwise authorised to them;
- clients access their own permitted information;
- administrative access is limited to authorised operational purposes; and
- each user should have an individual account.

Production implementation and regression tests must verify these boundaries.

## 3. Authentication

Controls are intended to include secure password hashing, protected sessions, login validation and account-recovery safeguards.

**Before publication verify:** password parameters, session lifetime, secure cookie flags, brute-force/rate-limit protections and administrative authentication requirements.

## 4. Encryption and network security

Production traffic should use HTTPS/TLS. Database, storage and backup encryption must be verified with each provider.

GetNutria does not promise end-to-end encryption unless it has been specifically implemented and validated.

## 5. Administrative access

GetNutria personnel do not routinely inspect client records. Access may be permitted to authorised personnel where necessary for:

- customer-requested support;
- security investigation;
- maintenance or recovery;
- abuse prevention; or
- legal compliance.

Access should follow least privilege, confidentiality obligations and logging where technically possible.

## 6. Development and production separation

Real production health data must not be copied into development, test or demonstration systems unless specifically authorised, minimised and protected. Synthetic or anonymised test data should be used by default.

## 7. Backups and resilience

GetNutria must document:

- systems included in backups;
- backup frequency;
- encryption and access controls;
- retention and deletion cycles;
- restoration testing; and
- responsibilities shared with hosting/database providers.

Current verified details: *******.**

## 8. Logging and monitoring

Security-relevant events should be logged in a proportionate manner. Logs must avoid unnecessary client health content and must have documented access and retention limits.

## 9. Secure development

Development practices should include:

- code review for sensitive changes;
- automated tests for access control;
- dependency and secret scanning;
- environment-based secret management;
- migration review;
- production deployment controls; and
- prompt remediation of material vulnerabilities.

## 10. Incident response

GetNutria maintains a Personal Data Breach Response Procedure (GDPR). Confirmed breaches affecting customer personal data will be communicated to the relevant controller without undue delay as required by the DPA.

## 11. Subprocessor management

Providers are assessed for purpose, security, location, contractual protections and transfer safeguards. Active providers are listed in the GetNutria Subprocessor List (GDPR).

## 12. Data export and deletion

GetNutria provides supported export and deletion procedures. Exact post-termination and backup periods are defined in the DPA and internal retention schedule.

## 13. Customer security responsibilities

Customers should:

- use unique strong credentials;
- avoid account sharing;
- keep devices and browsers updated;
- review user access regularly;
- verify recipients before sending invitations or messages;
- report suspected incidents promptly; and
- export records where independent retention is professionally required.

## 14. Reporting security concerns

Security contact: *****  
Privacy contact: *****
