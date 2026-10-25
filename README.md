# 🛍️ Laravel & Vue 3 Enterprise E-Commerce Platform

[![Laravel](https://img.shields.io/badge/Laravel-10%20%2F%2011-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com/)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vue Router](https://img.shields.io/badge/Vue_Router-4.x-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://router.vuejs.org/)
[![Axios](https://img.shields.io/badge/Axios-HTTP_Client-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)

> An end-to-end fullstack E-Commerce solution featuring a **Laravel RESTful API** backend and a dedicated, responsive **Vue 3 Single Page Application (SPA) Admin Backoffice** powered by **Vite** and **Tailwind CSS**.

---

## 🌟 Architectural Architecture

```mermaid
graph TD
    Storefront[Customer Storefront] -->|REST API| Laravel[Laravel Core Backend API]
    AdminSPA[Vue 3 + Vite Admin Dashboard] -->|Axios Bearer Auth| Laravel
    Laravel --> DB[(MySQL / Relational Database)]
    Laravel --> Storage[Local / S3 Media Storage]
```

---

## 🚀 Key Features

### 🔧 Backend Core (Laravel)
- **Customer & Address Management:** Multi-address support per customer with default shipping/billing destination rules.
- **Cart & Order Processing:** Real-time stock validation, persistent shopping cart items, order breakdown, and payment status lifecycle.
- **Product Catalog:** Category hierarchies, rich descriptions, image galleries, and pricing.
- **Token Authentication:** Secure API authentication via Laravel Sanctum with Bearer token headers.

### 💻 Admin Backoffice (`admin/`) — Vue 3 & Vite
- **Modern Composition API:** Written in modular Vue 3 with scalable component design.
- **Centralized State Management:** Reactive store handling authentication tokens, global loading states, and API error toasts.
- **Client-Side Routing:** Vue Router 4 with navigation guards for protected admin routes.
- **Tailwind UI Components:** Clean, high-contrast dashboard layout with data tables, pagination, and modals.

---

## 📂 Repository Layout

```text
laravel_vue_ecommerce/
├── admin/                      # Vue 3 + Vite Single Page Application
│   ├── src/
│   │   ├── components/         # Reusable UI elements (Navbar, Sidebar, Modals)
│   │   ├── views/              # Admin view pages (Products, Orders, Customers)
│   │   ├── router/             # Vue Router route map & route guards
│   │   ├── store/              # Centralized reactive state
│   │   └── axios.js            # Pre-configured HTTP client with interceptors
│   ├── package.json
│   └── vite.config.js
├── app/                        # Laravel Application Layer
│   ├── Http/Controllers/       # API endpoints (Auth, Cart, Order, Product)
│   └── Models/                 # Customer, Order, OrderItem, Product, CartItem
├── database/migrations/        # Relational schema migrations
└── routes/
    └── api.php                 # Versioned REST API endpoints
```

---

## 🛠️ Getting Started

### 1. Backend Setup
```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

### 2. Admin Panel Setup
```bash
cd admin
npm install
npm run dev
```

---

## 📄 License
This open-source project is licensed under the MIT License.
