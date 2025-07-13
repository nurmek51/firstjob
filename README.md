# FirstJob Mobile App

A pixel-perfect mobile-only web application built with Vue 3, TypeScript, and Vite, now fully integrated with a backend API.

## Features

- ✅ Vue 3 + TypeScript + Vite
- ✅ Mobile-only design (394px width)
- ✅ Pixel-perfect implementation from Figma
- ✅ Scoped CSS for consistent styling
- ✅ Pinia state management for all modules
- ✅ Axios for API communication
- ✅ Clean and scalable architecture
- ✅ TypeScript for type safety
- ✅ ESLint + Prettier configured

## Project Structure

```
src/
├── assets/          # Static assets (icons, images)
│   ├── fonts/       # Custom fonts (Mabry Pro)
│   └── icons/       # SVG icons
├── components/      # Reusable Vue components
│   ├── common/      # Common/shared components
│   ├── layout/      # Layout components (header, nav)
│   └── products/    # Product-specific components
├── pages/           # Page components for each route
├── router/          # Vue Router configuration
├── services/        # API services for each module
├── stores/          # Pinia stores for state management
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
└── style.css        # Global styles and CSS variables
```

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- A running instance of the backend API at `https://firstjob-api.onrender.com`

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Development

The app is designed as mobile-only with a fixed width of 394px. All components are built to be pixel-perfect according to the Figma design.

### Styling Architecture

The project uses **scoped CSS** for component styling:

- Each Vue component has its own `<style scoped>` section
- Global styles and CSS variables are defined in `src/style.css`
- No utility-first CSS framework - all styles are custom and pixel-perfect
- Consistent use of CSS variables for colors, spacing, and other design tokens

### Key Design Tokens

- **Primary Color**: #15BAAA
- **Font**: Mabry Pro (with Inter fallback)
- **Mobile Width**: 394px
- **Border Radius**: 8px, 12px, 16px
- **Spacing**: 4px, 8px, 12px, 16px, 20px, 24px

### State Management

The app uses Pinia for state management. Stores are located in `src/stores/`:

- `products.ts` - Manages product data
- `categories.ts` - Manages category data
- `sales.ts` - Manages sales data
- `cart.ts` - Manages the shopping cart

### API Integration

The app communicates with a backend API using Axios:

- Base URL: `https://firstjob-api.onrender.com`
- Services are organized by feature in `src/services/`
- Full TypeScript support for API responses
- Error handling and loading states

## Architecture Decisions

1. **Mobile-Only**: The app is designed specifically for mobile devices with a fixed 394px width
2. **Scoped CSS**: Each component has its own scoped styles for better maintainability and no style conflicts
3. **Component Structure**: Components are organized by feature and type for better scalability
4. **Type Safety**: Full TypeScript integration for better developer experience
5. **Service Layer**: Separates API calls from components for better testability and is built on top of Axios
6. **Pinia Stores**: Modern state management with composition API style, with a dedicated store for each module
7. **Pixel-Perfect**: All components are implemented to match the Figma design exactly

## Pages

- **Sales** (`/sales`) - Main sales page with history and new sale button
- **Categories** (`/categories`) - Product categories selection
- **Products** (`/products`) - Product listing with search and cart functionality
- **Checkout** (`/checkout`) - Order confirmation and payment method selection
- **Receipt** (`/receipt`) - Transaction receipt display

## Components

### Common Components
- `SaleItem` - Individual sale item display
- `NavItem` - Navigation item component
- `Separator` - Visual separator component

### Layout Components
- `AppHeader` - Application header with title and close button
- `BottomNavigation` - Bottom navigation bar

### Product Components
- `ProductItem` - Individual product display with controls
- `ProductControls` - Quantity controls and action buttons
