# Security Specification - MAX AI Studio

## 1. Data Invariants

1. **Onboarding Leads (`/onboarding/{leadId}`)**:
   - Any client can submit an onboarding lead (create permission) even without authentication, to prevent breaking client-side onboarding.
   - For authenticated users, `userId` must equal their actual UID.
   - Once submitted, leads are read-restricted: only the owner (`request.auth.uid == resource.data.userId` or if submitted anonymously, no client read is allowed except by administrators/owners) or admins can read them. Let's restrict read access to:
     - Admin users (users present in `/admins/{adminId}`) OR
     - The authenticated user who submitted it (`resource.data.userId == request.auth.uid`).
   - Standard clients cannot update or delete onboarding leads once submitted, keeping terminal states locked and preventing data tampering.
   - Enforce exact schemas, maximum text lengths (e.g., `< 5000` chars), and `createdAt` matching `request.time`.

2. **User Connected Forms (`/userForms/{formConfigId}`)**:
   - Write/Read operations are strictly restricted to the authenticated owner: `request.auth.uid != null && request.auth.uid == resource.data.userId` (and `request.resource.data.userId == request.auth.uid` on write).
   - `formId` must be a valid alphanumeric Google Forms ID.
   - Enforce proper type constraints: `syncEnabled` must be boolean, `formTitle` must be string and `< 500` chars, `connectedAt` must equal `request.time`.

---

## 2. The "Dirty Dozen" Threat Payloads

Here are 12 specific payloads representing exploits to identity, integrity, and state bounds, which our security rules must block:

1. **Identity Spoofing in Leads**: Creating an onboarding lead with a spoofed `userId` of another customer.
2. **Lead Tampering/Modifications**: An attacker trying to update someone else's onboarding lead, e.g. updating the budget.
3. **Immutability Breach**: An attacker trying to modify `createdAt` or `companyName` on a submitted lead.
4. **State Skip (Status Hijacking)**: A client trying to directly set or change their onboarding `status` to `completed` or `contacted` upon creation or update.
5. **PII Data Harvest (Blanket List)**: An authenticated non-admin trying to query (`list` or `get`) all onboarding leads.
6. **Denial of Wallet (ID Poisoning)**: Submitting a lead with a 1.5MB junk-character document ID to cause storage/processing exhaustion.
7. **Form Hijack**: An authenticated user trying to create or view Google Form connections (`/userForms/`) belonging to another user.
8. **Value Poisoning**: Attempting to set `configuratorTotal` to a string or negative value.
9. **Boolean Inversion**: Attempting to set `syncEnabled` to a massive string payload instead of a boolean.
10. **Timestamp Spoofing**: Submitting a lead with a client-supplied future/past timestamp for `createdAt`.
11. **Admin Privilege Escalation**: Attempting to self-add to the `/admins/` collection.
12. **Ghost Field Injection**: Injecting an unmapped field `isVerified: true` to bypass verification rules.

---

## 3. Security Rules Architecture

We will implement a Zero-Trust `firestore.rules` containing:
- Standalone validator functions: `isValidOnboarding` and `isValidUserForm`.
- Strict path ID validation using regex `isValidId(id)`.
- Key limit restrictions using `keys().hasAll()` and `size()` checking.
- Complete `affectedKeys().hasOnly()` gates for updates.
