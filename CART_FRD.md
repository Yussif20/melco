# Shopping Cart Feature - Functional Requirements Document (FRD)

## 1. Overview

### 1.1 Purpose

Add a shopping cart functionality to the MELCO website that allows users to select products with quantities and submit inquiries for pricing rather than direct purchases (since this is B2B safety equipment).

### 1.2 Scope

- Cart icon in header with item count
- Add to cart buttons on product pages
- Quantity selectors for cart items
- Local storage persistence
- Cart page with inquiry form
- Bilingual support (Arabic/English)

## 2. Functional Requirements

### 2.1 Header Cart Icon

**Requirement ID**: CART-001
**Description**: Display cart icon in header navigation
**Details**:

- Show cart icon in header (next to language selector)
- Display item count badge when cart has items
- Badge should show total quantity of all items
- Clicking opens cart page/modal
- Icon should be consistent in both light/dark themes
- Support RTL/LTR layouts

### 2.2 Product Add to Cart Button

**Requirement ID**: CART-002
**Description**: Add "Add to Cart" functionality to product pages
**Details**:

- Replace or add alongside existing "Request Quote" button
- Initial state: "Add to Cart" button
- After clicking: Transform into quantity selector (-, quantity, +)
- Quantity selector shows current item quantity in cart
- Minimum quantity: 1
- Maximum quantity: 999 (configurable)
- If quantity reaches 0, revert to "Add to Cart" button
- Button text should be translatable

### 2.3 Quantity Management

**Requirement ID**: CART-003
**Description**: Manage product quantities in cart
**Details**:

- Increment/decrement buttons (+ and -)
- Direct number input field
- Validate quantity (positive integers only)
- Real-time cart count update in header
- Smooth animations for state transitions
- Auto-save to local storage on quantity change

### 2.4 Local Storage Persistence

**Requirement ID**: CART-004
**Description**: Persist cart data across browser sessions
**Details**:

- Store cart items in localStorage
- Key: "melco-cart"
- Data structure:

```typescript
interface CartItem {
  id: string; // unique product identifier
  name: string;
  category: string;
  image: string;
  quantity: number;
  addedAt: Date;
}
```

- Load cart on page refresh
- Handle localStorage errors gracefully
- Clear expired items (optional: 30 days expiry)

### 2.5 Cart Page/Modal

**Requirement ID**: CART-005
**Description**: Dedicated cart view for managing selected items
**Details**:

- Accessible via header cart icon
- Display all cart items with:
  - Product image (thumbnail)
  - Product name
  - Category
  - Quantity selector
  - Remove item button
- Show total item count
- Empty cart state with call-to-action
- Mobile-responsive design

### 2.6 Cart Inquiry Form

**Requirement ID**: CART-006
**Description**: Convert cart into price inquiry form
**Details**:

- Replace/extend existing ContactForm component
- Pre-populate with cart items
- Form fields:
  - Customer name (required)
  - Email (required)
  - Phone (required)
  - Company name (optional)
  - Message/additional requirements (optional)
  - Cart items summary (read-only)
- Submit sends inquiry email with cart details
- Success message after submission
- Option to clear cart after successful submission

## 3. Technical Requirements

### 3.1 State Management

**Requirement ID**: TECH-001
**Description**: Implement cart state management
**Details**:

- React Context for cart state
- Custom hooks for cart operations
- TypeScript interfaces for type safety
- Optimistic updates for better UX

### 3.2 Components Structure

**Requirement ID**: TECH-002
**Description**: Component architecture for cart functionality
**Details**:

```
components/
├── Cart/
│   ├── CartIcon.tsx          # Header cart icon with badge
│   ├── CartButton.tsx        # Add to cart / quantity selector
│   ├── CartPage.tsx          # Main cart page
│   ├── CartItem.tsx          # Individual cart item component
│   ├── CartInquiryForm.tsx   # Cart inquiry form
│   └── CartProvider.tsx      # Context provider
├── hooks/
│   ├── useCart.ts           # Cart operations hook
│   └── useLocalStorage.ts   # Local storage utilities
└── types/
    └── cart.ts              # TypeScript interfaces
```

### 3.3 Internationalization

**Requirement ID**: TECH-003
**Description**: Multilingual support for cart features
**Details**:

- Add cart-related translations to messages/en.json and messages/ar.json
- Support RTL layout for Arabic
- Localized number formatting
- Translated error messages

## 4. User Experience Flow

### 4.1 Adding Items to Cart

1. User browses products
2. Clicks "Add to Cart" on desired product
3. Button transforms to quantity selector with quantity = 1
4. Cart icon in header shows badge with item count
5. Item saved to localStorage

### 4.2 Managing Cart Quantities

1. User adjusts quantity using +/- buttons or direct input
2. Real-time updates to cart badge in header
3. If quantity reaches 0, item removed and button reverts to "Add to Cart"
4. Changes auto-saved to localStorage

### 4.3 Cart Inquiry Process

1. User clicks cart icon in header
2. Cart page opens showing all selected items
3. User reviews items and quantities
4. User fills inquiry form with contact details
5. User submits inquiry
6. System sends email with cart details
7. Success message displayed
8. Optional: Cart cleared after submission

## 5. Error Handling

### 5.1 localStorage Errors

- Graceful fallback if localStorage is unavailable
- Show warning message to user
- Cart functionality continues with session-only storage

### 5.2 Form Validation

- Client-side validation for all form fields
- Server-side validation for email submission
- Clear error messages in user's language

### 5.3 Network Errors

- Handle form submission failures
- Retry mechanism for failed requests
- Offline state detection

## 6. Future Enhancements (Out of Scope)

- User accounts and saved carts
- Product variants (sizes, colors)
- Cart sharing via URL
- Bulk import from CSV
- Integration with CRM systems
- Advanced analytics

## 7. Acceptance Criteria

### 7.1 Definition of Done

- [ ] Cart icon appears in header with correct badge count
- [ ] Add to cart buttons work on all product pages
- [ ] Quantity selectors function correctly
- [ ] Cart persists across browser sessions
- [ ] Cart page displays all items correctly
- [ ] Inquiry form submits successfully
- [ ] All features work in both Arabic and English
- [ ] Mobile responsive design
- [ ] Accessible UI components
- [ ] Error handling implemented
- [ ] Unit tests written for cart functions

### 7.2 Testing Scenarios

1. Add multiple products to cart
2. Modify quantities and verify updates
3. Remove items by setting quantity to 0
4. Refresh page and verify cart persistence
5. Submit inquiry with cart items
6. Test on mobile devices
7. Test in both Arabic and English
8. Test with localStorage disabled

## 8. Implementation Priority

### Phase 1 (High Priority)

- Cart state management and local storage
- Add to cart buttons and quantity selectors
- Header cart icon with badge

### Phase 2 (Medium Priority)

- Cart page with item management
- Cart inquiry form integration

### Phase 3 (Low Priority)

- Advanced error handling
- Performance optimizations
- Additional UX enhancements

---

**Document Version**: 1.0
**Created**: September 20, 2025
**Status**: Ready for Implementation
