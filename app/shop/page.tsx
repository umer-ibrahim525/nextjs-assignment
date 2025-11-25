import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";

// Product type
interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface ProductsResponse {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Fetch products server-side directly from DB
async function getProducts(): Promise<ProductsResponse> {
  try {
    await dbConnect();

    const limit = 100;
    const [products, total] = await Promise.all([
      Product.find({})
        .sort({ createdAt: -1 })
        .limit(limit)
        .lean(),
      Product.countDocuments({}),
    ]);

    // Serialize the data
    const serializedProducts = products.map((product) => ({
      _id: product._id.toString(),
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      createdAt: product.createdAt?.toISOString() || new Date().toISOString(),
      updatedAt: product.updatedAt?.toISOString() || new Date().toISOString(),
    }));

    return {
      products: serializedProducts,
      pagination: { page: 1, limit, total, totalPages: Math.ceil(total / limit) },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      products: [],
      pagination: { page: 1, limit: 100, total: 0, totalPages: 0 },
    };
  }
}

// Product Grid Component
async function ProductGrid() {
  const data = await getProducts();
  const { products } = data;

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <svg
          className="w-24 h-24 text-gray-400 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          No products available
        </h3>
        <p className="text-gray-600">Check back soon for new products!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link
          key={product._id}
          href={`/shop/${product._id}`}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
        >
          {/* Product Image */}
          <div className="relative h-64 bg-gray-200 overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              unoptimized
            />
          </div>

          {/* Product Info */}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {product.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-blue-600">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-sm text-blue-600 font-medium group-hover:underline">
                View Details →
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

// Loading Skeleton
function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-64 bg-gray-200 animate-pulse"></div>
          <div className="p-4 space-y-3">
            <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
            <div className="flex items-center justify-between">
              <div className="h-8 bg-gray-200 rounded animate-pulse w-20"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Main Shop Page
export const revalidate = 60; // Revalidate every 60 seconds

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Shop</h1>
              <p className="text-gray-600 mt-1">
                Browse our collection of products
              </p>
            </div>
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <Suspense fallback={<div className="text-gray-600">Loading...</div>}>
            <ProductStats />
          </Suspense>
        </div>

        {/* Product Grid with Suspense */}
        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductGrid />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 Next Admin Shop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Product Stats Component
async function ProductStats() {
  const data = await getProducts();
  const { products, pagination } = data;

  const totalValue = products.reduce((sum, product) => sum + product.price, 0);
  const avgPrice = products.length > 0 ? totalValue / products.length : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <p className="text-sm text-gray-600">Total Products</p>
        <p className="text-2xl font-bold text-gray-900">{pagination.total}</p>
      </div>
      <div>
        <p className="text-sm text-gray-600">Average Price</p>
        <p className="text-2xl font-bold text-gray-900">
          ${avgPrice.toFixed(2)}
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-600">Total Value</p>
        <p className="text-2xl font-bold text-gray-900">
          ${totalValue.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
