import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";

interface ProductCardProps {
  name: string;
  price: number;
  description: string;
  image: string;
  href?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
}

export function ProductCard({
  name,
  price,
  description,
  image,
  href,
  onEdit,
  onDelete,
  className = "",
}: ProductCardProps) {
  const content = (
    <>
      {/* Product Image */}
      <div className="relative h-48 bg-gray-100 overflow-hidden group">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          unoptimized
        />
        {(onEdit || onDelete) && (
          <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {onEdit && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onEdit();
                }}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
            )}
            {onDelete && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onDelete();
                }}
                className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-lg"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-1">
          {description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-bold text-blue-600">
            ${price.toFixed(2)}
          </span>
          {href && (
            <span className="text-sm text-blue-600 font-medium hover:underline">
              View Details →
            </span>
          )}
        </div>
      </div>
    </>
  );

  const baseClasses = `bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return <div className={baseClasses}>{content}</div>;
}

interface ProductGridProps {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4;
}

export function ProductGrid({ children, columns = 4 }: ProductGridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <div className={`grid grid-cols-1 ${gridCols[columns]} gap-6`}>
      {children}
    </div>
  );
}

interface ProductListItemProps {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  createdAt: string;
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function ProductListItem({
  id,
  name,
  price,
  description,
  image,
  createdAt,
  onView,
  onEdit,
  onDelete,
}: ProductListItemProps) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-12 w-12 flex-shrink-0 relative rounded-lg overflow-hidden">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-semibold text-gray-900">{name}</div>
            <div className="text-xs text-gray-500">ID: {id.slice(-8)}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-bold text-gray-900">
          ${price.toFixed(2)}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-700 max-w-xs truncate">
          {description}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(createdAt).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
        {onView && (
          <button
            onClick={onView}
            className="text-blue-600 hover:text-blue-900 font-semibold"
          >
            View
          </button>
        )}
        {onEdit && (
          <button
            onClick={onEdit}
            className="text-indigo-600 hover:text-indigo-900 font-semibold"
          >
            Edit
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="text-red-600 hover:text-red-900 font-semibold"
          >
            Delete
          </button>
        )}
      </td>
    </tr>
  );
}

interface ProductTableProps {
  children: ReactNode;
}

export function ProductTable({ children }: ProductTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="flex items-center justify-between">
          <div className="h-8 bg-gray-200 rounded w-20"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
}
