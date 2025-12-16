# Overview

This is a futuristic 3D web application that combines a React frontend with an Express backend. The application features an immersive 3D interface built with React Three Fiber, showcasing various interactive 3D elements like floating platforms, holographic cubes, particle fields, and neon grids. The frontend presents a sci-fi themed portfolio/showcase website with sections for home, about, projects, and contact, all rendered over a dynamic 3D scene.

The backend provides a REST API foundation with user management capabilities, using PostgreSQL with Drizzle ORM for data persistence. The application is structured as a full-stack TypeScript project with modern tooling and development practices.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for build tooling
- **3D Graphics**: React Three Fiber ecosystem including @react-three/drei, @react-three/fiber, and @react-three/postprocessing for WebGL-based 3D rendering
- **Styling**: Tailwind CSS with custom futuristic theme variables and Radix UI components for accessible UI elements
- **State Management**: Zustand stores for navigation state, audio controls, and game state management
- **Data Fetching**: TanStack React Query for server state management with custom query functions
- **Asset Support**: GLSL shader support via vite-plugin-glsl, with asset handling for 3D models (.gltf, .glb) and audio files

## Backend Architecture
- **Framework**: Express.js with TypeScript for the REST API server
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Development**: Hot module replacement in development mode with Vite integration
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development and database implementation for production
- **API Structure**: Centralized route registration with /api prefix for all endpoints
- **Build Process**: ESBuild for server bundling and Vite for client bundling

## Project Structure
- **Monorepo Layout**: Client, server, and shared code in separate directories with shared TypeScript configuration
- **Shared Schema**: Common database schema and validation logic in the `shared/` directory using Drizzle and Zod
- **Path Aliases**: TypeScript path mapping for clean imports (`@/` for client, `@shared/` for shared code)

## 3D Scene Architecture
The 3D scene consists of modular components including:
- **Scene Management**: Central Scene component orchestrating all 3D elements with camera animations based on navigation state
- **Interactive Elements**: FuturisticCube with hover/click interactions, FloatingPlatform with animations, ParticleField for ambient effects
- **Visual Effects**: NeonGrid for spatial reference, custom Lights setup with animated point lights, PostProcessing with fog effects
- **User Controls**: Keyboard controls for navigation (WASD, arrow keys, E for interact, R for reset)

## External Dependencies

- **Database**: Neon Database (PostgreSQL) via @neondatabase/serverless for production database hosting
- **UI Components**: Radix UI component library for accessible, unstyled UI primitives
- **3D Graphics**: Three.js ecosystem through React Three Fiber for WebGL rendering
- **Development Tools**: Replit integration with vite-plugin-runtime-error-modal for enhanced development experience
- **Fonts**: Inter font via @fontsource for consistent typography
- **Build Tools**: ESBuild for server bundling, PostCSS with Autoprefixer for CSS processing