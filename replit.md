# Overview

FutureWeb is a futuristic 3D web application that combines an immersive React Three Fiber frontend with an Express backend. The application features a cyberpunk-themed 3D interface with interactive elements, particle effects, and holographic visuals. The backend provides user authentication, login event tracking, and purchase management through a REST API backed by PostgreSQL.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript, using Vite as the build tool
- **3D Graphics**: React Three Fiber ecosystem (@react-three/fiber, @react-three/drei, @react-three/postprocessing) for WebGL-based 3D rendering with custom shaders via vite-plugin-glsl
- **Styling**: Tailwind CSS with custom futuristic CSS variables and a comprehensive Radix UI component library for accessible UI elements
- **State Management**: Zustand stores for navigation state (useNavigation), audio controls (useAudio), authentication (useAuth), shopping cart (useCart), and game state (useGame)
- **Data Fetching**: TanStack React Query with custom query functions for API communication
- **Routing**: Section-based navigation within a single-page application (home, about, projects, contact sections)

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL via Neon Database serverless driver with Drizzle ORM for type-safe queries
- **Authentication**: Password hashing with bcryptjs, session-based user management
- **API Structure**: RESTful endpoints under /api prefix for auth (register/login), login-events, and purchases
- **Development**: Vite middleware integration for hot module replacement during development

## Database Schema
Three main tables defined in shared/schema.ts:
- **users**: id, username (unique), password (hashed), createdAt
- **loginEvents**: id, userId (FK), username, loginTime, ipAddress, userAgent
- **purchases**: id, userId (FK), username, projectName, projectId, amount, currency, purchaseTime

## Project Structure
- **client/**: React frontend with components organized by function (3d/, effects/, ui/, pages/)
- **server/**: Express backend with routes.ts, storage.ts (database layer), and vite.ts (dev server integration)
- **shared/**: Common code including database schema and Zod validation schemas
- **Path Aliases**: @/ maps to client/src/, @shared/ maps to shared/

## 3D Scene Components
The 3D experience is built from modular components:
- **Scene**: Main orchestrator with camera animations based on navigation state
- **FuturisticCube**: Interactive 3D cube with hover/click states and holographic materials
- **ParticleField**: Ambient particle system with cyberpunk color palette
- **NeonGrid**: Ground-plane reference grid
- **FloatingPlatform**: Animated platform element
- **Lights**: Animated point lights and ambient lighting
- **PostProcessing**: Fog effects for depth
- **LoadingScene**: 3D loading animation with rings and particles

# External Dependencies

## Database
- **Neon Database**: PostgreSQL hosting via @neondatabase/serverless with WebSocket support
- **Drizzle ORM**: Type-safe database operations with drizzle-kit for migrations

## UI Components
- **Radix UI**: Full suite of accessible primitives (accordion, dialog, dropdown, tabs, toast, etc.)
- **shadcn/ui pattern**: Radix components styled with Tailwind CSS and class-variance-authority

## 3D Graphics
- **Three.js**: Core 3D library accessed through React Three Fiber
- **React Three Fiber**: React renderer for Three.js
- **@react-three/drei**: Helper components and utilities
- **@react-three/postprocessing**: Post-processing effects

## Build Tools
- **Vite**: Frontend build tool with HMR
- **ESBuild**: Server bundling for production
- **vite-plugin-glsl**: GLSL shader support
- **@replit/vite-plugin-runtime-error-modal**: Enhanced error display in development

## Other
- **TanStack React Query**: Server state management
- **Zustand**: Client state management
- **bcryptjs**: Password hashing
- **Inter font**: Typography via @fontsource/inter