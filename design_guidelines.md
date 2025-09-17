# Drops Trac Admin Dashboard Design Guidelines

## Design Approach Documentation

**Selected Approach**: Design System Approach using Material Design principles
**Justification**: This is a utility-focused, information-dense enterprise application where efficiency and learnability are paramount. The dashboard handles complex hierarchical data and requires consistent, professional UI patterns.

**Key Design Principles**:
- Data clarity and hierarchy visualization
- Efficient workflows for bulk operations
- Multi-user collaboration indicators
- Status-driven color coding

## Core Design Elements

### A. Color Palette

**Primary Colors**:
- Light Mode: 210 50% 45% (Professional blue)
- Dark Mode: 210 40% 65% (Lighter blue for contrast)

**Status Colors**:
- Success/Pass: 142 76% 36% (Green)
- Warning/Medium Severity: 45 93% 47% (Amber)
- Error/High Severity: 0 84% 60% (Red)
- Info/Low Severity: 217 91% 60% (Light blue)

**Neutral Colors**:
- Light Mode: Grays from 0 0% 95% to 0 0% 10%
- Dark Mode: Grays from 210 20% 98% to 210 20% 8%

### B. Typography

**Font Family**: Inter (Google Fonts) for excellent readability in data-heavy interfaces
**Hierarchy**:
- Headers: 600 weight, sizes from text-3xl to text-lg
- Body: 400 weight, text-sm and text-base
- Data/Numbers: 500 weight, tabular-nums for alignment
- Labels: 500 weight, text-xs and text-sm

### C. Layout System

**Spacing Units**: Tailwind units of 1, 2, 4, 6, 8, 12, 16
- Component padding: p-4, p-6
- Section margins: m-8, m-12
- Element spacing: gap-2, gap-4
- Large containers: p-8, p-16

### D. Component Library

**Navigation**:
- Sidebar with collapsible sections
- Breadcrumb navigation for hierarchy
- Tab navigation for inspection details

**Data Display**:
- KPI cards with large numbers and trend indicators
- Data tables with sorting, filtering, and pagination
- Charts using subtle backgrounds with clear data points
- Progress bars for completion status

**Forms & Inputs**:
- shadcn/ui components throughout
- Clear validation states
- Multi-select for inspector assignment
- File upload areas with drag-and-drop

**Overlays**:
- Modal dialogs for forms and confirmations
- Slide-over panels for inspection details
- Toast notifications for bulk operations
- Loading states with skeleton components

**Status Indicators**:
- Color-coded badges for severity levels
- Progress indicators for inspection completion
- Online/offline status for inspectors
- Sync status indicators for cloud operations

### E. Specific Features

**Dashboard Layout**:
- 4-column grid for KPI cards on desktop
- Bar charts for severity distribution
- Pie charts for pass/fail ratios
- Sortable table for rig performance

**Virtualized Checklist**:
- Clean row design with clear pass/fail toggles
- Expandable rows for notes and photos
- Sticky header with progress indicator
- Visual grouping for related items

**Photo Management**:
- Grid layout with thumbnails
- Upload progress indicators
- Size validation warnings
- Quality indicators with color coding

**Multi-Inspector Collaboration**:
- Avatar indicators showing active inspectors
- Real-time status updates
- Conflict resolution UI for simultaneous edits
- Activity timeline for changes

No custom animations - rely on shadcn/ui default transitions for professional consistency.