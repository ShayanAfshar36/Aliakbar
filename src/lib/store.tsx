import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

const CART_KEY = 'voltaro.cart.v1'
const FAV_KEY = 'voltaro.favorites.v1'

export interface CartLine {
  id: string
  qty: number
}

interface StoreValue {
  cart: CartLine[]
  cartCount: number
  addToCart: (id: string, qty?: number) => void
  setQty: (id: string, qty: number) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
  cartOpen: boolean
  setCartOpen: (open: boolean) => void
  favorites: string[]
  toggleFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
}

const StoreContext = createContext<StoreValue | null>(null)

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>(() => readJson<CartLine[]>(CART_KEY, []))
  const [favorites, setFavorites] = useState<string[]>(() => readJson<string[]>(FAV_KEY, []))
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    window.localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    window.localStorage.setItem(FAV_KEY, JSON.stringify(favorites))
  }, [favorites])

  // Lock body scroll while the cart drawer is open.
  useEffect(() => {
    document.body.style.overflow = cartOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [cartOpen])

  const addToCart = useCallback((id: string, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((line) => line.id === id)
      if (existing) {
        return prev.map((line) => (line.id === id ? { ...line, qty: line.qty + qty } : line))
      }
      return [...prev, { id, qty }]
    })
    setCartOpen(true)
  }, [])

  const setQty = useCallback((id: string, qty: number) => {
    setCart((prev) =>
      prev
        .map((line) => (line.id === id ? { ...line, qty: Math.max(0, qty) } : line))
        .filter((line) => line.qty > 0),
    )
  }, [])

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((line) => line.id !== id))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]))
  }, [])

  const value = useMemo<StoreValue>(
    () => ({
      cart,
      cartCount: cart.reduce((sum, line) => sum + line.qty, 0),
      addToCart,
      setQty,
      removeFromCart,
      clearCart,
      cartOpen,
      setCartOpen,
      favorites,
      toggleFavorite,
      isFavorite: (id: string) => favorites.includes(id),
    }),
    [cart, favorites, cartOpen, addToCart, setQty, removeFromCart, clearCart, toggleFavorite],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within a StoreProvider')
  return ctx
}
