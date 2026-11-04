# 🌙 Luna Wear Store — Contemporary Luxury E-Commerce

> A full-stack, haute luxury fashion e-commerce platform built with modern **React 19**, **Vite**, **Express**, and **MongoDB**, powered by strict **ECMAScript Modules (ESM)** throughout.

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Key Features](#-key-features)
  - [1. Global Header & Navigation](#1-global-header--navigation)
  - [2. Homepage (Storefront)](#2-homepage-storefront)
  - [3. Product Listing Page (PLP) & Filters](#3-product-listing-page-plp--filters)
  - [4. Product Detail Page (PDP)](#4-product-detail-page-pdp)
  - [5. Shopping Bag & Slide-out Cart Drawer](#5-shopping-bag--slide-out-cart-drawer)
  - [6. Checkout Flow & Live Shipment Tracking](#6-checkout-flow--live-shipment-tracking)
  - [7. Customer Dashboard & Account Area](#7-customer-dashboard--account-area)
  - [8. Footer, Trust Badges & Customer Care](#8-footer-trust-badges--customer-care)
  - [9. Store Admin Console (OMS, Inventory & CRM)](#9-store-admin-console-oms-inventory--crm)
- [Project Architecture](#-project-architecture)
- [API Documentation](#-api-documentation)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Demo Accounts & Promo Codes](#demo-accounts--promo-codes)
- [License](#-license)

---

## 💎 Overview

**Luna Wear Store** is an elevated apparel shopping experience designed for high-end fashion lovers. It combines minimalist aesthetics with enterprise-ready e-commerce capabilities: rich variant selections (sizing, colors, fabrics, fits), instant cart drawer slide-outs, real-time coupon calculation with free-shipping meters, guest/member checkout, live shipment tracking stages, and an integrated Admin OMS & Analytics suite.

---

## 🛠 Tech Stack

### Frontend (`/client`)
- **Framework**: React 19 + Vite (ES Module)
- **Styling**: Vanilla CSS Design System with custom luxury tokens, glassmorphism, responsive grids, and micro-animations
- **Icons**: Lucide React + custom SVG payment & social icons
- **State Management**: React Context (`StoreContext`, `CartContext`, `AuthContext`) with `localStorage` persistence
- **Architecture**: Atomic component structure with reusable hooks (`useAuth`, `useCart`, `useFetch`) and service layer (`api.js`, `productService.js`, etc.)

### Backend (`/server`)
- **Runtime**: Node.js (ES Module `"type": "module"`)
- **Server Framework**: Express 4
- **Database**: MongoDB with Mongoose Schemas (User, Product, Category, Cart, Order, Review)
- **Zero-Friction Fallback**: Intelligent in-memory fallback store when local MongoDB is not running, guaranteeing 100% functionality out of the box
- **Security & Utilities**: JWT token authentication, CORS configuration, custom error handler middleware, and transactional email notification service

---

## ✨ Key Features

### 1. Global Header & Navigation
- **Announcement Bar**: Auto-rotating promotional alerts (e.g., Free Express Shipping over $75, discount vouchers).
- **Multi-Currency Selector**: Real-time conversion across **USD ($)**, **EUR (€)**, **GBP (£)**, **CAD (CA$)**, **AUD (AU$)**, and **JPY (¥)**.
- **Auto-Suggest Search**: Live product search bar with instant autocomplete suggestions and thumbnails.
- **Utility Actions**: User account menu with login state, interactive Wishlist drawer badge, and Cart bag counter.

### 2. Homepage (Storefront)
- **Hero Banner Slider**: High-impact seasonal collection slider with automatic rotation and call-to-actions.
- **Value Proposition Bar**: Badges for Complimentary Global Shipping, 30-Day Effortless Returns, 256-Bit SSL Encryption, and 24/7 Concierge Support.
- **Featured Categories**: Visual tiles for Outerwear, Silk Dresses, Selvedge Denim, and Tops & Knits.
- **Trending Carousel**: Smooth horizontal scroll showcase for popular items.
- **Promotional Banners**: Curated offers such as 20% off outerwear and capsule wardrobe bundle deals.
- **Instagram UGC Feed**: Community `#LunaStyle` social gallery with hover overlays.

### 3. Product Listing Page (PLP) & Filters
- **Category Header**: Curated editorial banner and descriptions for each collection.
- **Multi-Faceted Sidebar Filters**:
  - Filter by **Size** (`XS`, `S`, `M`, `L`, `XL`, `XXL`)
  - Filter by **Silhouette / Fit** (`Relaxed`, `Slim`, `Oversized`, `Tailored`)
  - Filter by **Price Range** (dynamic slider up to $500)
  - Filter by **Deals / Discount Tier** (10%+, 20%+, 30%+)
- **Sorting**: Newest Arrivals, Price: Low to High, Price: High to Low, Best Selling, and Highest Rated.
- **Product Cards**: Dual-image hover swap, price strikethrough savings, interactive color swatch dots, quick add to bag, and quick-view popups.

### 4. Product Detail Page (PDP)
- **Zoomable Image Gallery**: Thumbnail strip, angle switcher, and magnifier hover zoom.
- **Interactive Selectors**:
  - **Color Picker**: Visual swatches with live image update.
  - **Size Picker**: Real-time stock status (`In Stock`, `Only X Left`, `Sold Out`).
  - **Size Guide Modal**: Complete garment measurement charts with instant **Inches / Centimeters (CM)** toggle.
- **Accordion Details**: Fabric composition, care instructions, model sizing reference, and shipping/return policies.
- **Customer Reviews**: Star score breakdown, fit feedback meter (`Runs Small`, `True to Size`, `Runs Large`), and verified buyer review submission form.
- **"Complete The Look"**: Recommended cross-sell garments.

### 5. Shopping Bag & Slide-out Cart Drawer
- **Cart Drawer**: Slide-out panel accessible from any page.
- **Free Shipping Progress Meter**: Dynamic calculation (`"Add $X more to unlock Free Express Shipping!"`).
- **Promo Code Engine**: Real-time redemption (`LUNA20`, `WELCOME10`, `FREESHIP`).
- **Express Checkout**: One-click quick checkout with Apple Pay, Google Pay, and PayPal.

### 6. Checkout Flow & Live Shipment Tracking
- **Flexible Checkout**: Supports both **Guest Checkout** and authenticated member profiles with saved address autofill.
- **Delivery Method Selection**: Standard Tracked Shipping, Complimentary White Glove / Express, or Cash on Delivery (COD).
- **Payment Options**: Credit/Debit Cards (with client-side formatting), Apple Pay, Klarna (Pay in 4), and Cash on Delivery.
- **Order Confirmation Page**: Detailed order receipt, printable invoice, and live **5-stage shipment progress tracker** (`Confirmed` ➔ `QC & Tailoring` ➔ `Dispatched` ➔ `Out for Delivery` ➔ `Delivered`).

### 7. Customer Dashboard & Account Area
- **Order History & Invoices**: View past orders, live courier tracking numbers, and printable invoices.
- **Profile Settings**: Update name, contact email, phone number, and change account passwords.
- **Address Book**: Manage multiple delivery addresses and toggle default shipping destinations.
- **Saved Wishlist**: Grid of favorited items with one-click "Move to Bag".

### 8. Footer, Trust Badges & Customer Care
- **Newsletter Subscription**: Instant 10% discount promo code upon sign-up.
- **Customer Care Modals**: Built-in modal dialogs for:
  - FAQ (Frequently Asked Questions)
  - Size Chart & Fit Guide
  - Shipping & Delivery Policy
  - Returns & Exchange Portal
  - Contact Concierge Form
  - Brand Story & Sustainability Mission

### 9. Store Admin Console (OMS, Inventory & CRM)
- **Inventory & Catalog Management**: Add and update garment variants, retail/sale prices, materials, and manage stock counts.
- **Order Management System (OMS)**: Update order statuses (`Pending`, `Processing`, `Shipped`, `Delivered`, `Cancelled`) and assign tracking numbers.
- **Analytics & Reports**: Real-time KPI cards (Gross Revenue, Total Orders, Average Order Value, Conversion Rate), top-selling garments, and acquisition traffic channels.
- **Customer Relationship Management (CRM)**: Customer profiles with order counts, lifetime spend, and loyalty tiers (`VIP Gold`, `Silver`, `Bronze`).

---

## 📂 Project Architecture

```
luna-wear-store/
├── client/                     # React Frontend Application (Vite + ESM)
│   ├── public/
│   ├── src/
│   │   ├── assets/             # Logos, seed catalogs, media
│   │   │   └── seedData.js
│   │   ├── components/         # Reusable UI elements
│   │   │   ├── common/         # Navbar, Footer, AnnouncementBar, Modal, Icons, Toast
│   │   │   ├── product/        # ProductCard, ProductGrid, SizePicker, ImageGallery, SizeGuide, QuickView
│   │   │   ├── cart/           # CartDrawer, CartItem, OrderSummary
│   │   │   └── checkout/       # AddressForm, PaymentOptions, DeliveryMethodPicker
│   │   ├── context/            # StoreContext, CartContext, AuthContext
│   │   ├── hooks/              # useAuth, useCart, useFetch
│   │   ├── pages/              # Views / Page Components
│   │   │   ├── Home.jsx
│   │   │   ├── ProductList.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── OrderConfirmation.jsx
│   │   │   └── admin/          # AdminDashboard.jsx
│   │   ├── services/           # Axios/Fetch API service layer (api, productService, orderService, etc.)
│   │   ├── utils/              # Formatter helpers (currency, date, price calculation)
│   │   ├── App.jsx             # Main Router & Provider Tree
│   │   ├── main.jsx            # React Entry Point
│   │   ├── App.css             # Main Component & Page Styles
│   │   └── index.css           # Design Tokens, Reset & Typography
│   ├── package.json
│   └── vite.config.js
│
└── server/                     # Node.js + Express Backend (ESM)
    ├── config/                 # db.js, corsConfig.js, storageConfig.js
    ├── controllers/            # authController, productController, orderController, etc.
    ├── data/                   # Initial database seeds (seedData.js)
    ├── middleware/             # authMiddleware, adminGuard, errorHandler, uploadMiddleware
    ├── models/                 # Mongoose Schemas (User, Product, Category, Order, Cart, Review)
    ├── routes/                 # Express Routers (auth, products, categories, cart, orders, payments, admin)
    ├── services/               # storeService.js
    ├── utils/                  # generateJWT, sendEmail, formatResponse
    ├── .env                    # Environment configuration
    ├── package.json
    ├── seeder.js               # Database seeder script
    └── server.js               # Express server entry point
```

---

## 📡 API Documentation

Base URL: `http://localhost:5000/api`

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| **Authentication** | | |
| `/api/auth/login` | `POST` | Authenticate user & return JWT token |
| `/api/auth/register` | `POST` | Register a new customer account |
| `/api/auth/profile` | `GET` | Fetch authenticated user profile |
| `/api/auth/profile` | `PUT` | Update user details, addresses, and wishlist |
| **Products & Catalog** | | |
| `/api/products` | `GET` | Get filtered, sorted products catalog |
| `/api/products/:id` | `GET` | Fetch product details by ID |
| `/api/products` | `POST` | Create a new garment variant (Admin) |
| `/api/products/:id` | `PUT` | Update garment details and stock (Admin) |
| `/api/products/:id` | `DELETE` | Delete garment from catalog (Admin) |
| `/api/products/:id/reviews` | `GET` | Get verified customer reviews |
| `/api/products/:id/reviews` | `POST` | Submit a customer review |
| **Categories** | | |
| `/api/categories` | `GET` | Get all product categories |
| `/api/categories/:id` | `GET` | Get specific category details |
| **Cart** | | |
| `/api/cart` | `GET` | Get active cart session items |
| `/api/cart/sync` | `POST` | Sync cart state between client & server |
| `/api/cart/coupon` | `POST` | Validate and apply promo code |
| `/api/cart/clear` | `DELETE` | Empty current cart session |
| **Orders & OMS** | | |
| `/api/orders` | `POST` | Place a new customer order |
| `/api/orders` | `GET` | Fetch all orders (Admin OMS) |
| `/api/orders/:id` | `GET` | Get order details by ID or order number |
| `/api/orders/:id/status` | `PUT` | Update fulfillment status & tracking code (Admin) |
| `/api/orders/user/:email` | `GET` | Fetch customer purchase history |
| **Payments** | | |
| `/api/payments/methods` | `GET` | Get supported payment gateways |
| `/api/payments/process` | `POST` | Simulate payment transaction |
| **Admin & Analytics** | | |
| `/api/admin/analytics` | `GET` | Fetch revenue, AOV, conversion & sales reports |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18+ recommended)
- [npm](https://www.npmjs.com/) (version 9+)
- *(Optional)* [MongoDB Community Server](https://www.mongodb.com/try/download/community) running on port 27017 (if unavailable, the server seamlessly runs on an in-memory database).

---

### Backend Setup

1. Open a terminal and navigate to the `server/` directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Ensure the `.env` configuration file exists in `server/`:
   ```ini
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/luna_wear
   JWT_SECRET=luna_super_secret_jwt_key_2026
   CLIENT_URL=http://localhost:3000
   NODE_ENV=development
   ```

4. *(Optional)* Seed initial products into MongoDB:
   ```bash
   npm run seed
   ```

5. Start the backend server:
   ```bash
   npm start
   ```
   *The API will start at `http://localhost:5000`.*

---

### Frontend Setup

1. Open a second terminal and navigate to the `client/` directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The client application will start at `http://localhost:3000`.*

4. To create an optimized production build:
   ```bash
   npm run build
   ```

---

### Demo Accounts & Promo Codes

#### 🔑 Demo Accounts
| Role | Email | Password | Access |
| :--- | :--- | :--- | :--- |
| **Store Admin** | `haider@lunawear.com` | `password123` | Full access to Admin Console, OMS, Inventory, and CRM |
| **Customer** | *(Guest or any new registration)* | *(Any password)* | Storefront, PDP, Checkout, Dashboard |

#### 🏷 Active Promo Codes
| Code | Discount | Description |
| :--- | :--- | :--- |
| `LUNA20` | **20% OFF** | Mid-Season Seasonal Sale discount |
| `WELCOME10` | **10% OFF** | New member welcome incentive |
| `FREESHIP` | **Free Shipping** | Unlocks free express courier delivery |

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).
Crafted with intention and luxury aesthetics for **Luna Wear LLC**.
