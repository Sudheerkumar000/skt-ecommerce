import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import Skeleton from "../components/Skeleton.jsx"

const HomePage = ({ deals }) => {
  const heroSlides = useMemo(() => deals.slice(0, 5), [deals])
  const [activeSlide, setActiveSlide] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [heroSlides.length])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900)
    return () => clearTimeout(timer)
  }, [])

  const goToSlide = (index) => {
    setActiveSlide((index + heroSlides.length) % heroSlides.length)
  }
  const recommendations = [
    { name: "SKT Motion Tee", color: "Olive", price: 54 },
    { name: "SKT Drift Shorts", color: "Stone", price: 68 },
    { name: "SKT Trail Cap", color: "Forest", price: 32 },
  ]

  const collections = [
    {
      title: "New arrivals",
      description: "Fresh silhouettes designed for spring movement.",
      tag: "Drop 07",
    },
    {
      title: "Performance edit",
      description: "Breathable layers for daily training and travel.",
      tag: "Core",
    },
    {
      title: "Weekend uniform",
      description: "Relaxed fits made for off-duty comfort.",
      tag: "Relaxed",
    },
  ]

  const promotions = [
    { title: "Midweek motion sale", detail: "Up to 25% off essentials" },
    { title: "Free shipping", detail: "On orders over $120" },
    { title: "Members only drop", detail: "Early access this Friday" },
  ]

  const categories = [
    "Tops",
    "Bottoms",
    "Outerwear",
    "Accessories",
    "Sets",
  ]

  const testimonials = [
    {
      quote:
        "The SKT Core Tee is my everyday favorite. The fit is precise and the fabric feels premium.",
      name: "Jamie L.",
    },
    {
      quote:
        "Fast shipping, excellent quality, and the lookbook styling is on point.",
      name: "Ravi P.",
    },
    {
      quote:
        "I love how easy it is to find new drops and track my order updates.",
      name: "Marina S.",
    },
  ]

  if (isLoading) {
    return (
      <div className="space-y-10">
        <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 px-6 py-10 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 md:px-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-4">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-4 w-5/6" />
              <div className="flex gap-3">
                <Skeleton className="h-10 w-36 rounded-full" />
                <Skeleton className="h-10 w-36 rounded-full" />
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="mt-4 h-52 w-full rounded-2xl" />
              <Skeleton className="mt-4 h-4 w-2/3" />
              <Skeleton className="mt-2 h-3 w-1/3" />
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((slot) => (
            <div
              key={slot}
              className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <Skeleton className="h-3 w-20" />
              <Skeleton className="mt-3 h-4 w-3/4" />
              <Skeleton className="mt-2 h-3 w-1/2" />
            </div>
          ))}
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((slot) => (
            <div
              key={slot}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <Skeleton className="h-40 w-full rounded-xl" />
              <Skeleton className="mt-4 h-4 w-3/4" />
              <Skeleton className="mt-2 h-3 w-1/2" />
              <div className="mt-4 grid gap-2">
                <Skeleton className="h-9 w-full rounded-full" />
                <Skeleton className="h-9 w-full rounded-full" />
              </div>
            </div>
          ))}
        </section>
      </div>
    )
  }

  return (
    <>
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 px-6 py-10 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-5">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            SKT Apparel
          </p>
          <div className="max-w-xl">
            <h1 className="text-4xl font-semibold leading-tight text-slate-900 dark:text-slate-100 md:text-5xl">
              Minimal streetwear, built for everyday motion.
            </h1>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-300 md:text-lg">
              Discover curated drops of SKT essentials with clean silhouettes,
              premium fabrics, and intentional details.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <button className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white">
              Shop new arrivals
            </button>
            <button className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-white">
              View lookbook
            </button>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
              Today’s Deals
            </p>
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {heroSlides.map((slide) => (
                  <Link
                    key={slide.id}
                    to={`/product/${slide.id}`}
                    className="w-full flex-shrink-0 space-y-3"
                  >
                    <div className="relative h-52 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-200 via-slate-100 to-slate-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950">
                      <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm dark:bg-slate-950/80 dark:text-slate-200">
                        {slide.tag}
                      </div>
                      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          {slide.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {slide.color}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        $
                        {Math.round(
                          slide.originalPrice * (1 - slide.discountPercent / 100),
                        )}
                      </p>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Today’s Deals · Limited-time pricing
                    </p>
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex gap-2">
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.id}
                    onClick={() => goToSlide(index)}
                    className={`h-2.5 w-2.5 rounded-full transition ${
                      index === activeSlide
                        ? "bg-slate-900 dark:bg-slate-100"
                        : "bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600"
                    }`}
                    aria-label={`Go to ${slide.name}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => goToSlide(activeSlide - 1)}
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:text-white"
                  aria-label="Previous slide"
                >
                  Prev
                </button>
                <button
                  onClick={() => goToSlide(activeSlide + 1)}
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:text-white"
                  aria-label="Next slide"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {promotions.map((promo) => (
          <div
            key={promo.title}
            className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">
              Promo
            </p>
            <p className="mt-2 font-semibold text-slate-900 dark:text-slate-100">
              {promo.title}
            </p>
            <p className="mt-1 text-slate-600 dark:text-slate-300">
              {promo.detail}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-12 rounded-3xl border border-slate-200 bg-white px-6 py-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:px-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
              Categories
            </p>
            <h2 className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
              Quick shop
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:bg-slate-800"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-14 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Featured picks
          </h2>
          <button className="text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
            Explore all
          </button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {deals.slice(0, 3).map((item) => (
            <article
              key={item.id}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-600"
            >
              <div className="relative mb-4 h-40 overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 via-slate-50 to-white dark:from-slate-800 dark:via-slate-900 dark:to-slate-950">
                <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/60 to-transparent" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {item.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {item.color}
                  </p>
                </div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  $
                  {Math.round(
                    item.originalPrice * (1 - item.discountPercent / 100),
                  )}
                </p>
              </div>
              <div className="mt-4 grid gap-2">
                <button className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-white">
                  Quick View
                </button>
                <Link
                  to={`/product/${item.id}`}
                  className="rounded-full bg-slate-900 px-4 py-2 text-center text-xs font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
                >
                  View Deal
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Featured collections
          </h2>
          <div className="mt-4 grid gap-4">
            {collections.map((collection) => (
              <div
                key={collection.title}
                className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-800/60"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                  {collection.tag}
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {collection.title}
                </p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  {collection.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Personalized for you
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Based on your browsing history and saved favorites.
          </p>
          <div className="mt-4 grid gap-3">
            {recommendations.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-800/60"
              >
                <div>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">
                    {item.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {item.color}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-900 dark:text-slate-100">
                    ${item.price}
                  </p>
                  <button className="mt-1 text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-14 rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:px-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
              Reviews
            </p>
            <h2 className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
              Loved by the SKT community
            </h2>
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-300">
            4.9 average rating • 2,300+ verified orders
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {testimonials.map((review) => (
            <div
              key={review.name}
              className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 text-sm dark:border-slate-800 dark:bg-slate-800/60"
            >
              <p className="text-slate-600 dark:text-slate-300">
                "{review.quote}"
              </p>
              <p className="mt-3 font-semibold text-slate-900 dark:text-slate-100">
                {review.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-16 border-t border-slate-200 pt-8 dark:border-slate-800">
        <div className="grid gap-6 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <img src="/skt-logo.png" alt="SKT" className="h-10 w-auto" />
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              Minimal apparel designed for motion, crafted with premium fabrics.
            </p>
          </div>
          <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <p className="font-semibold text-slate-900 dark:text-slate-100">
              Support
            </p>
            <a className="block hover:text-slate-900 dark:hover:text-white" href="#">
              Help center
            </a>
            <a className="block hover:text-slate-900 dark:hover:text-white" href="#">
              Shipping & returns
            </a>
            <a className="block hover:text-slate-900 dark:hover:text-white" href="#">
              Size guide
            </a>
          </div>
          <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <p className="font-semibold text-slate-900 dark:text-slate-100">
              Connect
            </p>
            <div className="flex gap-3">
              {["Instagram", "TikTok", "Pinterest"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:bg-slate-800"
                >
                  {social}
                </a>
              ))}
            </div>
            <a className="block hover:text-slate-900 dark:hover:text-white" href="#">
              Newsletter
            </a>
          </div>
        </div>
        <p className="mt-6 text-xs text-slate-500 dark:text-slate-400">
          © 2026 SKT Apparel. All rights reserved.
        </p>
      </footer>
    </>
  )
}

export default HomePage
