export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

const STORAGE_KEY = 'ecommerce_cart';

export function getCart(): Cart {
  if (typeof window === 'undefined') {
    return { items: [], total: 0 };
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : { items: [], total: 0 };
}

export function setCart(cart: Cart): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }
}

export function addToCart(item: CartItem): void {
  const cart = getCart();
  const existing = cart.items.find((i) => i.productId === item.productId);

  if (existing) {
    existing.quantity += item.quantity;
  } else {
    cart.items.push(item);
  }

  cart.total = calculateTotal(cart.items);
  setCart(cart);
}

export function removeFromCart(productId: string): void {
  const cart = getCart();
  cart.items = cart.items.filter((i) => i.productId !== productId);
  cart.total = calculateTotal(cart.items);
  setCart(cart);
}

export function updateQuantity(productId: string, quantity: number): void {
  const cart = getCart();
  const item = cart.items.find((i) => i.productId === productId);
  if (item) {
    item.quantity = Math.max(0, quantity);
    if (item.quantity === 0) {
      removeFromCart(productId);
    } else {
      cart.total = calculateTotal(cart.items);
      setCart(cart);
    }
  }
}

export function clearCart(): void {
  setCart({ items: [], total: 0 });
}

function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
