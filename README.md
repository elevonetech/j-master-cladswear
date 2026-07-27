# J. MASTER CLADSWEAR

<p align="center">
  <img src="./src/assets/logo.jpeg" alt="J. MASTER CLADSWEAR" width="800">
</p>
**J. MASTER CLADSWEAR** is a premium footwear e-commerce platform built for Kenya's luxury shoe market. It provides a seamless, dynamic, and fully responsive shopping experience, allowing users to browse authentic sneakers, formal shoes, boots, and loafers, while seamlessly completing orders via WhatsApp integration.

## 🚀 Tech Stack

This project is built using modern web technologies to ensure lightning-fast performance and a smooth user experience:

- **Frontend Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling & Animations:** [Tailwind CSS v4](https://tailwindcss.com/) + [Framer Motion](https://www.framer.com/motion/)
- **Backend & Database:** [Supabase](https://supabase.com/) (PostgreSQL & Authentication)
- **Routing:** React Router v7
- **Deployment:** Vercel

## ✨ Key Features

- **Dynamic Storefront:** Fast, engaging, and fully responsive UI with smooth animations.
- **Advanced Filtering & Pagination:** Easily navigate hundreds of products by category and brand.
- **Cart & Wishlist:** Local state management for a seamless shopping experience.
- **WhatsApp Checkout:** Orders are formatted and sent directly to the business's WhatsApp for personalized fulfillment.
- **Secure Admin Dashboard:** Protected routes allowing store owners to perform full CRUD (Create, Read, Update, Delete) operations on their inventory.
- **Supabase Integration:** Real-time database updates and secure image hosting for product media.

## 🛠️ Local Development Setup

To run this project locally on your machine, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/elevonetech/j-master-cladswear.git
cd j-master-cladswear
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Database Setup
Execute the SQL provided in `supabase_schema.sql` within your Supabase project's SQL editor. This will:
- Create the `products` table.
- Configure Row Level Security (RLS) policies.
- Set up the `product-images` storage bucket.

### 5. Start the Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## 📦 Deployment

This project is optimized for deployment on **Vercel**. 
1. Connect your GitHub repository to Vercel.
2. Add your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to the Vercel Environment Variables.
3. Deploy!

*Note: A `vercel.json` file is included to strictly configure Content Security Policies (CSP) and ensure secure connections to the Supabase backend.*

## 📄 License

This project is proprietary and intended for use by J. MASTER CLADSWEAR.
