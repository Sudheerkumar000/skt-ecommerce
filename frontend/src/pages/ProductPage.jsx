import { useEffect, useMemo, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import Skeleton from "../components/Skeleton.jsx"

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
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900)
    return () => clearTimeout(timer)
  }, [])

  if (!product) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm text-slate-600 dark:text-slate-300">Product not found.</p>
        <Link
          to="/"
          className="mt-3 inline-flex text-sm font-semibold text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
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

  if (isLoading) {
    return (
      <section className="space-y-8">
        <Skeleton className="h-4 w-32" />
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="grid gap-4 md:grid-cols-2">
              {[1, 2, 3, 4].map((slot) => (
                <Skeleton key={slot} className="h-40 rounded-2xl" />
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="mt-3 h-8 w-3/4" />
            <Skeleton className="mt-2 h-4 w-1/3" />
            <Skeleton className="mt-6 h-10 w-1/2" />
            <Skeleton className="mt-6 h-16 w-full rounded-2xl" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="space-y-8">
      <Link
        to="/"
        className="inline-flex text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
      >
        ← Back to Home
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="grid gap-4 md:grid-cols-2">
              {[1, 2, 3, 4].map((slot) => (
                <div
                  key={slot}
                  className="h-40 rounded-2xl bg-gradient-to-br from-slate-200 via-slate-100 to-slate-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
                {product.tag}
              </p>
              <h1 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                {product.name}
              </h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{product.color}</p>
            </div>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-200/10 dark:text-amber-200">
              {product.discountPercent}% OFF
            </span>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-sm text-slate-400 line-through dark:text-slate-500">
              ${product.originalPrice}
            </span>
            <span className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              ${finalPrice}
            </span>
          </div>

          <div className="mt-6 space-y-3">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
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
                        ? "border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900"
                        : "border-slate-200 text-slate-700 hover:border-slate-300 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500"
                      : "border-slate-100 text-slate-300 dark:border-slate-800 dark:text-slate-600"
                  }`}
                >
                  {size.label}
                  {!size.available && " • Out"}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Delivery & payment
            </p>
            <div className="flex flex-wrap gap-2">
              <input
                type="text"
                value={pincode}
                onChange={(event) => setPincode(event.target.value)}
                placeholder="Enter pincode"
                className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-slate-700"
              />
              <button
                type="button"
                onClick={handleDeliveryCheck}
                className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-white"
              >
                Check
              </button>
            </div>
            {deliveryInfo && (
              <p className="text-xs text-slate-600 dark:text-slate-300">{deliveryInfo}</p>
            )}
            <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
              <p>Cash on Delivery: Available</p>
              <p>Card / Online Payments: Available</p>
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            <button
              onClick={(event) => onAddToCart(product, { size: selectedSize, event })}
              className="w-full rounded-full border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900 active:scale-[0.98] dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-white"
            >
              Add to Cart
            </button>
            <button
              onClick={(event) => {
                onAddToCart(product, { size: selectedSize, event })
                navigate("/cart")
              }}
              className="w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
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
