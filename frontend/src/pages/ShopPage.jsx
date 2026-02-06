import { useMemo, useState } from "react"

const ShopPage = ({ products, onAddToCart }) => {
  const [colorQuery, setColorQuery] = useState("")
  const [selectedColor, setSelectedColor] = useState(null)
  const [showColorMenu, setShowColorMenu] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 1000000])
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

  const newArrivals = [
    { name: "SKT Air Mesh Tee", color: "Stone", price: 58 },
    { name: "SKT Trail Jogger", color: "Midnight", price: 98 },
    { name: "SKT Halo Jacket", color: "Sandstone", price: 162 },
  ]

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

  return (
    <section className="space-y-10">
      <header className="rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
          Shop
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-slate-900">
          Explore SKT collections
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Browse categories, filter by size and color, and discover new drops.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
        <aside className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <details className="space-y-4 lg:open" open>
            <summary className="cursor-pointer list-none">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-900">Categories</h2>
                <span className="text-xs text-slate-400 lg:hidden">Toggle</span>
              </div>
            </summary>
            <div className="space-y-4">
              {categories.map((category) => (
                <div key={category.name} className="text-sm">
                  <p className="font-semibold text-slate-900">{category.name}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {category.subcategories.map((subcategory) => (
                      <button
                        key={subcategory}
                        className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                      >
                        {subcategory}
                      </button>
                    ))}
                  </div>
                  <button className="mt-2 text-xs font-semibold text-slate-500 hover:text-slate-900">
                    {category.guide}
                  </button>
                </div>
              ))}
            </div>
          </details>
          <details className="space-y-4 lg:open" open>
            <summary className="cursor-pointer list-none">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-900">
                  Collections
                </h2>
                <span className="text-xs text-slate-400 lg:hidden">Toggle</span>
              </div>
            </summary>
            <div className="space-y-4 text-sm text-slate-600">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Seasonal
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {seasonalCollections.map((item) => (
                    <button
                      key={item}
                      className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Occasion
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {occasionCollections.map((item) => (
                    <button
                      key={item}
                      className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Trend
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {trendCollections.map((item) => (
                    <button
                      key={item}
                      className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
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
                <h2 className="text-sm font-semibold text-slate-900">Filters</h2>
                <span className="text-xs text-slate-400 lg:hidden">Toggle</span>
              </div>
            </summary>
            <div className="grid gap-4 text-sm text-slate-600">
              {filters.map((filter) => (
                <div key={filter.label}>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    {filter.label}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {filter.options.map((option) => (
                      <button
                        key={option}
                        className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
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
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Price range
                </p>
                <span className="text-xs font-semibold text-slate-700">
                  ${priceRange[0].toLocaleString()} - $
                  {priceRange[1].toLocaleString()}
                </span>
              </div>
              <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
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
                  className="w-full accent-slate-800"
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
                  className="w-full accent-slate-800"
                />
                <div className="flex flex-wrap gap-2 text-[11px] text-slate-500">
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
                      className="rounded-full border border-slate-200 bg-white px-2 py-1"
                    >
                      {marker}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Color
              </p>
              <div className="relative mt-3">
                <button
                  type="button"
                  onClick={() => setShowColorMenu((prev) => !prev)}
                  className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className="h-5 w-5 rounded-full border border-slate-200"
                      style={{
                        backgroundColor: selectedColor?.hex || "#f8fafc",
                      }}
                      aria-hidden="true"
                    />
                    {selectedColor ? selectedColor.name : "Select a color"}
                  </span>
                  <span className="text-slate-400">▾</span>
                </button>
                {showColorMenu && (
                  <div className="absolute left-0 right-0 z-10 mt-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-lg">
                    <input
                      type="text"
                      value={colorQuery}
                      onChange={(event) => setColorQuery(event.target.value)}
                      placeholder="Search colors"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-700 outline-none transition focus:border-slate-300"
                    />
                    <div className="mt-3 max-h-40 space-y-1 overflow-y-auto">
                      {filteredColors.length === 0 ? (
                        <p className="px-2 py-2 text-xs text-slate-500">
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
                            className="flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                          >
                            <span
                              className="h-5 w-5 rounded-full border border-slate-200"
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
              <div className="mt-4 rounded-2xl border border-amber-100 bg-amber-50 px-3 py-3 text-xs text-amber-900">
                <p className="font-semibold">Popular shades</p>
                <p className="mt-1 text-amber-700">
                  {colorRecommendations.join(", ")} trending this week.
                </p>
              </div>
            </div>
          </details>
          <details className="space-y-3 lg:open" open>
            <summary className="cursor-pointer list-none">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-900">Sort by</h2>
                <span className="text-xs text-slate-400 lg:hidden">Toggle</span>
              </div>
            </summary>
            <div className="flex flex-wrap gap-2">
              {sorts.map((sort) => (
                <button
                  key={sort}
                  className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                >
                  {sort}
                </button>
              ))}
            </div>
          </details>
        </aside>

        <div className="space-y-8">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                New arrivals
              </h2>
              <button className="text-sm font-semibold text-slate-600 hover:text-slate-900">
                View all
              </button>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {newArrivals.map((item) => (
                <div
                  key={item.name}
                  className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 text-sm"
                >
                  <div className="mb-3 h-24 rounded-xl bg-white/70" />
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.color}</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">
                    ${item.price}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                Best sellers
              </h2>
              <button className="text-sm font-semibold text-slate-600 hover:text-slate-900">
                See ranking
              </button>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {bestSellers.map((item) => (
                <div
                  key={item.name}
                  className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 text-sm"
                >
                  <div className="mb-3 h-24 rounded-xl bg-white/70" />
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.color}</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">
                    ${item.price}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                Shop all products
              </h2>
              <p className="text-sm text-slate-500">{products.length} items</p>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {products.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 text-sm"
                >
                  <div className="mb-3 h-24 rounded-xl bg-white/70" />
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.color}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">
                      $
                      {Math.round(
                        item.originalPrice * (1 - item.discountPercent / 100),
                      )}
                    </p>
                    <button
                      onClick={() => onAddToCart(item)}
                      className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
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
            className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm shadow-sm"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
              Promo
            </p>
            <p className="mt-2 font-semibold text-slate-900">{promo.title}</p>
            <p className="mt-1 text-slate-600">{promo.detail}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Gift guides and curated collections
          </h2>
          <div className="mt-4 grid gap-3">
            {giftGuides.map((guide) => (
              <div
                key={guide}
                className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-600"
              >
                <p className="font-semibold text-slate-900">{guide}</p>
                <p className="mt-1">Explore curated picks for any occasion.</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Personalized recommendations
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Tailored to your browsing and wishlist.
          </p>
          <div className="mt-4 grid gap-3">
            {recommendations.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm"
              >
                <div>
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.color}</p>
                </div>
                <p className="font-semibold text-slate-900">${item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Reviews
            </p>
            <h2 className="mt-2 text-lg font-semibold text-slate-900">
              Customer ratings
            </h2>
          </div>
          <div className="text-sm text-slate-600">4.8 ★ average rating</div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 text-sm"
            >
              <p className="text-slate-600">"{review.quote}"</p>
              <p className="mt-3 font-semibold text-slate-900">{review.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white px-6 py-6 shadow-sm">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Social
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Follow SKT and share your looks.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Instagram", "TikTok", "Pinterest", "Share"].map((social) => (
            <button
              key={social}
              className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
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
  const seasonalCollections = ["Spring", "Summer", "Fall", "Winter"]
  const occasionCollections = ["Weddings", "Parties", "Workwear", "Casual wear"]
  const trendCollections = ["Trending now", "New arrivals", "Editor’s picks"]
