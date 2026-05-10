Use this as a high-quality implementation prompt in Gemini CLI for building the frontend architecture and pages of the project.

---

# Secure Note-Taking App — Frontend Implementation Prompt

You are a senior React.js frontend engineer specialized in scalable SaaS UI architecture, Tailwind CSS, accessibility, and responsive UX.

Build the frontend for a production-grade **Secure Note-Taking App** using:

* React.js
* Tailwind CSS
* React Router DOM
* React Hook Form
* Framer Motion
* Lucide React Icons
* Zustand or Context API for lightweight state
* Headless UI / Radix UI patterns
* Mobile-first responsive architecture

The output must look like a polished modern SaaS product similar to Notion / Linear / Slack hybrid aesthetics.

---

# TECH STACK & RULES

## Core Stack

* React.js
* Tailwind CSS
* Vite
* React Router DOM
* Framer Motion
* Lucide React
* React Hook Form
* clsx
* date-fns

## Design System

### Typography

* Font Family: Inter
* Headers:

  * font-semibold
  * text-slate-800
* Body:

  * text-slate-600
* Proper visual hierarchy

### Border Radius Rules

* Auth cards → `rounded-3xl`
* Dashboard cards → `rounded-2xl`
* Buttons/Inputs → `rounded-xl`

### Color Palette

* Background → `bg-slate-50`
* Surface → `bg-white`
* Primary → `indigo-600`
* Primary Hover → `indigo-700`
* Success → `emerald-500`
* Text Primary → `slate-800`
* Text Secondary → `slate-600`
* Border → `slate-200`

### Shadow Style

Use soft layered shadows:

* `shadow-sm`
* `shadow-md`
* subtle hover elevation

### Animation Rules

All interactive elements must have:

* `transition-all duration-200 ease-in-out`
* Smooth hover/focus animations
* Soft scale effects where appropriate

### Accessibility

* Proper labels
* Keyboard accessible
* Focus rings
* ARIA support
* Minimum touch targets on mobile

---

# FOLDER STRUCTURE

Create scalable architecture:

```bash
src/
 ├── components/
 │    ├── layout/
 │    ├── ui/
 │    ├── forms/
 │    ├── notes/
 │    ├── admin/
 │    └── aggregation/
 │
 ├── pages/
 │    ├── auth/
 │    ├── dashboard/
 │    ├── admin/
 │    └── aggregations/
 │
 ├── layouts/
 ├── hooks/
 ├── store/
 ├── routes/
 ├── utils/
 ├── data/
 ├── types/
 └── App.jsx
```

---

# GLOBAL RESPONSIVE LAYOUT

Build a responsive app shell.

---

## DESKTOP (>1024px)

### Left Sidebar

Width: `260px`

Include:

* Logo
* Navigation links

  * Dashboard
  * Admin
  * Aggregations
* User Profile section
* Logout button

Sidebar style:

* White surface
* Border-right
* Sticky full-height
* Soft hover states
* Active navigation indicator

---

## TABLET (768px - 1024px)

Convert sidebar into:

* Collapsed icon rail
* Tooltips on hover
* Preserve navigation usability

---

## MOBILE (<768px)

### Top Bar

Include:

* Current page title
* User avatar
* Optional notification icon

### Bottom Navigation

Fixed bottom nav with:

* Dashboard
* Notes
* Admin
* Profile

Requirements:

* Large touch targets
* Active state indicator
* Frosted/glassmorphism subtle effect

---

# AUTHENTICATION HUB

Create:

* Login page
* Signup page

Both must:

* Be centered vertically/horizontally
* Use soft SaaS aesthetics
* `rounded-3xl`
* Large spacing
* Minimal clean layout

---

## LOGIN PAGE

Fields:

* Email
* Password

Features:

* Remember me checkbox
* Forgot password link
* CTA button
* Link to signup

Add:

* Subtle animated background gradients
* Card entrance animation

---

## SIGNUP PAGE

Fields:

* Name
* Email
* Password
* Confirm password

---

## DYNAMIC INTEREST TAG INPUT

Critical component.

Requirements:

* User types interest
* Press Enter
* Creates rounded pill tag
* Tags accumulate visually
* Tags removable
* Input remains inline
* Indigo tag styling
* Smooth animations

Behavior similar to:

* GitHub labels
* Notion tags
* Linear filters

Must support:

* Keyboard navigation
* Duplicate prevention
* Responsive wrapping

---

# USER DASHBOARD & NOTES

Build a responsive dashboard.

---

## GRID SYSTEM

Responsive:

* Desktop → 3 columns
* Tablet → 2 columns
* Mobile → 1 column

Use:

```jsx
grid-cols-1 md:grid-cols-2 xl:grid-cols-3
```

---

## NOTE CARD DESIGN

Each card contains:

* Title
* Content snippet
* CreatedAt timestamp
* Optional note category
* Actions dropdown

Style:

* White surface
* Rounded-2xl
* Hover lift
* Subtle border
* Clean spacing

Add:

* Empty state illustration
* Skeleton loading cards

---

## NOTE ACTIONS

Support:

* Edit
* Delete
* Archive

Use:

* Dropdown menu
* Hover actions
* Mobile-friendly interaction

---

## CREATE / EDIT NOTE MODAL

Requirements:

* Rounded-2xl
* Centered modal
* Backdrop blur
* Smooth open/close animation

Fields:

* Title
* Content textarea
* Tags
* Save button

---

## MOBILE FAB BUTTON

Floating Action Button:

* Bottom-right
* Indigo circular button
* Shadow elevation
* Plus icon
* Opens create modal

---

## PAGINATION

Centered footer pagination:

* Previous
* Next
* Current page indicator

Style:

* Indigo buttons
* Disabled states
* Responsive spacing

---

# ADMIN COMMAND CENTER

Create a high-density admin interface.

---

## USER MANAGEMENT TABLE

Desktop:

* Responsive modern table

Columns:

* Avatar
* Name
* Email
* Role
* Interest Count
* Status
* Actions

Style:

* Sticky table header
* Zebra hover states
* Clean spacing

---

## MOBILE USER CARDS

On small screens:
Convert table into stacked cards.

Each card shows:

* Avatar
* User info
* Role badge
* Interests count
* Action buttons

---

## SYSTEM NOTES VIEW

Toggle:

* “View All System Notes”

Display:

* Global note feed

Each note card includes:

* Author badge
* Timestamp
* Interest label
* Security/privacy badge

---

# DATA AGGREGATION VIEWS

---

# SCENARIO A — INTEREST GROUPS

Create card-based aggregation view.

Each card:

* Interest title
* Member count
* User avatars
* User emails

Responsive masonry/grid layout.

Add:

* Search
* Filter
* Hover animations

---

# SCENARIO B — USER PROFILE FEED

Create:

* Large profile header
* User stats
* Interest badges

Below:

* Vertical note stream

Feed cards:

* Timeline aesthetic
* Smooth separators
* Rich spacing

---

# EMPTY STATES

Design consistent empty states.

Needed for:

* Notes
* Admin users
* Aggregation groups

Each empty state should include:

* Lucide icon
* Headline
* Description
* CTA button

Must feel polished and premium.

---

# COMPONENT REQUIREMENTS

Build reusable components:

* Button
* Input
* Textarea
* Modal
* Badge
* Avatar
* Sidebar
* Navbar
* Card
* Dropdown
* Pagination
* EmptyState
* TagInput
* Table
* MobileBottomNav

All components must:

* Be reusable
* Typed with props
* Responsive
* Accessible
* Tailwind-based

---

# RESPONSIVENESS REQUIREMENTS

Ensure:

* No overflow issues
* Perfect spacing consistency
* Mobile-first implementation
* Tablet optimization
* Desktop polish

Test breakpoints:

* 375px
* 768px
* 1024px
* 1440px

---

# UI QUALITY TARGET

The UI should feel:

* Premium
* Airy
* Professional
* Modern SaaS
* Production-ready

Avoid:

* Clutter
* Harsh shadows
* Tight spacing
* Generic bootstrap aesthetics

The result should resemble a market-standard startup SaaS dashboard.

---

# IMPLEMENTATION EXPECTATIONS

Generate:

1. Full page components
2. Reusable UI components
3. Layout wrappers
4. Responsive navigation
5. Tailwind utility styling
6. Mock data
7. State management
8. Clean architecture
9. Framer Motion animations
10. Modular scalable code

Code must be:

* Clean
* Maintainable
* Senior-level
* Production-oriented

Include:

* Proper imports
* Dummy data
* Responsive behavior
* Example routing setup
* Example component composition

Do not generate pseudo-code. Generate actual React + Tailwind implementation-ready code.
