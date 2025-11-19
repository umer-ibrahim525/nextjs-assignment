import dbConnect from './lib/db';
import Product from './models/Product';

const sampleProducts = [
  {
    name: 'iPhone 15 Pro',
    price: 999,
    description: 'The latest flagship smartphone from Apple with titanium design, A17 Pro chip, and advanced camera system.',
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=500&q=80',
  },
  {
    name: 'MacBook Air M3',
    price: 1199,
    description: '13-inch laptop with M3 chip, stunning Retina display, and up to 18 hours of battery life.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80',
  },
  {
    name: 'AirPods Pro',
    price: 249,
    description: 'Active Noise Cancellation, Adaptive Audio, and personalized Spatial Audio for immersive listening.',
    image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=500&q=80',
  },
  {
    name: 'Apple Watch Series 9',
    price: 429,
    description: 'Advanced health features, fitness tracking, and always-on Retina display.',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&q=80',
  },
  {
    name: 'iPad Pro 12.9"',
    price: 1099,
    description: 'M2 chip, Liquid Retina XDR display, and support for Apple Pencil and Magic Keyboard.',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80',
  },
  {
    name: 'Sony WH-1000XM5',
    price: 399,
    description: 'Industry-leading noise canceling headphones with exceptional sound quality and 30-hour battery life.',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&q=80',
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    price: 1199,
    description: 'Premium Android smartphone with S Pen, 200MP camera, and stunning AMOLED display.',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&q=80',
  },
  {
    name: 'Dell XPS 15',
    price: 1799,
    description: 'Powerful laptop with Intel Core i9, NVIDIA RTX graphics, and stunning 4K OLED display.',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&q=80',
  },
  {
    name: 'PlayStation 5',
    price: 499,
    description: 'Next-gen gaming console with ultra-high-speed SSD, ray tracing, and 4K gaming.',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&q=80',
  },
  {
    name: 'Bose QuietComfort Earbuds II',
    price: 299,
    description: 'Premium wireless earbuds with personalized noise cancellation and high-fidelity audio.',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80',
  },
];

async function seedProducts() {
  try {
    console.log('🌱 Starting to seed products...');
    
    // Connect to database
    await dbConnect();
    console.log('✅ Connected to database');

    // Clear existing products (optional - comment out if you want to keep existing)
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`✅ Successfully added ${products.length} products!`);

    // Display added products
    console.log('\n📦 Added products:');
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - $${product.price}`);
    });

    console.log('\n🎉 Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();
