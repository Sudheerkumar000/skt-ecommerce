import { useEffect, useMemo, useRef, useState } from "react"
import { Link } from "react-router-dom"
import Skeleton from "../components/Skeleton.jsx"

const ShopPage = ({ products, onAddToCart }) => {
  const [colorQuery, setColorQuery] = useState("")
  const [selectedColor, setSelectedColor] = useState(null)
  const [showColorMenu, setShowColorMenu] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 1000000])
  const [isLoading, setIsLoading] = useState(true)
  const seasonalCollections = ["Spring", "Summer", "Fall", "Winter"]
  const occasionCollections = ["Weddings", "Parties", "Workwear", "Casual wear"]
  const trendCollections = ["Trending now", "New arrivals", "Editor’s picks"]
  const newArrivalsRef = useRef(null)
  const categories = [
    {
      name: "Women",
      subcategories: ["Tops", "Bottoms", "Outerwear", "Dresses", "Accessories"],
      guide: "Women’s size & fit guide",
    },
    {
      name: "Men",
      subcategories: ["Tops", "Bottoms", "Outerwear", "Dresses", "Accessories"],
      guide: "Men’s size & fit guide",
    },
    {
      name: "Kids",
      subcategories: ["Tops", "Bottoms", "Outerwear", "Dresses", "Accessories"],
      guide: "Kids’ size & fit guide",
    },
  ]

  const filters = [
    { label: "Size", options: ["XS", "S", "M", "L", "XL"] },
    { label: "Brand", options: ["SKT Core", "SKT Studio"] },
    { label: "Style", options: ["Casual", "Workwear", "Party", "Wedding"] },
  ]

  const colorPalette = [
    { name: "Black", hex: "#0f172a" },
    { name: "White", hex: "#f8fafc" },
    { name: "Graphite", hex: "#4b5563" },
    { name: "Sand", hex: "#f5e1c8" },
    { name: "Olive", hex: "#6b7b4a" },
    { name: "Forest", hex: "#166534" },
    { name: "Navy", hex: "#1e3a8a" },
    { name: "Sky", hex: "#7dd3fc" },
    { name: "Clay", hex: "#c2410c" },
    { name: "Rose", hex: "#fda4af" },
    { name: "Amber", hex: "#f59e0b" },
    { name: "Lilac", hex: "#c4b5fd" },
  ]

  const colorRecommendations = ["Graphite", "Olive", "Sand"]

  const filteredColors = useMemo(() => {
    if (!colorQuery) return colorPalette
    return colorPalette.filter((color) =>
      color.name.toLowerCase().includes(colorQuery.toLowerCase()),
    )
  }, [colorPalette, colorQuery])

  const sorts = [
    "Best Selling",
    "Price: Low to High",
    "Price: High to Low",
    "New Arrivals",
  ]

  const newArrivals = useMemo(
    () =>
      products.slice(0, 4).map((item, index) => ({
        ...item,
        badge: index < 2 ? "New" : "Just Arrived",
      })),
    [products],
  )

  const bestSellers = [
    { name: "SKT Core Tee", color: "Cloud White", price: 48 },
    { name: "SKT Utility Jacket", color: "Sandstone", price: 148 },
    { name: "SKT Everyday Pants", color: "Graphite", price: 92 },
  ]

  const promotions = [
    { title: "Seasonal markdowns", detail: "Save up to 30% on layers" },
    { title: "Bundle offer", detail: "Buy 2 tees, get 1 free" },
    { title: "Loyalty credit", detail: "Earn $15 back on $150+" },
  ]

  const giftGuides = [
    "Gifts for training",
    "Travel essentials",
    "Weekend comfort",
  ]

  const recommendations = [
    { name: "SKT Motion Tee", color: "Olive", price: 54 },
    { name: "SKT Drift Shorts", color: "Stone", price: 68 },
    { name: "SKT Trail Cap", color: "Forest", price: 32 },
  ]

  const reviews = [
    { quote: "Loved the fit and quality.", name: "Cameron J." },
    { quote: "Shipping was quick and easy.", name: "Priya M." },
    { quote: "Great variety of styles.", name: "Luis G." },
  ]

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900)
    return () => clearTimeout(timer)
  }, [])

  const scrollNewArrivals = (direction) => {
    if (!newArrivalsRef.current) return
    const scrollAmount = newArrivalsRef.current.clientWidth * 0.8
    newArrivalsRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  if (isLoading) {
    return (
      <section className="space-y-10">
        <header className="rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="mt-3 h-8 w-1/2" />
          <Skeleton className="mt-2 h-4 w-2/3" />
        </header>

        <section className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
          <aside className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            {[1, 2, 3].map((slot) => (
              <div key={slot} className="space-y-3">
                <Skeleton className="h-4 w-1/3" />
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3].map((pill) => (
                    <Skeleton key={pill} className="h-7 w-16 rounded-full" />
                  ))}
                </div>
              </div>
            ))}
          </aside>

          <div className="space-y-8">
            {[1, 2, 3].map((slot) => (
              <section
                key={slot}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  {[1, 2, 3].map((card) => (
                    <div
                      key={card}
                      className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-800/60"
                    >
                      <Skeleton className="mb-3 h-24 w-full rounded-xl" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="mt-2 h-3 w-1/2" />
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>
      </section>
    )
  }

  return (
    <section className="space-y-10">
      <header className="rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
          Shop
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Explore SKT collections
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Browse categories, filter by size and color, and discover new drops.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
        <aside className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <details className="space-y-4 lg:open" open>
            <summary className="cursor-pointer list-none">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Categories</h2>
                <span className="text-xs text-slate-400 dark:text-slate-500 lg:hidden">Toggle</span>
              </div>
            </summary>
            <div className="space-y-4">
              {categories.map((category) => (
                <div key={category.name} className="text-sm">
                  <p className="font-semibold text-slate-900 dark:text-slate-100">{category.name}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {category.subcategories.map((subcategory) => (
                      <button
                        key={subcategory}
                        className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:bg-slate-800 dark:hover:text-white"
                      >
                        {subcategory}
                      </button>
                    ))}
                  </div>
                  <button className="mt-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
                    {category.guide}
                  </button>
                </div>
              ))}
            </div>
          </details>
          <details className="space-y-4 lg:open" open>
            <summary className="cursor-pointer list-none">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Collections
                </h2>
                <span className="text-xs text-slate-400 dark:text-slate-500 lg:hidden">Toggle</span>
              </div>
            </summary>
            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                  Seasonal
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {seasonalCollections.map((item) => (
                    <button
                      key={item}
                      className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:bg-slate-800 dark:hover:text-white"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                  Occasion
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {occasionCollections.map((item) => (
                    <button
                      key={item}
                      className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:bg-slate-800 dark:hover:text-white"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                  Trend
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {trendCollections.map((item) => (
                    <button
                      key={item}
                      className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:bg-slate-800 dark:hover:text-white"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </details>
          <details className="space-y-4 lg:open" open>
            <summary className="cursor-pointer list-none">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Filters</h2>
                <span className="text-xs text-slate-400 dark:text-slate-500 lg:hidden">Toggle</span>
              </div>
            </summary>
            <div className="grid gap-4 text-sm text-slate-600 dark:text-slate-300">
              {filters.map((filter) => (
                <div key={filter.label}>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                    {filter.label}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {filter.options.map((option) => (
                      <button
                        key={option}
                        className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:bg-slate-800 dark:hover:text-white"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                  Price range
                </p>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  ${priceRange[0].toLocaleString()} - $
                  {priceRange[1].toLocaleString()}
                </span>
              </div>
              <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/60">
                <input
                  type="range"
                  min="0"
                  max="1000000"
                  step="1000"
                  value={priceRange[0]}
                  onChange={(event) =>
                    setPriceRange((prev) => [
                      Math.min(Number(event.target.value), prev[1] - 1000),
                      prev[1],
                    ])
                  }
                  className="w-full accent-slate-800 dark:accent-slate-100"
                />
                <input
                  type="range"
                  min="0"
                  max="1000000"
                  step="1000"
                  value={priceRange[1]}
                  onChange={(event) =>
                    setPriceRange((prev) => [
                      prev[0],
                      Math.max(Number(event.target.value), prev[0] + 1000),
                    ])
                  }
                  className="w-full accent-slate-800 dark:accent-slate-100"
                />
                <div className="flex flex-wrap gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                  {[
                    "$0",
                    "$50",
                    "$200",
                    "$1k",
                    "$10k",
                    "$100k",
                    "$1M+",
                  ].map((marker) => (
                    <span
                      key={marker}
                      className="rounded-full border border-slate-200 bg-white px-2 py-1 dark:border-slate-700 dark:bg-slate-900"
                    >
                      {marker}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                Color
              </p>
              <div className="relative mt-3">
                <button
                  type="button"
                  onClick={() => setShowColorMenu((prev) => !prev)}
                  className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className="h-5 w-5 rounded-full border border-slate-200 dark:border-slate-700"
                      style={{
                        backgroundColor: selectedColor?.hex || "#f8fafc",
                      }}
                      aria-hidden="true"
                    />
                    {selectedColor ? selectedColor.name : "Select a color"}
                  </span>
                  <span className="text-slate-400 dark:text-slate-500">▾</span>
                </button>
                {showColorMenu && (
                  <div className="absolute left-0 right-0 z-10 mt-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-700 dark:bg-slate-900">
                    <input
                      type="text"
                      value={colorQuery}
                      onChange={(event) => setColorQuery(event.target.value)}
                      placeholder="Search colors"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 outline-none transition focus:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                    />
                    <div className="mt-3 max-h-40 space-y-1 overflow-y-auto">
                      {filteredColors.length === 0 ? (
                        <p className="px-2 py-2 text-xs text-slate-500 dark:text-slate-400">
                          No colors found.
                        </p>
                      ) : (
                        filteredColors.map((color) => (
                          <button
                            key={color.name}
                            type="button"
                            onClick={() => {
                              setSelectedColor(color)
                              setShowColorMenu(false)
                            }}
                            className="flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                          >
                            <span
                              className="h-5 w-5 rounded-full border border-slate-200 dark:border-slate-700"
                              style={{ backgroundColor: color.hex }}
                              aria-hidden="true"
                            />
                            {color.name}
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-4 rounded-2xl border border-amber-100 bg-amber-50 px-3 py-3 text-xs text-amber-900 dark:border-amber-200/40 dark:bg-amber-200/10 dark:text-amber-200">
                <p className="font-semibold">Popular shades</p>
                <p className="mt-1 text-amber-700 dark:text-amber-200">
                  {colorRecommendations.join(", ")} trending this week.
                </p>
              </div>
            </div>
          </details>
          <details className="space-y-3 lg:open" open>
            <summary className="cursor-pointer list-none">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Sort by</h2>
                <span className="text-xs text-slate-400 dark:text-slate-500 lg:hidden">Toggle</span>
              </div>
            </summary>
            <div className="flex flex-wrap gap-2">
              {sorts.map((sort) => (
                <button
                  key={sort}
                  className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:bg-slate-800 dark:hover:text-white"
                >
                  {sort}
                </button>
              ))}
            </div>
          </details>
        </aside>

        <div className="space-y-8">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                New arrivals
              </h2>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => scrollNewArrivals("left")}
                  className="hidden h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:text-slate-900 md:inline-flex dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600"
                  aria-label="Scroll new arrivals left"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => scrollNewArrivals("right")}
                  className="hidden h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:text-slate-900 md:inline-flex dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600"
                  aria-label="Scroll new arrivals right"
                >
                  →
                </button>
                <Link
                  to="/shop"
                  className="text-sm font-semibold text-slate-600 transition hover:text-slate-900 hover:underline dark:text-slate-300 dark:hover:text-white"
                >
                  View all →
                </Link>
              </div>
            </div>
            <div
              ref={newArrivalsRef}
              className="mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 scroll-smooth md:grid md:snap-none md:grid-cols-3 md:overflow-visible lg:grid-cols-4"
            >
              {newArrivals.map((item) => {
                const finalPrice = Math.round(
                  item.originalPrice * (1 - item.discountPercent / 100),
                )
                return (
                  <Link
                    key={item.id}
                    to={`/product/${item.id}`}
                    className="group relative min-w-[220px] snap-start rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm shadow-sm transition hover:-translate-y-1 hover:border-slate-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 md:min-w-0 dark:border-slate-800 dark:bg-slate-800/60 dark:hover:border-slate-700"
                  >
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 shadow-sm dark:bg-slate-950/70 dark:text-slate-300">
                      {item.badge}
                    </span>
                    <div className="flex h-40 items-center justify-center overflow-hidden rounded-xl bg-white dark:bg-slate-900">
                      <img
                        src={`data:image/svg+xml;utf8,${encodeURIComponent(
                          `<svg xmlns='http://www.w3.org/2000/svg' width='320' height='320' viewBox='0 0 320 320'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='#f1f5f9'/><stop offset='100%' stop-color='#e2e8f0'/></linearGradient></defs><rect width='320' height='320' fill='url(#g)'/><circle cx='160' cy='160' r='70' fill='#e2e8f0'/><text x='160' y='170' font-size='20' text-anchor='middle' fill='#94a3b8' font-family='Arial, sans-serif'>SKT</text></svg>`,
                        )}`}
                        alt={`${item.name} product image`}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-4 space-y-1">
                      <p className="font-semibold text-slate-900 dark:text-slate-100">
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {item.color}
                      </p>
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        ${finalPrice}
                      </p>
                    </div>
                    <span className="pointer-events-none absolute inset-x-4 bottom-4 translate-y-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100 dark:text-slate-300">
                      View details
                    </span>
                  </Link>
                )
              })}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Best sellers
              </h2>
              <button className="text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                See ranking
              </button>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {bestSellers.map((item) => (
                <div
                  key={item.name}
                  className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 text-sm dark:border-slate-800 dark:bg-slate-800/60"
                >
                  <div className="mb-3 h-24 rounded-xl bg-white/70 dark:bg-slate-900/60" />
                  <p className="font-semibold text-slate-900 dark:text-slate-100">{item.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{item.color}</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                    ${item.price}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Shop all products
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">{products.length} items</p>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {products.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 text-sm dark:border-slate-800 dark:bg-slate-800/60"
                >
                  <div className="mb-3 h-24 rounded-xl bg-white/70 dark:bg-slate-900/60" />
                  <p className="font-semibold text-slate-900 dark:text-slate-100">{item.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{item.color}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      $
                      {Math.round(
                        item.originalPrice * (1 - item.discountPercent / 100),
                      )}
                    </p>
                    <button
                      onClick={(event) => onAddToCart(item, { event })}
                      className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900 active:scale-[0.98] dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-white"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {promotions.map((promo) => (
          <div
            key={promo.title}
            className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">
              Promo
            </p>
            <p className="mt-2 font-semibold text-slate-900 dark:text-slate-100">{promo.title}</p>
            <p className="mt-1 text-slate-600 dark:text-slate-300">{promo.detail}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Gift guides and curated collections
          </h2>
          <div className="mt-4 grid gap-3">
            {giftGuides.map((guide) => (
              <div
                key={guide}
                className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300"
              >
                <p className="font-semibold text-slate-900 dark:text-slate-100">{guide}</p>
                <p className="mt-1">Explore curated picks for any occasion.</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Personalized recommendations
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Tailored to your browsing and wishlist.
          </p>
          <div className="mt-4 grid gap-3">
            {recommendations.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-800/60"
              >
                <div>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">{item.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{item.color}</p>
                </div>
                <p className="font-semibold text-slate-900 dark:text-slate-100">${item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
              Reviews
            </p>
            <h2 className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
              Customer ratings
            </h2>
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-300">4.8 ★ average rating</div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 text-sm dark:border-slate-800 dark:bg-slate-800/60"
            >
              <p className="text-slate-600 dark:text-slate-300">"{review.quote}"</p>
              <p className="mt-3 font-semibold text-slate-900 dark:text-slate-100">{review.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white px-6 py-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
            Social
          </p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Follow SKT and share your looks.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Instagram", "TikTok", "Pinterest", "Share"].map((social) => (
            <button
              key={social}
              className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:bg-slate-800"
            >
              {social}
            </button>
          ))}
        </div>
      </section>
    </section>
  )
}

export default ShopPage
