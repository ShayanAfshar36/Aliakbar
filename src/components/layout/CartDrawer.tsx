import { useNavigate } from 'react-router-dom'
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import Button from '../ui/Button'
import { useStore } from '../../lib/store'
import { getBikeById } from '../../data/bikes'
import { formatPrice } from '../../lib/format'

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, setQty, removeFromCart, cartCount } = useStore()
  const navigate = useNavigate()

  const lines = cart
    .map((line) => ({ line, bike: getBikeById(line.id) }))
    .filter((entry): entry is { line: { id: string; qty: number }; bike: NonNullable<ReturnType<typeof getBikeById>> } =>
      Boolean(entry.bike),
    )

  const subtotal = lines.reduce((sum, { line, bike }) => sum + bike.price * line.qty, 0)

  return (
    <div
      className={`fixed inset-0 z-[60] ${cartOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-hidden={!cartOpen}
    >
      <div
        onClick={() => setCartOpen(false)}
        className={`absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 ${
          cartOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <aside
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
        className={`absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          cartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={18} />
            <h2 className="text-[15px] font-bold">
              Your cart {cartCount > 0 ? `(${cartCount})` : ''}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setCartOpen(false)}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/[0.06]"
          >
            <X size={19} />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-soft">
              <ShoppingBag size={22} className="text-muted" />
            </span>
            <p className="text-[15px] font-semibold">Your cart is empty</p>
            <p className="text-sm text-muted">
              Browse the range and add a bike to get started.
            </p>
            <Button
              onClick={() => {
                setCartOpen(false)
                navigate('/shop')
              }}
              size="sm"
            >
              Shop bikes
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <ul className="flex flex-col gap-5">
                {lines.map(({ line, bike }) => (
                  <li key={bike.id} className="flex gap-4">
                    <img
                      src={bike.images[0]}
                      alt={bike.name}
                      loading="lazy"
                      className="h-20 w-24 shrink-0 rounded-xl object-cover"
                    />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">{bike.name}</p>
                          <p className="text-xs text-muted">{bike.category}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(bike.id)}
                          aria-label={`Remove ${bike.name}`}
                          className="text-muted transition-colors hover:text-brand"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="flex items-center rounded-full border border-line">
                          <button
                            type="button"
                            onClick={() => setQty(bike.id, line.qty - 1)}
                            aria-label="Decrease quantity"
                            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-ink/[0.06]"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="w-7 text-center text-sm font-semibold tabular-nums">
                            {line.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQty(bike.id, line.qty + 1)}
                            aria-label="Increase quantity"
                            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-ink/[0.06]"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                        <span className="text-sm font-bold">{formatPrice(bike.price * line.qty)}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-line px-6 py-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">Subtotal</span>
                <span className="text-lg font-bold">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-muted">
                Free shipping · 30-day ride guarantee · Assembled by our team
              </p>
              <Button
                fullWidth
                size="lg"
                className="mt-4"
                onClick={() => {
                  setCartOpen(false)
                  navigate('/contact?intent=order')
                }}
              >
                Request this order
              </Button>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="mt-3 w-full text-center text-[13px] font-semibold text-muted transition-colors hover:text-ink"
              >
                Continue shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
