# Domain Model

This document describes the initial domain model for the Dinosaurios Academy intranet. Code-level names must remain in English.

## Identity And Access

### User

Represents an authenticated account.

Key fields:

- email
- password hash
- role
- status
- last login

Relationships:

- can be linked to a staff profile, coach profile, guardian profile, or student profile

### Role

Initial role values:

- `admin`
- `staff`
- `coach`
- `guardian`
- `student`

Fine-grained permissions should support sensitive operations such as scholarship management, payment approval, and conflict overrides.

## People

### Student

Represents a student athlete.

Key fields:

- first_name
- last_name
- birth_date
- gender
- identity_document
- email
- phone
- status
- medical_notes
- photo
- qr_token

Relationships:

- has many guardian relationships
- has many enrollments
- has many attendance records
- has many payment charges through enrollments
- has many match invitations
- can have scholarships

Rules:

- adult students require email and phone
- minor students require a primary guardian
- medical notes are optional

### Guardian

Represents a guardian, responsible adult, or emergency contact.

Key fields:

- first_name
- last_name
- email
- phone
- identity_document
- address

Relationships:

- has many student relationships
- can have a user account

### StudentGuardian

Join model between `Student` and `Guardian`.

Key fields:

- relationship
- is_primary
- can_pay
- receives_notifications
- can_authorize_pickup
- is_emergency_contact
- notes

Rules:

- minors must have one primary guardian
- the primary guardian for a minor can pay and receives notifications by default
- additional contacts are configurable

## Academy Structure

### Venue

Represents a training location.

Key fields:

- name
- address
- district
- google_maps_url
- status

Relationships:

- has many courts
- has many class groups

### Court

Represents a court inside a venue.

Key fields:

- venue
- name
- status
- notes

Relationships:

- belongs to venue
- used by class schedules and match events

### Discipline

Represents a sport.

Initial records:

- basketball
- volleyball

### Category

Represents an academy category such as age group or level.

Key fields:

- name
- min_age
- max_age
- sort_order
- status

Rules:

- age can suggest category
- staff chooses the effective category

### ClassGroup

Represents a recurring class group.

Key fields:

- name
- venue
- discipline
- category
- gender_mode
- status
- capacity

Relationships:

- has many schedules
- has many coach assignments
- has many enrollments
- has many class sessions

Gender modes:

- male
- female
- mixed

### ClassSchedule

Represents a recurring schedule for a class group.

Key fields:

- class_group
- court
- weekday
- start_time
- end_time
- starts_on
- ends_on
- status

Rules:

- validate court conflicts
- validate coach conflicts through assigned group coaches
- authorized users can override conflicts

### CoachAssignment

Connects coaches to class groups.

Key fields:

- coach
- class_group
- starts_on
- ends_on
- status

## Enrollment And Pricing

### Enrollment

Represents a student's active or historical enrollment in a class group.

Key fields:

- student
- class_group
- effective_category
- starts_on
- ends_on
- status
- base_monthly_price_snapshot
- final_monthly_price_snapshot
- pricing_notes

Relationships:

- belongs to student
- belongs to class group
- has many payment charges
- can have enrollment-specific scholarships

Rules:

- a student can have multiple active enrollments
- monthly charges are generated from active enrollments

### PriceRule

Reusable pricing configuration.

Key fields:

- venue
- discipline
- category
- gender_mode
- class_group
- amount
- currency
- starts_on
- ends_on
- status

Rules:

- class_group is optional for group-specific pricing
- charges store snapshots and are not rewritten by later price changes

### Scholarship

Represents a scholarship or discount.

Key fields:

- student
- enrollment
- discount_type
- value
- starts_on
- ends_on
- reason
- status
- created_by
- revoked_by

Discount types:

- percentage
- fixed_amount

Rules:

- can apply to an enrollment or to all active enrollments for a student
- requires audit data

## Billing

### PaymentCharge

Represents an amount owed for one enrollment and period.

Key fields:

- enrollment
- student
- billing_period
- due_date
- base_amount
- scholarship_amount
- final_amount
- amount_paid
- status
- notes

Statuses:

- pending
- partial
- paid
- overdue
- void

Rules:

- supports partial payments
- stores price and scholarship snapshots
- may be zero when scholarship is 100%

### Payment

Represents a payment transaction or manually recorded payment.

Key fields:

- payer_user
- payer_guardian
- payer_student
- amount
- method
- paid_at
- status
- recorded_by
- notes

Payment methods:

- bank_transfer
- cash
- yape
- plin
- pos
- other

### PaymentAllocation

Applies one payment to one or more charges.

Key fields:

- payment
- charge
- amount

### PaymentReceipt

Represents uploaded proof of payment.

Key fields:

- payment
- uploaded_by
- file
- status
- reviewed_by
- reviewed_at
- rejection_reason

Statuses:

- pending_review
- approved
- rejected

## Attendance

### ClassSession

Represents a dated occurrence of a class group schedule.

Key fields:

- class_group
- schedule
- court
- starts_at
- ends_at
- status

Relationships:

- has many attendance records

### AttendanceRecord

Represents a student's attendance for a session.

Key fields:

- session
- student
- enrollment
- attendance_type
- status
- recorded_by
- recorded_at
- authorized_by
- notes

Attendance types:

- regular
- make_up
- guest

Statuses:

- present
- absent
- late
- excused

Rules:

- QR attendance must be recorded within a session context
- non-enrolled attendance requires authorization and type labeling

## Match Events

### MatchEvent

Represents an extracurricular match or event.

Key fields:

- title
- discipline
- category
- gender_mode
- venue
- court
- external_location_name
- external_address
- google_maps_url
- opponent
- starts_at
- ends_at
- description
- status
- created_by

Rules:

- can use an internal venue/court or an external location
- should validate coach/court conflicts when applicable

### MatchInvitation

Represents one invited student for a match event.

Key fields:

- event
- student
- invited_by
- status
- token_hash
- token_expires_at
- responded_at
- response_notes

Statuses:

- pending
- confirmed
- declined
- no_response

Rules:

- secure token links allow confirmation without login
- tokens expire after the event or cancellation

## Files

### PrivateFile

Represents metadata for protected files.

Key fields:

- owner_user
- file_type
- storage_key
- original_filename
- content_type
- size
- uploaded_by
- created_at

File types:

- payment_receipt
- student_photo
- document

Rules:

- files are private by default
- access is authorized through Django

## Audit

### AuditLog

Records important changes.

Key fields:

- actor
- action
- entity_type
- entity_id
- before
- after
- created_at
- ip_address

Audited actions should include:

- scholarship create/revoke
- payment approval/rejection
- charge adjustment
- conflict override
- invitation send/cancel
- attendance special override
