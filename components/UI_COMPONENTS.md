# UI Components Documentation

This document provides a comprehensive guide to using the reusable UI components in the Next Admin dashboard.

## Table of Contents

1. [Sidebar Components](#sidebar-components)
2. [Product Components](#product-components)
3. [Form Components](#form-components)
4. [Button Components](#button-components)
5. [Card Components](#card-components)
6. [Alert & Feedback Components](#alert--feedback-components)

---

## Sidebar Components

### Sidebar

Complete sidebar wrapper for dashboard layouts.

```tsx
import {
  Sidebar,
  SidebarHeader,
  SidebarNav,
  SidebarFooter,
} from "@/components/ui";

<Sidebar>
  <SidebarHeader title="John Doe" subtitle="admin@example.com" />
  <SidebarNav>{/* Navigation items */}</SidebarNav>
  <SidebarFooter>{/* Footer content */}</SidebarFooter>
</Sidebar>;
```

### MenuSection

Group related menu items together.

```tsx
import { MenuSection } from "@/components/ui";

<MenuSection
  title="Main Menu"
  items={[
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <DashboardIcon />,
      badge: "3",
    },
  ]}
  currentPath="/dashboard"
/>;
```

---

## Product Components

### ProductCard

Display products in a grid layout.

```tsx
import { ProductCard, ProductGrid } from "@/components/ui";

<ProductGrid columns={4}>
  <ProductCard
    name="Product Name"
    price={99.99}
    description="Product description"
    image="/image.jpg"
    href="/products/1"
    onEdit={() => console.log("Edit")}
    onDelete={() => console.log("Delete")}
  />
</ProductGrid>;
```

### ProductTable

Display products in a table format.

```tsx
import { ProductTable, ProductListItem } from "@/components/ui";

<ProductTable>
  <ProductListItem
    id="123"
    name="Product"
    price={99.99}
    description="Description"
    image="/image.jpg"
    createdAt="2024-01-01"
    onView={() => {}}
    onEdit={() => {}}
    onDelete={() => {}}
  />
</ProductTable>;
```

---

## Form Components

### Complete Form Example

```tsx
import {
  FormCard,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
  FormSelect,
  FormHelpText,
  FormActions,
  Button,
} from "@/components/ui";

<FormCard title="Create Product" description="Fill in the product details">
  <form onSubmit={handleSubmit}>
    <div className="space-y-6">
      <FormGroup>
        <FormLabel htmlFor="name" required>
          Product Name
        </FormLabel>
        <FormInput
          id="name"
          name="name"
          placeholder="Enter product name"
          error={errors.name}
        />
        <FormHelpText>Maximum 100 characters</FormHelpText>
      </FormGroup>

      <FormGroup>
        <FormLabel htmlFor="description" required>
          Description
        </FormLabel>
        <FormTextarea
          id="description"
          name="description"
          rows={5}
          error={errors.description}
        />
      </FormGroup>

      <FormGroup>
        <FormLabel htmlFor="category" required>
          Category
        </FormLabel>
        <FormSelect id="category" name="category">
          <option value="">Select category</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
        </FormSelect>
      </FormGroup>
    </div>

    <FormActions>
      <Button type="button" variant="secondary">
        Cancel
      </Button>
      <Button type="submit" variant="primary" loading={isLoading}>
        Create Product
      </Button>
    </FormActions>
  </form>
</FormCard>;
```

---

## Button Components

### Button

Primary button component with variants.

```tsx
import { Button } from '@/components/ui';

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Danger</Button>
<Button variant="success">Success</Button>
<Button variant="outline">Outline</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// With icon and loading
<Button
  icon={<PlusIcon />}
  loading={isLoading}
  onClick={handleClick}
>
  Add Item
</Button>
```

### LinkButton

Button styled as a link.

```tsx
import { LinkButton } from "@/components/ui";

<LinkButton href="/products/new" variant="primary" icon={<PlusIcon />}>
  Add Product
</LinkButton>;
```

### IconButton

Compact button for icons only.

```tsx
import { IconButton } from "@/components/ui";

<IconButton variant="primary" size="md">
  <EditIcon />
</IconButton>;
```

---

## Card Components

### Card

Basic card container.

```tsx
import { Card, CardHeader, CardBody, CardFooter } from "@/components/ui";

<Card>
  <CardHeader
    title="Card Title"
    subtitle="Card subtitle"
    action={<Button>Action</Button>}
  />
  <CardBody>Card content goes here</CardBody>
  <CardFooter>Footer content</CardFooter>
</Card>;
```

### StatCard

Display statistics.

```tsx
import { StatCard } from "@/components/ui";

<StatCard
  title="Total Revenue"
  value="$45,231"
  icon={<DollarIcon />}
  trend={{ value: "+23%", positive: true }}
  color="green"
/>;
```

### EmptyState

Display when no data is available.

```tsx
import { EmptyState, LinkButton } from "@/components/ui";

<EmptyState
  title="No products yet"
  description="Get started by creating your first product"
  icon={<BoxIcon />}
  action={
    <LinkButton href="/products/new" variant="primary">
      Add Product
    </LinkButton>
  }
/>;
```

---

## Alert & Feedback Components

### Alert

Display contextual feedback messages.

```tsx
import { Alert } from '@/components/ui';

// Types
<Alert type="success" title="Success!">
  Your changes have been saved.
</Alert>

<Alert type="error" title="Error">
  Something went wrong.
</Alert>

<Alert type="warning" title="Warning">
  Please review your changes.
</Alert>

<Alert type="info">
  This is an informational message.
</Alert>

// With close button
<Alert type="success" onClose={() => setShow(false)}>
  Dismissible alert
</Alert>
```

### Badge

Small status indicators.

```tsx
import { Badge } from '@/components/ui';

<Badge variant="primary">New</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="danger">Inactive</Badge>
<Badge variant="secondary">Draft</Badge>

// Sizes
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>
```

### Spinner

Loading indicator.

```tsx
import { Spinner } from '@/components/ui';

<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
```

---

## Color Scheme

The components use the following color palette:

- **Primary (Blue)**: `#2563EB` - Main actions, links
- **Success (Green)**: `#16A34A` - Success states
- **Warning (Yellow)**: `#CA8A04` - Warning states
- **Danger (Red)**: `#DC2626` - Destructive actions
- **Secondary (Gray)**: `#6B7280` - Secondary actions

---

## Best Practices

1. **Consistency**: Use the same component variants throughout your application
2. **Accessibility**: Always provide labels for form inputs
3. **Loading States**: Show loading indicators for async operations
4. **Error Handling**: Display clear error messages using alerts
5. **Responsive Design**: All components are responsive by default
6. **Icon Usage**: Keep icons consistent in size and style

---

## Example: Complete Dashboard Page

```tsx
import {
  Card,
  CardHeader,
  CardBody,
  StatCard,
  ProductGrid,
  ProductCard,
  Button,
  LinkButton,
  Alert,
} from "@/components/ui";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Alert */}
      <Alert type="success">Welcome back!</Alert>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Products"
          value="152"
          icon={<BoxIcon />}
          trend={{ value: "+12%", positive: true }}
          color="blue"
        />
        {/* More stat cards... */}
      </div>

      {/* Products Section */}
      <Card>
        <CardHeader
          title="Recent Products"
          subtitle="Your latest products"
          action={
            <LinkButton href="/products/new" variant="primary">
              Add Product
            </LinkButton>
          }
        />
        <CardBody>
          <ProductGrid columns={3}>
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </ProductGrid>
        </CardBody>
      </Card>
    </div>
  );
}
```

---

## Customization

All components accept a `className` prop for additional styling:

```tsx
<Button className="my-custom-class">Custom Button</Button>
<Card className="border-2 border-blue-500">Custom Card</Card>
```

Components use Tailwind CSS classes and can be easily customized through the Tailwind configuration.
