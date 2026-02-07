import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Skeleton from "../components/Skeleton.jsx"

const CartPage = ({
  cartItems,
  products,
  total,
  onAddToCart,
  onQtyChange,
  onRemove,
}) => {
  const itemCount = cartItems.reduce((sum, item) => sum + item.qty, 0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <section>
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.6fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <Skeleton className="h-5 w-32" />
            <div className="mt-6 space-y-4">
              {[1, 2, 3].map((slot) => (
                <div
                  key={slot}
                  className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-800/60"
                >
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="mt-2 h-3 w-1/3" />
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <Skeleton className="h-5 w-40" />
            <div className="mt-6 space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-5 w-2/3" />
            </div>
            <Skeleton className="mt-6 h-10 w-full rounded-full" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Cart</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Add items, then review totals.</p>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.6fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Your cart</h3>
          {cartItems.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Your cart is empty. Add SKT essentials to get started.
            </p>
          ) : (
            <div className="mt-6 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-800/60"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {item.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {item.color} · Size {item.size}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onQtyChange(item.id, item.size, -1)}
                      className="h-8 w-8 rounded-full border border-slate-300 text-sm font-semibold text-slate-600 transition hover:border-slate-400 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500"
                    >
                      -
                    </button>
                    <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => onQtyChange(item.id, item.size, 1)}
                      className="h-8 w-8 rounded-full border border-slate-300 text-sm font-semibold text-slate-600 transition hover:border-slate-400 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400 line-through dark:text-slate-500">
                      ${item.originalPrice * item.qty}
                    </p>
                    <p className="text-xs text-emerald-600">
                      {item.discountPercent}% off
                    </p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      ${item.finalPrice * item.qty}
                    </p>
                    <button
                      onClick={() => onRemove(item.id, item.size)}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="mt-6 space-y-3">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Add more SKT items
            </p>
            <div className="grid gap-3">
              {products.map((item) => {
                const inCart = cartItems.some(
                  (cartItem) => cartItem.id === item.id,
                )
                return (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-800/60"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {item.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{item.color}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      ${Math.round(
                        item.originalPrice * (1 - item.discountPercent / 100),
                      )}
                    </span>
                    <div className="flex flex-col items-end gap-1">
                      <button
                        onClick={(event) => onAddToCart(item, { event })}
                        className="rounded-full border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900 active:scale-[0.98] dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-white"
                      >
                        Add to cart
                      </button>
                      {inCart ? (
                        <button
                          type="button"
                          onClick={() => onRemove(item.id)}
                          className="text-[11px] font-semibold text-slate-500 transition hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                        >
                          Remove item
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Order summary</h3>
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span>Items</span>
              <span>{itemCount}</span>
            </div>
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span>Estimated shipping</span>
              <span>{cartItems.length ? "$12" : "$0"}</span>
            </div>
            <div className="flex items-center justify-between text-slate-900 dark:text-slate-100">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">
                ${total + (cartItems.length ? 12 : 0)}
              </span>
            </div>
          </div>
          {cartItems.length === 0 ? (
            <button
              type="button"
              disabled
              className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-400 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-500"
            >
              Proceed to checkout
            </button>
          ) : (
            <Link
              to="/checkout"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
            >
              Proceed to checkout
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

export default CartPage
