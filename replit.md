# Drops Trac Admin Dashboard

## Overview

Drops Trac is a comprehensive inspection management system designed for oil rigs and industrial assets. It provides a modern web-based dashboard for managing inspections, tracking compliance, analyzing data, and generating reports. The application focuses on real-time collaboration, advanced reporting capabilities, and AI-powered features for smart severity assessment and predictive analytics.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, using Vite as the build tool and development server
- **UI Components**: Built with shadcn/ui component library using Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with a comprehensive design system supporting both light and dark themes
- **State Management**: TanStack Query for server state management and data fetching
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **API Pattern**: RESTful API structure with centralized route registration
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development

### Data Storage Solutions
- **Primary Database**: PostgreSQL using Neon serverless driver
- **ORM**: Drizzle ORM for type-safe database operations and migrations
- **Schema Management**: Centralized schema definitions with automatic TypeScript type inference
- **Connection Pooling**: Neon serverless connection pooling for efficient database access

### Authentication and Authorization
- **Session Management**: PostgreSQL-backed session storage using connect-pg-simple
- **User Model**: Basic user schema with username/password authentication (expandable for enterprise features)

### Design System and Theming
- **Design Approach**: Material Design principles optimized for data-dense enterprise applications
- **Color System**: Professional blue primary palette with semantic status colors (success/green, warning/amber, error/red, info/blue)
- **Typography**: Inter font family for excellent data readability with hierarchical text sizing
- **Component Library**: Custom components built on Radix UI primitives including forms, data tables, charts, and specialized inspection components

### Key Application Features
- **Dashboard**: KPI cards, inspection tables, and data visualizations using Recharts
- **Inspection Management**: Comprehensive inspection workflow with checklist views, photo galleries, and CAR (Corrective Action Request) panels
- **AI-Powered Features**: Smart severity assessment, anomaly detection, predictive analytics, and automated summaries
- **Virtual Scrolling**: Performance optimization for large datasets using react-window
- **Real-time Updates**: Built-in infrastructure for live collaboration features

## External Dependencies

### Database and Infrastructure
- **Neon Database**: Serverless PostgreSQL database with WebSocket support for real-time features
- **Drizzle Kit**: Database migration and schema management tools

### Frontend Libraries
- **Radix UI**: Comprehensive set of accessible UI primitives for building the component library
- **Recharts**: Data visualization library for charts and analytics dashboards
- **TanStack Query**: Server state management for efficient data fetching and caching
- **React Hook Form**: Form handling with validation using Zod schemas
- **Date-fns**: Date manipulation and formatting utilities
- **Class Variance Authority**: Utility for building variant-based component APIs

### Development and Build Tools
- **Vite**: Fast development server and build tool with React plugin
- **TypeScript**: Type safety across the entire application stack
- **Tailwind CSS**: Utility-first CSS framework with PostCSS processing
- **ESBuild**: Fast bundling for production server builds

### Asset Management
- **Static Assets**: Images and generated assets stored in attached_assets directory
- **Font Loading**: Google Fonts integration for Inter font family