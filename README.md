<div align="center">

<img src="./src/assets/logo.jpeg" alt="J. MASTER CLADSWEAR" width="700">

# J. MASTER CLADSWEAR

**Premium footwear, delivered.**
A luxury sneaker & shoe e-commerce platform built for Kenya's high-end footwear market.

[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-Build-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-Proprietary-lightgrey)](#-license)

</div>

---

## 📖 Overview

**J. MASTER CLADSWEAR** is a premium footwear e-commerce platform built for Kenya's luxury shoe market. It delivers a seamless, dynamic, and fully responsive shopping experience — letting customers browse authentic sneakers, formal shoes, boots, and loafers, and complete orders directly via WhatsApp.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🛍️ **Dynamic Storefront** | Fast, engaging, fully responsive UI with smooth Framer Motion animations |
| 🔍 **Advanced Filtering & Pagination** | Navigate hundreds of products by category and brand with ease |
| 🛒 **Cart & Wishlist** | Local state management for a frictionless shopping experience |
| 💬 **WhatsApp Checkout** | Orders are formatted and sent straight to the business's WhatsApp for personalized fulfillment |
| 🔐 **Secure Admin Dashboard** | Protected routes with full CRUD (Create, Read, Update, Delete) on inventory |
| ⚡ **Supabase Integration** | Real-time database updates and secure image hosting for product media |

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) |
| **Styling & Animation** | [Tailwind CSS v4](https://tailwindcss.com/) + [Framer Motion](https://www.framer.com/motion/) |
| **Backend & Database** | [Supabase](https://supabase.com/) (PostgreSQL & Authentication) |
| **Routing** | React Router v7 |
| **Deployment** | Vercel |

---

## 🛠️ Local Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/elevonetech/j-master-cladswear.git
cd j-master-cladswear
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Set up the database

Run the SQL in `supabase_schema.sql` inside your Supabase project's SQL editor. This will:

- Create the `products` table
- Configure Row Level Security (RLS) policies
- Set up the `product-images` storage bucket

### 5. Start the dev server

```bash
npm run dev
```

The app will be available at **`http://localhost:5173`**.

---

## 📦 Deployment

This project is optimized for deployment on **Vercel**.

1. Connect your GitHub repository to Vercel.
2. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to the Vercel Environment Variables.
3. Deploy 🚀







---

## 📄 License

This project is proprietary and intended solely for use by **J. MASTER CLADSWEAR**.

<div align="center">

Made with 🖤 for Kenya's luxury footwear market

</div>
