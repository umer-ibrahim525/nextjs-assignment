import { z } from 'zod';

export const productSchema = z.object({
    name: z
        .string()
        .min(1, 'Product name is required')
        .max(100, 'Product name cannot exceed 100 characters')
        .trim(),
    price: z
        .number({ message: 'Price must be a valid number' })
        .positive('Price must be greater than 0')
        .finite('Price must be a valid number'),
    description: z
        .string()
        .min(1, 'Product description is required')
        .max(1000, 'Product description cannot exceed 1000 characters')
        .trim(),
    image: z
        .string()
        .min(1, 'Product image is required')
        .url('Product image must be a valid URL')
        .or(z.string().regex(/^\/.*\.(jpg|jpeg|png|gif|webp)$/i, 'Invalid image path')),
});

// Schema for creating a product (all fields required)
export const createProductSchema = productSchema;

// Schema for updating a product (all fields optional)
export const updateProductSchema = productSchema.partial();

// Type inference
export type ProductInput = z.infer<typeof productSchema>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
