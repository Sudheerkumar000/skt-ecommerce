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
      <header className="rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
          Checkout
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-slate-900">
          Complete your order
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Review your items, confirm shipping details, and choose a payment
          method.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              {["address", "payment", "confirmation"].map((label) => (
                <div
                  key={label}
                  className={`rounded-full px-3 py-1 ${
                    step === label
                      ? "bg-slate-900 text-white"
                      : "border border-slate-200 text-slate-600"
                  }`}
                >
                  {label}
                </div>
              ))}
            </div>
          </section>

          {step === "address" && (
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Shipping info</h2>
            <form className="mt-4 grid gap-3">
              <label className="text-xs font-semibold text-slate-600">
                Full name
                <input
                  type="text"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />
              </label>
              <label className="text-xs font-semibold text-slate-600">
                Phone number
                <input
                  type="tel"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />
              </label>
              <label className="text-xs font-semibold text-slate-600">
                Address
                <input
                  type="text"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />
              </label>
              <div className="grid gap-3 md:grid-cols-2">
                <label className="text-xs font-semibold text-slate-600">
                  City
                  <input
                    type="text"
                    className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                  />
                </label>
                <label className="text-xs font-semibold text-slate-600">
                  Postal code
                  <input
                    type="text"
                    className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                  />
                </label>
              </div>
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <input type="checkbox" className="h-4 w-4" />
                Save this address for future purchases
              </label>
            </form>
            <button
              type="button"
              onClick={() => setStep("payment")}
              className="mt-6 w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Continue to payment
            </button>
          </section>
          )}

          {step === "payment" && (
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Payment methods
            </h2>
            <div className="mt-4 grid gap-3 text-sm text-slate-600">
              {[
                { id: "card", label: "Credit / debit card" },
                { id: "paypal", label: "PayPal" },
                { id: "apple", label: "Apple Pay" },
              ].map((method) => (
                <label
                  key={method.id}
                  className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3"
                >
                  <div>
                    <p className="font-semibold text-slate-900">
                      {method.label}
                    </p>
                    <p className="text-xs text-slate-500">
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
              className="mt-6 w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Review order
            </button>
          </section>
          )}

          {step === "payment" && (
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Promo code
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <label className="flex-1 text-xs font-semibold text-slate-600">
                Code
                <input
                  type="text"
                  value={promoCode}
                  onChange={(event) => setPromoCode(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
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
                className="self-end rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
              >
                Apply
              </button>
            </div>
            {promoMessage && (
              <p className="mt-3 text-xs font-semibold text-slate-600">
                {promoMessage}
              </p>
            )}
          </section>
          )}

          {step === "confirmation" && (
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">
                Confirm and place order
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Review your order summary, delivery address, and payment method
                before placing the order.
              </p>
              <button className="mt-6 w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                Place order
              </button>
            </section>
          )}
        </div>

        <aside className="space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Order summary
            </h2>
            <div className="mt-4 space-y-3 text-sm">
              {cartItems.length === 0 ? (
                <p className="text-slate-500">Your cart is empty.</p>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3"
                  >
                    <div>
                      <p className="font-semibold text-slate-900">{item.name}</p>
                      <p className="text-xs text-slate-500">
                        {item.color} · Size {item.size} · Qty {item.qty}
                      </p>
                      <p className="text-xs text-slate-400 line-through">
                        ${item.originalPrice * item.qty}
                      </p>
                    </div>
                    <p className="font-semibold text-slate-900">
                      ${item.finalPrice * item.qty}
                    </p>
                  </div>
                ))
              )}
            </div>
            <div className="mt-6 space-y-2 text-sm text-slate-600">
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
              <div className="flex items-center justify-between text-slate-900">
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
