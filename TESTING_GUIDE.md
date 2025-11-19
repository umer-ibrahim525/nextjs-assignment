# Testing Your Next.js Admin Dashboard

## 🚀 Quick Start Guide

### 1. **Start the Development Server**
```bash
npm run dev
```
Visit: http://localhost:3000

---

## 📍 Available Pages

### **Public Pages** (No login required)
- **Home**: http://localhost:3000
- **Shop**: http://localhost:3000/shop
- **Product Details**: http://localhost:3000/shop/[id]
- **Login**: http://localhost:3000/login
- **Register**: http://localhost:3000/register

### **Protected Pages** (Login required)
- **Dashboard**: http://localhost:3000/dashboard
- **Products List**: http://localhost:3000/dashboard/products
- **Create Product**: http://localhost:3000/dashboard/products/new
- **Edit Product**: http://localhost:3000/dashboard/products/[id]

---

## 🔐 Testing Authentication

### **Step 1: Create an Account**
1. Go to: http://localhost:3000/register
2. Fill in:
   - Name: `John Doe`
   - Email: `john@example.com`
   - Password: `password123`
   - Confirm Password: `password123`
3. Click "Create Account"
4. You'll be redirected to login

### **Step 2: Login**
1. Go to: http://localhost:3000/login
2. Enter:
   - Email: `john@example.com`
   - Password: `password123`
3. Click "Sign In"
4. You'll be redirected to the dashboard

### **Step 3: Test Dashboard**
After login, you can:
- ✅ View dashboard home with statistics
- ✅ Navigate using the sidebar
- ✅ Create new products with image upload
- ✅ View all products in a table
- ✅ Edit existing products
- ✅ Delete products
- ✅ Logout

---

## 🛍️ Testing Product Management

### **Create a Product**
1. Login first
2. Go to: http://localhost:3000/dashboard/products/new
3. Fill in:
   - Name: `iPhone 15 Pro`
   - Price: `999`
   - Description: `Latest Apple flagship smartphone`
4. Upload an image using "Choose Image" button
5. Click "Create Product"

### **View Products**
- **Dashboard**: http://localhost:3000/dashboard/products
- **Public Shop**: http://localhost:3000/shop (no login needed)

### **Edit a Product**
1. From products list, click "View" on any product
2. Click "Edit" button
3. Modify fields
4. Click "Save Changes"

### **Delete a Product**
1. From product detail page (edit mode)
2. Click "Delete Product" (red button)
3. Confirm deletion

---

## 🧪 Testing Scenarios

### **Authentication Tests**
- ✅ Register with valid details
- ✅ Register with duplicate email (should fail)
- ✅ Login with correct credentials
- ✅ Login with wrong password (should fail)
- ✅ Try accessing /dashboard without login (redirects to /login)
- ✅ Logout and verify redirect to home

### **Product CRUD Tests**
- ✅ Create product with image upload
- ✅ Create product with all fields
- ✅ View product list (pagination if many)
- ✅ Edit product details
- ✅ Delete product
- ✅ View products in public shop (no auth)

### **Navigation Tests**
- ✅ Home → Login → Dashboard
- ✅ Register → Login → Dashboard
- ✅ Dashboard sidebar navigation
- ✅ Logout from dashboard
- ✅ Protected route access (try /dashboard when logged out)

---

## 🐛 Common Issues & Solutions

### **Issue: "Cannot connect to MongoDB"**
**Solution**: 
- Check `.env.local` has correct MongoDB URI
- Ensure MongoDB Atlas IP whitelist includes your IP (or 0.0.0.0/0)
- Verify database user credentials

### **Issue: "401 Unauthorized" when accessing dashboard**
**Solution**:
- Make sure you're logged in
- Clear cookies and login again
- Check NEXTAUTH_SECRET is set in .env.local

### **Issue: "Image upload failed"**
**Solution**:
- Check `public/uploads` directory exists
- Ensure file size is under 5MB
- Verify file type is JPEG, PNG, GIF, or WebP

### **Issue: "Error: Invalid credentials"**
**Solution**:
- Verify email and password are correct
- If just registered, make sure account was created (check database)
- Try creating a new account

---

## 📊 Database Verification

### **Check if users are created**
MongoDB Atlas:
1. Go to Collections
2. Select database: `next-admin`
3. Collection: `users`
4. You should see registered users

### **Check if products are created**
MongoDB Atlas:
1. Go to Collections
2. Select database: `next-admin`
3. Collection: `products`
4. You should see created products

---

## 🎯 Quick Test Checklist

- [ ] Register a new account at /register
- [ ] Login at /login
- [ ] Access dashboard at /dashboard
- [ ] View stats on dashboard home
- [ ] Navigate to products page
- [ ] Create a new product with image
- [ ] View product in list
- [ ] Edit the product
- [ ] View product in public shop (no auth)
- [ ] Delete the product
- [ ] Logout
- [ ] Try accessing /dashboard (should redirect to /login)

---

## 🔗 Important URLs

| Page | URL | Auth Required |
|------|-----|---------------|
| Home | http://localhost:3000 | No |
| Register | http://localhost:3000/register | No |
| Login | http://localhost:3000/login | No |
| Shop | http://localhost:3000/shop | No |
| Dashboard | http://localhost:3000/dashboard | Yes |
| Products | http://localhost:3000/dashboard/products | Yes |
| New Product | http://localhost:3000/dashboard/products/new | Yes |

---

## 💡 Pro Tips

1. **First Time Setup**: Always register a new account first
2. **Test Both Views**: Check products in both dashboard and public shop
3. **Image Upload**: Use real images to test the upload functionality
4. **Multiple Users**: Create multiple accounts to test different sessions
5. **Browser DevTools**: Use Network tab to see API calls
6. **MongoDB Atlas**: Check database to verify data is being saved

---

## 🎉 You're All Set!

Your admin dashboard is fully functional. Start by:
1. Running `npm run dev`
2. Going to http://localhost:3000
3. Clicking "Get Started" to register
4. Exploring all features!

Happy testing! 🚀
