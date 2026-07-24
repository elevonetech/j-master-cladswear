-- ==============================================================================
-- DAPPER / J. MASTER CLADSWEAR SUPABASE DATABASE SCHEMA
-- Execute this script in your Supabase SQL Editor to create the products table
-- and configure storage permissions.
-- ==============================================================================

-- 1. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    price NUMERIC NOT NULL DEFAULT 0,
    brand TEXT DEFAULT 'Generic',
    category TEXT DEFAULT 'Sneakers',
    collection TEXT DEFAULT 'General',
    gender TEXT DEFAULT 'Unisex',
    sizes JSONB DEFAULT '["39", "40", "41", "42", "43", "44"]'::jsonb,
    colors JSONB DEFAULT '["Black", "White"]'::jsonb,
    description TEXT,
    rating NUMERIC DEFAULT 4.5,
    reviews INTEGER DEFAULT 12,
    stock INTEGER DEFAULT 15,
    badge TEXT DEFAULT '',
    featured BOOLEAN DEFAULT false,
    best_seller BOOLEAN DEFAULT false,
    new_arrival BOOLEAN DEFAULT false,
    tags JSONB DEFAULT '[]'::jsonb,
    images JSONB DEFAULT '[]'::jsonb,
    specs JSONB DEFAULT '["Premium Quality", "Durable Build", "Comfort Fit"]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_brand ON public.products(brand);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(featured);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Allow public read access to products
CREATE POLICY "Allow public read access to products"
    ON public.products FOR SELECT
    USING (true);

-- Allow public / authenticated insert access to products
CREATE POLICY "Allow public insert access to products"
    ON public.products FOR INSERT
    WITH CHECK (true);

-- Allow public / authenticated update access to products
CREATE POLICY "Allow public update access to products"
    ON public.products FOR UPDATE
    USING (true)
    WITH CHECK (true);

-- Allow public / authenticated delete access to products
CREATE POLICY "Allow public delete access to products"
    ON public.products FOR DELETE
    USING (true);

-- 3. Create Storage Bucket for Product Images
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS Policies
CREATE POLICY "Public Read Product Images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'product-images');

CREATE POLICY "Public Upload Product Images"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Public Update Product Images"
    ON storage.objects FOR UPDATE
    USING (bucket_id = 'product-images');

CREATE POLICY "Public Delete Product Images"
    ON storage.objects FOR DELETE
    USING (bucket_id = 'product-images');
