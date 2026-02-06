import { Link } from "react-router-dom"

const CartPage = ({
  cartItems,
  products,
  total,
  onAddToCart,
  onQtyChange,
  onRemove,
}) => {
  const itemCount = cartItems.reduce((sum, item) => sum + item.qty, 0)

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-slate-900">Cart</h2>
        <p className="text-sm text-slate-500">Add items, then review totals.</p>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.6fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Your cart</h3>
          {cartItems.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">
              Your cart is empty. Add SKT essentials to get started.
            </p>
          ) : (
            <div className="mt-6 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {item.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {item.color} · Size {item.size}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onQtyChange(item.id, item.size, -1)}
                      className="h-8 w-8 rounded-full border border-slate-300 text-sm font-semibold text-slate-600 transition hover:border-slate-400"
                    >
                      -
                    </button>
                    <span className="text-sm font-semibold text-slate-900">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => onQtyChange(item.id, item.size, 1)}
                      className="h-8 w-8 rounded-full border border-slate-300 text-sm font-semibold text-slate-600 transition hover:border-slate-400"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400 line-through">
                      ${item.originalPrice * item.qty}
                    </p>
                    <p className="text-xs text-emerald-600">
                      {item.discountPercent}% off
                    </p>
                    <p className="text-sm font-semibold text-slate-900">
                      ${item.finalPrice * item.qty}
                    </p>
                    <button
                      onClick={() => onRemove(item.id, item.size)}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="mt-6 space-y-3">
            <p className="text-sm font-semibold text-slate-700">
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
                  className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {item.name}
                    </p>
                    <p className="text-xs text-slate-500">{item.color}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-slate-900">
                      ${Math.round(
                        item.originalPrice * (1 - item.discountPercent / 100),
                      )}
                    </span>
                    <div className="flex flex-col items-end gap-1">
                      <button
                        onClick={() => onAddToCart(item)}
                        className="rounded-full border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
                      >
                        Add to cart
                      </button>
                      {inCart ? (
                        <button
                          type="button"
                          onClick={() => onRemove(item.id)}
                          className="text-[11px] font-semibold text-slate-500 transition hover:text-slate-700"
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
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Order summary</h3>
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex items-center justify-between text-slate-600">
              <span>Items</span>
              <span>{itemCount}</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Estimated shipping</span>
              <span>{cartItems.length ? "$12" : "$0"}</span>
            </div>
            <div className="flex items-center justify-between text-slate-900">
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
              className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-400"
            >
              Proceed to checkout
            </button>
          ) : (
            <Link
              to="/checkout"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
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
