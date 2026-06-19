# React TypeScript E-Commerce App

A modern e-commerce web application built with React, TypeScript, Redux Toolkit, React Router, Axios, React Hook Form, and Zod.

This project includes authentication, protected routes, role-based admin access, product listing, product details, cart management, checkout flow, form validation, API handling, Axios interceptors, performance optimization, and route-based lazy loading.

## Features

* User login with API authentication
* Protected routes for authenticated users
* Role-based route protection for admin pages
* Product listing page
* Product search and category filtering
* Product details page
* Add to cart functionality
* Increase, decrease, and remove cart items
* Cart total and item count calculation
* Checkout form with React Hook Form and Zod validation
* Login form with React Hook Form and Zod validation
* Order success page
* Axios instance with environment-based base URL
* Axios request interceptor for automatic token attachment
* Axios response interceptor for 401 logout and redirect handling
* Global API error handling utility
* Redux Toolkit slices, async thunks, and memoized selectors
* LocalStorage persistence for auth and cart data
* Lazy loading and Suspense for route-based code splitting
* Performance optimization using React.memo, useCallback, useMemo, and createSelector
* Fully typed with TypeScript

## Tech Stack

* React
* TypeScript
* Vite
* Redux Toolkit
* React Redux
* React Router DOM
* Axios
* React Hook Form
* Zod
* Bootstrap
* Font Awesome
* CSS
* LocalStorage

## Project Structure

```text
src/
├── app/
│   ├── hooks.ts
│   └── store.ts
│
├── components/
│   ├── ErrorMessage.tsx
│   ├── FormInput.tsx
│   ├── FormSelect.tsx
│   ├── FormTextarea.tsx
│   ├── Loader.tsx
│   ├── MainLayout.tsx
│   ├── Navbar.tsx
│   ├── ProtectedRoute.tsx
│   └── RoleProtectedRoute.tsx
│
├── features/
│   ├── auth/
│   │   ├── authAPI.ts
│   │   ├── authSelectors.ts
│   │   └── authSlice.ts
│   │
│   ├── cart/
│   │   ├── cartSelectors.ts
│   │   └── cartSlice.ts
│   │
│   └── products/
│       ├── components/
│       │   ├── ProductCard.tsx
│       │   └── ProductGrid.tsx
│       ├── productsAPI.ts
│       ├── productsSelectors.ts
│       └── productsSlice.ts
│
├── hooks/
│   ├── useAuth.ts
│   ├── useCart.ts
│   ├── useDebounce.ts
│   └── useProducts.ts
│
├── pages/
│   ├── AdminDashboard.tsx
│   ├── Cart.tsx
│   ├── Checkout.tsx
│   ├── Dashboard.tsx
│   ├── Login.tsx
│   ├── NotFound.tsx
│   ├── OrderSuccess.tsx
│   ├── ProductDetails.tsx
│   ├── Products.tsx
│   └── Unauthorized.tsx
│
├── routes/
│   └── AppRoutes.tsx
│
├── services/
│   └── api.ts
│
├── styles/
│   └── global.css
│
├── types/
│   ├── auth.ts
│   ├── cart.ts
│   └── product.ts
│
├── utils/
│   └── getApiErrorMessage.ts
│
├── App.tsx
├── main.tsx
└── vite-env.d.ts
```

## Environment Variables

Create a `.env` file in the root directory and add:

```env
VITE_API_BASE_URL=https://dummyjson.com
```

The app uses this value inside the Axios instance.

## Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Go to the project folder:

```bash
cd <project-folder-name>
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Available Scripts

Run the project in development mode:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Run TypeScript type checking:

```bash
npm run type-check
```

Preview the production build:

```bash
npm run preview
```

Run linting:

```bash
npm run lint
```

## Demo Login Credentials

```text
Username: emilys
Password: emilyspass
```

## Authentication Flow

```text
User submits login form
↓
React Hook Form validates input
↓
Zod schema validates data
↓
loginUser Redux thunk is dispatched
↓
loginAPI sends request to /auth/login
↓
Token is returned from API
↓
Token is saved in Redux state and localStorage
↓
fetchUser thunk is dispatched
↓
Axios request interceptor attaches token automatically
↓
User data is fetched from /auth/me
↓
User data is saved in Redux state and localStorage
↓
User is redirected to dashboard
```

## Axios Interceptor Flow

### Request Interceptor

The request interceptor automatically attaches the token to API requests.

```text
API request starts
↓
Interceptor checks token in localStorage
↓
If token exists, Authorization header is added
↓
Request is sent to backend
```

### Response Interceptor

The response interceptor handles unauthorized API responses.

```text
API response returns 401
↓
Token and user data are removed from localStorage
↓
User is redirected to login page
```

## Redux Flow

```text
Component
↓
Custom Hook
↓
Redux Thunk / Redux Action
↓
API Service
↓
Axios Instance
↓
Redux Slice updates state
↓
Selector reads state
↓
Component re-renders with updated data
```

## Performance Optimizations

This project includes multiple performance improvements:

* `React.memo` for repeated components like ProductCard, ProductGrid, CartItem, and reusable form components
* `useCallback` for stable event handler references
* `useMemo` for optimized cart item lookup in ProductGrid
* `createSelector` for memoized Redux derived values
* Lazy loading with `React.lazy`
* Suspense fallback using Loader
* Route-based code splitting for better initial load performance

## Main Pages

* `/` — Login page
* `/dashboard` — Dashboard page
* `/products` — Products listing page
* `/products/:id` — Product details page
* `/cart` — Cart page
* `/checkout` — Checkout page
* `/order-success` — Order success page
* `/admin` — Admin dashboard
* `/unauthorized` — Unauthorized page

## Build Status

The project supports:

```bash
npm run type-check
npm run build
```

Both commands should run successfully before deployment.

## Notes

This project is built for learning and practice purposes. It demonstrates real-world frontend concepts such as authentication, API handling, Redux architecture, TypeScript typing, protected routing, form validation, performance optimization, and clean project structure.
