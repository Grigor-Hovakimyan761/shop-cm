# AGENTS.md

**Guide for AI Coding Agents working in this repository**

This document provides essential information for AI agents (like yourself) working on this React + TypeScript e-commerce project.

---

## Project Overview

**Tech Stack:**
- **Framework**: React 19.2.0 with TypeScript (~5.9.3)
- **Build Tool**: Vite 7.2.4
- **Routing**: React Router DOM 7.9.6
- **Styling**: Tailwind CSS 4.1.17 + component-specific CSS files
- **Linting**: ESLint 9.39.1 with TypeScript ESLint
- **Type Checking**: Strict TypeScript mode enabled

**Project Type:** E-commerce shop web application (SHOP.CO)

---

## Build, Lint, and Test Commands

### Standard Commands
```bash
npm run dev          # Start development server (Vite dev server)
npm run build        # Type check (tsc -b) + production build
npm run lint         # Run ESLint on all files
npm run preview      # Preview production build locally
```

### Single File Operations
**Note:** No test framework is configured in this project.

**Lint a single file:**
```bash
npx eslint src/components/Header/Header.tsx
```

**Type check without building:**
```bash
npx tsc --noEmit
```

---

## Project Structure

```
shop-cm/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Header/
│   │   │   ├── Header.tsx
│   │   │   └── header.css
│   │   ├── Footer/
│   │   ├── ProductCard/
│   │   └── RatingStars/
│   ├── pages/               # Page components (routes)
│   │   ├── Home.tsx
│   │   ├── Category.tsx
│   │   ├── ProductDetail.tsx
│   │   └── Cart.tsx
│   ├── templates/           # Layout templates
│   │   └── MainTemplates.tsx
│   ├── images/              # Static images
│   ├── fonts/               # Custom fonts
│   ├── App.tsx              # Root app with routing
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── dist/                    # Build output (ignored)
├── node_modules/            # Dependencies (ignored)
└── public assets in src/    # Images, fonts served via Vite
```

---

## Code Style Guidelines

### Import Organization

**Order:**
1. External libraries (React, React Router, etc.)
2. Internal components
3. CSS files (always last)

**Example:**
```typescript
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import RatingStars from '../components/RatingStars/RatingStars';
import ProductCard from '../components/ProductCard/ProductCard';
```

**Import style:**
- Use named imports for React hooks: `import { useState, useEffect } from 'react'`
- Use default imports for components
- CSS imports always at the end

### TypeScript Conventions

**Interfaces over Types:**
```typescript
interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: number;
}
```

**Type Safety:**
- Always define prop interfaces for components
- Use TypeScript strict mode (already enabled)
- Explicitly type useState: `const [loading, setLoading] = useState<boolean>(true)`
- Type function parameters and return values when not obvious
- No `any` types - use proper typing

**Naming:**
- Interfaces: PascalCase with descriptive names (e.g., `ProductCardProps`, `CustomerReview`)
- Props interfaces: `{ComponentName}Props` pattern

### Component Structure

**Functional Components (default export):**
```typescript
import './ComponentName.css';

interface ComponentNameProps {
  // props
}

const ComponentName = ({ prop1, prop2 }: ComponentNameProps) => {
  // hooks
  // handlers
  // effects
  
  return (
    // JSX
  );
};

export default ComponentName;
```

**Component Organization:**
- Each component in its own folder with co-located CSS
- One component per file
- Export component as default at the end of file

### Naming Conventions

**Files:**
- Components: `PascalCase.tsx` (e.g., `ProductCard.tsx`, `Header.tsx`)
- CSS: `lowercase.css` or `PascalCase.css` (e.g., `header.css`, `ProductCard.css`)
- Pages: `PascalCase.tsx` (e.g., `Home.tsx`, `Category.tsx`)

**Variables & Functions:**
- Variables: `camelCase` (e.g., `customerReviews`, `topSelling`)
- Functions: `camelCase` (e.g., `scroll`, `handleClick`)
- Components: `PascalCase` (e.g., `ProductCard`, `RatingStars`)
- Constants: `camelCase` or `UPPER_SNAKE_CASE` for true constants

**CSS Classes:**
- Use `kebab-case` (e.g., `product-card-link`, `hero-section`)
- BEM-style naming acceptable (e.g., `review-card`, `search-container`)

### React Patterns

**Hooks:**
- Use functional components with hooks (no class components)
- Hook order: useState, useRef, useNavigate/useLocation, useEffect
- Custom hooks: prefix with `use` (e.g., `useFetch`)

**State Management:**
- Local state with `useState` for component-specific state
- No global state management library in use (Redux, Zustand, etc.)
- Props drilling is acceptable for this project size

**Event Handlers:**
- Inline handlers for simple cases: `onClick={() => navigate('/path')}`
- Named handlers for complex logic: `const handleSubmit = () => {...}`

**Router:**
- Use React Router DOM's `useNavigate` for programmatic navigation
- Use `Link` component for navigation links
- Route params: `useParams()` hook

### Styling Approach

**CSS:**
- Component-specific CSS files co-located with components
- Global styles in `index.css`
- Tailwind CSS utility classes + custom CSS hybrid approach
- Import CSS at the end of component file

**Tailwind:**
- Tailwind configured via `@tailwindcss/vite` plugin
- Use utility classes in JSX: `className="flex items-center"`

**Inline Styles:**
- Acceptable for dynamic styles or one-off adjustments
- Object syntax: `style={{ width: '100%', height: '100%' }}`

### Error Handling

**Fetch/API Calls:**
```typescript
fetch(url)
  .then(res => res.json())
  .then(data => setData(data))
  .catch((error) => {
    console.error('Error fetching data:', error);
    setLoading(false);
  });
```

**Console Methods:**
- Use `console.error()` for errors
- Use `console.log()` for debugging (remove before production)

---

## Common Patterns in This Codebase

**Fetching Data:**
```typescript
useEffect(() => {
  const BASE_URL = 'https://692dbd1de5f67cd80a4cc554.mockapi.io/api';
  
  fetch(`${BASE_URL}/products`)
    .then(res => res.json())
    .then(data => {
      setProducts(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      setLoading(false);
    });
}, []);
```

**Navigation:**
```typescript
const navigate = useNavigate();
// Usage:
onClick={() => navigate('/Category')}
```

**Conditional Rendering:**
```typescript
{loading && <p>Loading products...</p>}
{products.map((product) => <ProductCard key={product.id} {...product} />)}
```

---

## Important Notes

1. **No Test Framework**: This project does not have Jest, Vitest, or any testing framework configured.

2. **Strict TypeScript**: The project uses strict mode. Always provide proper types.

3. **Comments**: Some existing comments are in Armenian. When adding new comments, use English for consistency.

4. **Build Process**: Always run `npm run build` to ensure type checking passes before committing.

5. **ESLint**: Fix linting errors before committing. Run `npm run lint` to check.

6. **Vite**: This is a Vite project, not Create React App. Import paths and asset handling differ.

7. **No PropTypes**: Use TypeScript interfaces instead of PropTypes.

8. **API**: Mock API endpoint: `https://692dbd1de5f67cd80a4cc554.mockapi.io/api/products`

---

**Last Updated:** 2026-02-03
