import { useMemo, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

const sizes = [
  { label: "XS", available: true },
  { label: "S", available: true },
  { label: "M", available: true },
  { label: "L", available: false },
  { label: "XL", available: true },
]

const ProductPage = ({ products, onAddToCart }) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const product = useMemo(
    () => products.find((item) => item.id === id),
    [products, id],
  )
  const [selectedSize, setSelectedSize] = useState("M")
  const [pincode, setPincode] = useState("")
  const [deliveryInfo, setDeliveryInfo] = useState("")

  if (!product) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">Product not found.</p>
        <Link
          to="/"
          className="mt-3 inline-flex text-sm font-semibold text-slate-700 hover:text-slate-900"
        >
          Back to home
        </Link>
      </section>
    )
  }

  const finalPrice = Math.round(
    product.originalPrice * (1 - product.discountPercent / 100),
  )

  const handleDeliveryCheck = () => {
    if (!pincode.trim()) {
      setDeliveryInfo("Enter a valid pincode to check delivery.")
      return
    }
    setDeliveryInfo("Estimated delivery: 3-5 business days.")
  }

  return (
    <section className="space-y-8">
      <Link
        to="/"
        className="inline-flex text-sm font-semibold text-slate-600 hover:text-slate-900"
      >
        ← Back to Home
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-4 md:grid-cols-2">
              {[1, 2, 3, 4].map((slot) => (
                <div
                  key={slot}
                  className="h-40 rounded-2xl bg-gradient-to-br from-slate-200 via-slate-100 to-slate-50"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                {product.tag}
              </p>
              <h1 className="mt-2 text-2xl font-semibold text-slate-900">
                {product.name}
              </h1>
              <p className="mt-1 text-sm text-slate-500">{product.color}</p>
            </div>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
              {product.discountPercent}% OFF
            </span>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-sm text-slate-400 line-through">
              ${product.originalPrice}
            </span>
            <span className="text-xl font-semibold text-slate-900">
              ${finalPrice}
            </span>
          </div>

          <div className="mt-6 space-y-3">
            <p className="text-sm font-semibold text-slate-900">
              Select size
            </p>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size.label}
                  disabled={!size.available}
                  onClick={() => setSelectedSize(size.label)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                    size.available
                      ? size.label === selectedSize
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-200 text-slate-700 hover:border-slate-300"
                      : "border-slate-100 text-slate-300"
                  }`}
                >
                  {size.label}
                  {!size.available && " • Out"}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <p className="text-sm font-semibold text-slate-900">
              Delivery & payment
            </p>
            <div className="flex flex-wrap gap-2">
              <input
                type="text"
                value={pincode}
                onChange={(event) => setPincode(event.target.value)}
                placeholder="Enter pincode"
                className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
              <button
                type="button"
                onClick={handleDeliveryCheck}
                className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
              >
                Check
              </button>
            </div>
            {deliveryInfo && (
              <p className="text-xs text-slate-600">{deliveryInfo}</p>
            )}
            <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-xs text-slate-600">
              <p>Cash on Delivery: Available</p>
              <p>Card / Online Payments: Available</p>
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            <button
              onClick={() => onAddToCart(product, { size: selectedSize })}
              className="w-full rounded-full border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                onAddToCart(product, { size: selectedSize })
                navigate("/cart")
              }}
              className="w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Proceed to Pay
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductPage
