import { useState } from "react"

const CheckoutPage = ({ cartItems, total }) => {
  const [promoCode, setPromoCode] = useState("")
  const [promoMessage, setPromoMessage] = useState("")
  const [selectedPayment, setSelectedPayment] = useState("card")
  const [step, setStep] = useState("address")

  const shippingFee = cartItems.length ? 12 : 0
  const discount = promoCode.trim().toLowerCase() === "skt10" ? 10 : 0
  const grandTotal = Math.max(total + shippingFee - discount, 0)

  return (
    <section className="space-y-8">
      <header className="rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
          Checkout
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Complete your order
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Review your items, confirm shipping details, and choose a payment
          method.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              {["address", "payment", "confirmation"].map((label) => (
                <div
                  key={label}
                  className={`rounded-full px-3 py-1 ${
                    step === label
                      ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                      : "border border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300"
                  }`}
                >
                  {label}
                </div>
              ))}
            </div>
          </section>

          {step === "address" && (
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Shipping info</h2>
            <form className="mt-4 grid gap-3">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                Full name
                <input
                  type="text"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-slate-700"
                />
              </label>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                Phone number
                <input
                  type="tel"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-slate-700"
                />
              </label>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                Address
                <input
                  type="text"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-slate-700"
                />
              </label>
              <div className="grid gap-3 md:grid-cols-2">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  City
                  <input
                    type="text"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-slate-700"
                  />
                </label>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  Postal code
                  <input
                    type="text"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-slate-700"
                  />
                </label>
              </div>
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                <input type="checkbox" className="h-4 w-4" />
                Save this address for future purchases
              </label>
            </form>
            <button
              type="button"
              onClick={() => setStep("payment")}
              className="mt-6 w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
            >
              Continue to payment
            </button>
          </section>
          )}

          {step === "payment" && (
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Payment methods
            </h2>
            <div className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-300">
              {[
                { id: "card", label: "Credit / debit card" },
                { id: "paypal", label: "PayPal" },
                { id: "apple", label: "Apple Pay" },
              ].map((method) => (
                <label
                  key={method.id}
                  className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-800/60"
                >
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">
                      {method.label}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Secure checkout with {method.label}.
                    </p>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    value={method.id}
                    checked={selectedPayment === method.id}
                    onChange={() => setSelectedPayment(method.id)}
                    className="h-4 w-4"
                  />
                </label>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setStep("confirmation")}
              className="mt-6 w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
            >
              Review order
            </button>
          </section>
          )}

          {step === "payment" && (
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Promo code
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <label className="flex-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
                Code
                <input
                  type="text"
                  value={promoCode}
                  onChange={(event) => setPromoCode(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-slate-700"
                />
              </label>
              <button
                type="button"
                onClick={() => {
                  if (promoCode.trim().toLowerCase() === "skt10") {
                    setPromoMessage("Promo applied. $10 off your order.")
                  } else if (promoCode.trim()) {
                    setPromoMessage("Promo code not recognized.")
                  } else {
                    setPromoMessage("Enter a promo code to apply.")
                  }
                }}
                className="self-end rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-white"
              >
                Apply
              </button>
            </div>
            {promoMessage && (
              <p className="mt-3 text-xs font-semibold text-slate-600 dark:text-slate-300">
                {promoMessage}
              </p>
            )}
          </section>
          )}

          {step === "confirmation" && (
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Confirm and place order
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Review your order summary, delivery address, and payment method
                before placing the order.
              </p>
              <button className="mt-6 w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white">
                Place order
              </button>
            </section>
          )}
        </div>

        <aside className="space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Order summary
            </h2>
            <div className="mt-4 space-y-3 text-sm">
              {cartItems.length === 0 ? (
                <p className="text-slate-500 dark:text-slate-400">Your cart is empty.</p>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-800/60"
                  >
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">{item.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {item.color} · Size {item.size} · Qty {item.qty}
                      </p>
                      <p className="text-xs text-slate-400 line-through dark:text-slate-500">
                        ${item.originalPrice * item.qty}
                      </p>
                    </div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">
                      ${item.finalPrice * item.qty}
                    </p>
                  </div>
                ))
              )}
            </div>
            <div className="mt-6 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>${total}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span>${shippingFee}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Discount</span>
                <span>${discount}</span>
              </div>
              <div className="flex items-center justify-between text-slate-900 dark:text-slate-100">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">${grandTotal}</span>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </section>
  )
}

export default CheckoutPage
