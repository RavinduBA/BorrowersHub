# Task for a front end develloper

## 🔧 Technical Stack

- **Frontend Framework:** React (with functional components)
- **Styling:** Tailwind CSS + [ShadCN UI](https://ui.shadcn.com) components
- **State Management:** Context API or [Zustand](https://github.com/pmndrs/zustand)  
  _Used for managing active borrower, tab state, or shared app context._
- **Type Checking:** TypeScript _(optional but recommended)_
- **Icons:** [Lucide Icons](https://lucide.dev) (integrated with ShadCN UI)
- **Form & Workflow Handling:**  
  - [Zod](https://zod.dev) – for schema-based validation  
  - [React Hook Form](https://react-hook-form.com) – for form state management  
  _These are optional and can be used in interactive or input-heavy components._


## 📡 APIs for the UI

Refer to the `api/` folder for mock API structure and responses:

- [Readme](api/readme.md)
- [Postman Collection](api/postman.json)
- [Sample Response](api/sample-response.json)

---

## 🧩 UI Sections Breakdown

### 1. Top-Level Layout

- Use a responsive **3-column grid** on desktop, stacked vertically on mobile.
- **Header**: App name “**DemoApp**” with search, help, and notification icons aligned top-right.
- Each content block (Pipeline, Borrower Detail, Broker Info) should be wrapped in a **Card** component with padding and shadows.

---

### 2. Borrower Pipeline (Left Panel)

- **Tabs**: `"New"`, `"In Review"`, `"Approved"` — use ShadCN `Tabs` component.
- **Borrower Card** (per list item):
  - Name
  - Loan Type
  - Amount (right-aligned)
  - Status Label (`New`, `In Review`, `Renew`)
- **Interaction**: Clicking a borrower updates the **active profile** in the center pane.
- **Radio Section**:
  - Use a styled radio group below the tabs.
  - Label: `F-SANATISED ACTIVE` (rendered as all-caps subheading)

---

### 3. Borrower Details (Middle Panel)

#### a. Header
- Name (bold), email, phone, loan amount
- Status pill (e.g., `In Review`) — styled badge with status colors

#### b. AI Explainability Section
- Use an `Accordion` component (expandable)
- Show red warning icons for issues:
  - Income Inconsistency
  - High Debt-to-Income Ratio
- **Action Buttons**:
  - `Request Documents`
  - `Send to Valuer`
  - `Approve`
  - Style with primary and secondary button variants

#### c. Loan Summary
- Use `DescriptionList` or grid layout:
  - Employment, Existing Loan, Credit Score, Source of Funds
- **Risk Signal**: warning callout with icon
- **Escalate Button**: `Escalate to Credit Committee` — prominent and primary-colored

---

### 4. Broker Overview (Right Panel)

- **Broker Info**: Name (e.g., `Robert Turner`)
- **Stats**:
  - Deals: `16`
  - Approval Rate: `75%`
  - Pending: `$7,660`
- Layout using `Flex` or `Grid` with large numbers and labels underneath
- **Contact Buttons**: Call, Email, Chat — use segmented control or button group

#### a. Onboarding Workflow
- Ordered list (1–7) of workflow steps
- Style as timeline, vertical stepper, or plain list with completion markers

#### b. AI Assistant Toggle
- Toggle switch for assistant feature (e.g., `E Ardsassist`)

---

## 📱 Responsive Design

- Use `flex-col` for mobile and `grid-cols-3` for desktop
- Ensure responsive layout for:
  - Buttons
  - Tabs
  - Long content/text
- **Mobile Behavior**:
  - Collapse Broker Info and Onboarding Workflow into an accordion

---

## 🧪 Testing Requirements

Use **Playwright** or **Cypress** for basic E2E tests. Validate:

- Borrower selection updates the center pane
- Explainability section expands/collapses
- Button clicks log appropriate console outputs (mocked behavior)

---

## 🧾 Example Component Structure

Develop a `dashboard` page that implements the full UI layout. Structure your codebase by breaking down each major section into its own React component for maintainability and reuse.

Suggested components include:

- `BorrowerPipeline` (left panel)
- `BorrowerDetail` (center panel)
- `LoanSummaryCard`
- `BrokerOverview` (right panel)
- `OnboardingWorkflow`
- `Layout` (page-level layout wrapper)

---

## 🔐 Access Control (Optional for MVP)

Optionally, wrap the view in an auth check. Role-based access (e.g., Broker, Admin) may be introduced later.

---

## ✅ Acceptance Criteria

- [ ] Pipeline tabs update borrower list and active profile
- [ ] AI Explainability section renders flags and is collapsible
- [ ] "Escalate to Credit Committee" button is conditionally enabled (mock logic)
- [ ] Responsive layout across screen sizes
- [ ] Consistent UI spacing/alignment using Tailwind classes
