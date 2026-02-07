import { useEffect, useMemo, useRef, useState } from "react"
import { Link, Route, Routes, useLocation } from "react-router-dom"
import { Menu } from "lucide-react"
import { parsePhoneNumberFromString } from "libphonenumber-js"
import countries from "world-countries"
import AccountPage from "./pages/AccountPage.jsx"
import CartPage from "./pages/CartPage.jsx"
import HomePage from "./pages/HomePage.jsx"
import ShopPage from "./pages/ShopPage.jsx"
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx"
import CheckoutPage from "./pages/CheckoutPage.jsx"
import ProductPage from "./pages/ProductPage.jsx"

const products = [
  {
    id: "tee",
    name: "SKT Core Tee",
    color: "Cloud White",
    originalPrice: 60,
    discountPercent: 20,
    tag: "Today’s Deal",
  },
  {
    id: "pants",
    name: "SKT Everyday Pants",
    color: "Graphite",
    originalPrice: 110,
    discountPercent: 16,
    tag: "Limited Offer",
  },
  {
    id: "jacket",
    name: "SKT Utility Jacket",
    color: "Sandstone",
    originalPrice: 185,
    discountPercent: 20,
    tag: "Today’s Deal",
  },
  {
    id: "hoodie",
    name: "SKT Air Knit Hoodie",
    color: "Midnight",
    originalPrice: 140,
    discountPercent: 16,
    tag: "Today’s Deal",
  },
  {
    id: "cap",
    name: "SKT Trail Cap",
    color: "Forest",
    originalPrice: 45,
    discountPercent: 22,
    tag: "Limited Offer",
  },
]

function App() {
  const location = useLocation()
  const [showAuth, setShowAuth] = useState(false)
  const [showAuthMenu, setShowAuthMenu] = useState(false)
  const [showLocation, setShowLocation] = useState(false)
  const [activeAuth, setActiveAuth] = useState("login")
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [signupFullName, setSignupFullName] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("")
  const [signupPhone, setSignupPhone] = useState("")
  const [signupAddress, setSignupAddress] = useState("")
  const [signupErrors, setSignupErrors] = useState({})
  const [locationValue, setLocationValue] = useState("")
  const [locationQuery, setLocationQuery] = useState("")
  const [showCountryList, setShowCountryList] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [theme, setTheme] = useState("light")
  const [cartPulse, setCartPulse] = useState(false)
  const [flyItem, setFlyItem] = useState(null)
  const cartButtonRef = useRef(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const searchInputRef = useRef(null)
  const [showMenu, setShowMenu] = useState(false)

  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.finalPrice * item.qty, 0),
    [cartItems],
  )

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    if (params.get("auth") === "login") {
      setActiveAuth("login")
      setShowAuth(true)
    }
  }, [location.search])

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches
    const nextTheme = storedTheme || (prefersDark ? "dark" : "light")
    setTheme(nextTheme)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    localStorage.setItem("theme", theme)
  }, [theme])

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 0)
    }
  }, [searchOpen])

  useEffect(() => {
    if (!showMenu) return undefined
    const handleKey = (event) => {
      if (event.key === "Escape") {
        setShowMenu(false)
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [showMenu])

  const countryOptions = useMemo(
    () =>
      countries
        .map((country) => country.name.common)
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b)),
    [],
  )

  const countryCodeMap = useMemo(() => {
    const map = new Map()
    countries.forEach((country) => {
      if (country?.name?.common && country?.cca2) {
        map.set(country.name.common.toLowerCase(), country.cca2)
      }
    })
    return map
  }, [])

  const filteredCountries = useMemo(() => {
    if (!locationQuery) return countryOptions
    const query = locationQuery.toLowerCase()
    return countryOptions.filter((country) =>
      country.toLowerCase().includes(query),
    )
  }, [countryOptions, locationQuery])

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return []
    return products
      .filter((product) =>
        [product.name, product.color, product.tag]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(query)),
      )
      .slice(0, 6)
  }, [searchQuery])

  const resolveCountryCode = () => {
    const direct = locationValue.toLowerCase()
    if (countryCodeMap.has(direct)) {
      return countryCodeMap.get(direct)
    }
    const fromAddress = countryOptions.find((country) =>
      signupAddress.toLowerCase().includes(country.toLowerCase()),
    )
    if (fromAddress) {
      return countryCodeMap.get(fromAddress.toLowerCase())
    }
    return undefined
  }

  const validateSignup = () => {
    const errors = {}
    if (!signupFullName.trim()) {
      errors.fullName = "You must fill out this field."
    }
    if (!signupEmail.trim()) {
      errors.email = "You must fill out this field."
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(signupEmail.trim())) {
      errors.email = "Invalid email."
    }
    if (!signupPassword.trim()) {
      errors.password = "You must fill out this field."
    }
    if (!signupConfirmPassword.trim()) {
      errors.confirmPassword = "You must fill out this field."
    } else if (signupPassword !== signupConfirmPassword) {
      errors.confirmPassword = "Passwords do not match."
    }
    if (!signupPhone.trim()) {
      errors.phone = "You must fill out this field."
    } else {
      const countryCode = resolveCountryCode()
      const phoneNumber = parsePhoneNumberFromString(
        signupPhone.trim(),
        countryCode,
      )
      if (!phoneNumber || !phoneNumber.isValid()) {
        errors.phone = "Invalid phone number."
      }
    }
    if (!signupAddress.trim()) {
      errors.address = "You must fill out this field."
    }
    setSignupErrors(errors)
    return Object.keys(errors).length === 0
  }

  const triggerCartAnimation = (event) => {
    const cartRect = cartButtonRef.current?.getBoundingClientRect()
    const sourceRect = event?.currentTarget?.getBoundingClientRect()
    if (cartRect && sourceRect) {
      setFlyItem({
        id: Date.now(),
        startX: sourceRect.left + sourceRect.width / 2,
        startY: sourceRect.top + sourceRect.height / 2,
        endX: cartRect.left + cartRect.width / 2,
        endY: cartRect.top + cartRect.height / 2,
      })
    }
    setCartPulse(true)
    setTimeout(() => setCartPulse(false), 450)
  }

  const handleAddToCart = (product, options = {}) => {
    const finalPrice = Math.round(
      product.originalPrice * (1 - product.discountPercent / 100),
    )
    const size = options.size || "M"
    triggerCartAnimation(options.event)
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.size === size,
      )
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, qty: item.qty + 1 }
            : item,
        )
      }
      return [
        ...prev,
        {
          ...product,
          finalPrice,
          size,
          qty: 1,
        },
      ]
    })
  }

  const handleQtyChange = (id, size, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id && item.size === size
            ? { ...item, qty: Math.max(1, item.qty + delta) }
            : item,
        )
        .filter((item) => item.qty > 0),
    )
  }

  const handleRemove = (id, size) => {
    setCartItems((prev) =>
      prev.filter((item) =>
        size ? !(item.id === id && item.size === size) : item.id !== id,
      ),
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center" aria-label="SKT home">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-[11px] font-semibold tracking-[0.28em] text-slate-900 shadow-sm transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-600">
                SKT
              </div>
            </Link>
            <button
              type="button"
              onClick={() => setShowLocation(true)}
              className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 transition hover:border-slate-300 hover:text-slate-900 md:flex dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-slate-600"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-500" />
              {locationValue || "Set location"}
            </button>
            {locationValue && (
              <span className="hidden text-xs text-slate-400 md:inline dark:text-slate-500">
                Delivering to {locationValue}
              </span>
            )}
          </div>
          <div className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 md:flex">
            {["Women", "Men", "Kids", "Baby"].map((category) => (
              <Link
                key={category}
                to="/shop"
                className="transition hover:text-slate-900 dark:hover:text-white"
              >
                {category}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowMenu(true)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-900 md:hidden dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-600"
              aria-label="Open menu"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <div className="group relative">
              <button
                type="button"
                onClick={() => setSearchOpen((prev) => !prev)}
                className="rounded-full border border-slate-200 bg-white p-2 text-slate-500 transition hover:border-slate-300 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-600"
                aria-label="Search"
                aria-expanded={searchOpen}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path
                    d="M21 21l-4.3-4.3m1.8-5.2a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-slate-900 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white opacity-0 transition group-hover:opacity-100 dark:bg-slate-100 dark:text-slate-900">
                Search
              </span>
            </div>
            <div className="group relative">
              <Link
                to="/cart"
                ref={cartButtonRef}
                className={`relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-600 ${
                  cartPulse ? "animate-cart-wiggle" : ""
                }`}
                aria-label="Open cart"
              >
                <svg viewBox="0 0 24 24" className="block h-4 w-4" aria-hidden="true">
                  <path
                    d="M3 4h2l2.4 10.4a2 2 0 0 0 2 1.6h7.4a2 2 0 0 0 2-1.6L20 7H6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="9" cy="19" r="1.6" />
                  <circle cx="17" cy="19" r="1.6" />
                </svg>
                {cartItems.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-slate-900 px-1 text-[10px] font-semibold text-white dark:bg-slate-100 dark:text-slate-900">
                    {cartItems.length}
                  </span>
                )}
              </Link>
              <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-slate-900 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white opacity-0 transition group-hover:opacity-100 dark:bg-slate-100 dark:text-slate-900">
                Cart
              </span>
            </div>
            <div className="group relative">
              <button
                type="button"
                onClick={() => setShowMenu((prev) => !prev)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault()
                    setShowMenu((prev) => !prev)
                  }
                }}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-600"
                aria-label="Open menu"
                aria-expanded={showMenu}
              >
                <Menu className="h-4 w-4" />
              </button>
              <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-slate-900 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white opacity-0 transition group-hover:opacity-100 dark:bg-slate-100 dark:text-slate-900">
                Menu
              </span>
              <div
                className={`absolute right-0 mt-3 hidden w-60 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl transition duration-200 md:block dark:border-slate-700 dark:bg-slate-900 ${
                  showMenu ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-2"
                }`}
              >
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400">
                      Navigation
                    </p>
                    <div className="mt-2 grid gap-1 font-semibold text-slate-700 dark:text-slate-200">
                      <Link to="/" onClick={() => setShowMenu(false)} className="rounded-lg px-2 py-1.5 transition hover:bg-slate-50 dark:hover:bg-slate-800">
                        Home
                      </Link>
                      <Link to="/shop" onClick={() => setShowMenu(false)} className="rounded-lg px-2 py-1.5 transition hover:bg-slate-50 dark:hover:bg-slate-800">
                        Shop
                      </Link>
                      <Link to="/shop" onClick={() => setShowMenu(false)} className="rounded-lg px-2 py-1.5 transition hover:bg-slate-50 dark:hover:bg-slate-800">
                        New Arrivals
                      </Link>
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400">
                      Categories
                    </p>
                    <div className="mt-2 grid gap-1 font-semibold text-slate-700 dark:text-slate-200">
                      {["Women", "Men", "Kids", "Baby"].map((category) => (
                        <Link
                          key={category}
                          to="/shop"
                          onClick={() => setShowMenu(false)}
                          className="rounded-lg px-2 py-1.5 transition hover:bg-slate-50 dark:hover:bg-slate-800"
                        >
                          {category}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400">
                      Account
                    </p>
                    <div className="mt-2 grid gap-1 font-semibold text-slate-700 dark:text-slate-200">
                      <Link to="/account" onClick={() => setShowMenu(false)} className="rounded-lg px-2 py-1.5 transition hover:bg-slate-50 dark:hover:bg-slate-800">
                        My Account
                      </Link>
                      <Link to="/account" onClick={() => setShowMenu(false)} className="rounded-lg px-2 py-1.5 transition hover:bg-slate-50 dark:hover:bg-slate-800">
                        Orders
                      </Link>
                      <Link to="/account" onClick={() => setShowMenu(false)} className="rounded-lg px-2 py-1.5 transition hover:bg-slate-50 dark:hover:bg-slate-800">
                        Wishlist
                      </Link>
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400">
                      Support
                    </p>
                    <div className="mt-2 grid gap-1 font-semibold text-slate-700 dark:text-slate-200">
                      <a href="#" className="rounded-lg px-2 py-1.5 transition hover:bg-slate-50 dark:hover:bg-slate-800">
                        Help / Contact
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() =>
                setTheme((prev) => (prev === "dark" ? "light" : "dark"))
              }
              className="group hidden h-6 w-11 items-center rounded-full border border-slate-200 bg-slate-100 p-0.5 transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600 lg:inline-flex"
              aria-label="Toggle dark mode"
              aria-pressed={theme === "dark"}
            >
              <span className="sr-only">
                {theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              </span>
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full bg-white shadow transition ${
                  theme === "dark" ? "translate-x-5 bg-slate-900 text-slate-100" : "translate-x-0 text-slate-500"
                }`}
              >
                {theme === "dark" ? (
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
                    <path
                      d="M21 14.5A8.5 8.5 0 1 1 9.5 3 6.5 6.5 0 0 0 21 14.5Z"
                      fill="currentColor"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
                    <circle cx="12" cy="12" r="4.5" fill="currentColor" />
                  </svg>
                )}
              </span>
            </button>
          </div>
        </nav>
        {searchOpen && (
          <div className="border-t border-slate-100 bg-white/95 px-6 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mx-auto flex max-w-6xl flex-col gap-3">
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-slate-400" aria-hidden="true">
                  <path
                    d="M21 21l-4.3-4.3m1.8-5.2a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  ref={searchInputRef}
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      setSearchOpen(false)
                      setSearchQuery("")
                    }
                  }}
                  placeholder="Search products, colors, drops"
                  className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none dark:text-slate-100 dark:placeholder:text-slate-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(false)
                    setSearchQuery("")
                  }}
                  className="rounded-full px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400 transition hover:text-slate-900 dark:text-slate-500 dark:hover:text-white"
                >
                  Close
                </button>
              </div>
              {searchQuery.trim() ? (
                <div className="grid gap-2">
                  {searchResults.length === 0 ? (
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      No results found. Try a different search.
                    </p>
                  ) : (
                    searchResults.map((result) => (
                      <Link
                        key={result.id}
                        to={`/product/${result.id}`}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm transition hover:border-slate-200 hover:bg-white dark:border-slate-800 dark:bg-slate-800/60 dark:hover:bg-slate-900"
                      >
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-slate-100">
                            {result.name}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {result.color} · {result.tag}
                          </p>
                        </div>
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          View
                        </span>
                      </Link>
                    ))
                  )}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  {["New arrivals", "Outerwear", "Caps", "Limited Offer"].map(
                    (suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => setSearchQuery(suggestion)}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-500 transition hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:text-slate-100"
                      >
                        {suggestion}
                      </button>
                    ),
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </header>
      <div
        className={`fixed inset-0 z-[70] flex transition md:hidden ${
          showMenu ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-slate-900/40 transition-opacity ${
            showMenu ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Close menu"
          onClick={() => setShowMenu(false)}
        />
        <aside
          className={`relative h-[85%] w-full transform overflow-y-auto rounded-b-3xl bg-white px-6 py-6 shadow-xl transition-transform duration-300 ease-out dark:bg-slate-950 ${
            showMenu ? "translate-y-0" : "-translate-y-full"
          }`}
        >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                Menu
              </span>
              <button
                type="button"
                onClick={() => setShowMenu(false)}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="mt-6 space-y-6">
              <div className="space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400">
                  Navigation
                </p>
                <div className="grid gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  <Link to="/" onClick={() => setShowMenu(false)} className="rounded-xl px-3 py-2 transition hover:bg-slate-50 dark:hover:bg-slate-900">
                    Home
                  </Link>
                  <Link to="/shop" onClick={() => setShowMenu(false)} className="rounded-xl px-3 py-2 transition hover:bg-slate-50 dark:hover:bg-slate-900">
                    Shop
                  </Link>
                  <Link to="/shop" onClick={() => setShowMenu(false)} className="rounded-xl px-3 py-2 transition hover:bg-slate-50 dark:hover:bg-slate-900">
                    New Arrivals
                  </Link>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400">
                  Categories
                </p>
                <div className="grid gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {["Women", "Men", "Kids", "Baby"].map((category) => (
                    <Link
                      key={category}
                      to="/shop"
                      onClick={() => setShowMenu(false)}
                      className="rounded-xl px-3 py-2 transition hover:bg-slate-50 dark:hover:bg-slate-900"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400">
                  Account
                </p>
                <div className="grid gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  <Link to="/account" onClick={() => setShowMenu(false)} className="rounded-xl px-3 py-2 transition hover:bg-slate-50 dark:hover:bg-slate-900">
                    My Account
                  </Link>
                  <Link to="/account" onClick={() => setShowMenu(false)} className="rounded-xl px-3 py-2 transition hover:bg-slate-50 dark:hover:bg-slate-900">
                    Orders
                  </Link>
                  <Link to="/account" onClick={() => setShowMenu(false)} className="rounded-xl px-3 py-2 transition hover:bg-slate-50 dark:hover:bg-slate-900">
                    Wishlist
                  </Link>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400">
                  Support
                </p>
                <div className="grid gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  <a href="#" className="rounded-xl px-3 py-2 transition hover:bg-slate-50 dark:hover:bg-slate-900">
                    Help / Contact
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>

      <main className="mx-auto max-w-6xl px-6 py-12" id="top">
        <Routes>
          <Route
            path="/"
            element={<HomePage deals={products} />}
          />
          <Route
            path="/shop"
            element={<ShopPage products={products} onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/product/:id"
            element={<ProductPage products={products} onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/cart"
            element={
              <CartPage
                cartItems={cartItems}
                products={products}
                total={total}
                onAddToCart={handleAddToCart}
                onQtyChange={handleQtyChange}
                onRemove={handleRemove}
              />
            }
          />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route
            path="/checkout"
            element={<CheckoutPage cartItems={cartItems} total={total} />}
          />
        </Routes>
      </main>

      {flyItem && (
        <div
          className="pointer-events-none fixed left-0 top-0 z-[60] h-3 w-3 rounded-full bg-slate-900/80 ring-2 ring-white/80 dark:bg-slate-100/90 dark:ring-slate-800 animate-fly-to-cart"
          style={{
            "--start-x": `${flyItem.startX}px`,
            "--start-y": `${flyItem.startY}px`,
            "--end-x": `${flyItem.endX}px`,
            "--end-y": `${flyItem.endY}px`,
          }}
          onAnimationEnd={() => setFlyItem(null)}
        />
      )}

      {showAuth && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {activeAuth === "login" ? "Welcome back" : "Create your account"}
              </h2>
              <button
                onClick={() => setShowAuth(false)}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:border-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              >
                Close
              </button>
            </div>
            <div className="mt-4 flex rounded-full bg-slate-100 p-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {["login", "signup"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveAuth(tab)}
                  className={`flex-1 rounded-full px-4 py-2 transition ${
                    activeAuth === tab
                      ? "bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-slate-100"
                      : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                  }`}
                >
                  {tab === "login" ? "Log in" : "Sign up"}
                </button>
              ))}
            </div>
            <form
              className="mt-4 space-y-3"
              onSubmit={(event) => {
                event.preventDefault()
                if (activeAuth === "signup") {
                  const isValid = validateSignup()
                  if (isValid) {
                    setShowAuth(false)
                  }
                }
              }}
            >
              {activeAuth === "signup" ? (
                <>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300">
                    Full name
                    <input
                      type="text"
                      value={signupFullName}
                      onChange={(event) => setSignupFullName(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    />
                    {signupErrors.fullName && (
                      <p className="mt-2 text-xs text-rose-500">
                        {signupErrors.fullName}
                      </p>
                    )}
                  </label>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300">
                    Phone number
                    <input
                      type="tel"
                      value={signupPhone}
                      onChange={(event) => setSignupPhone(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    />
                    {signupErrors.phone && (
                      <p className="mt-2 text-xs text-rose-500">
                        {signupErrors.phone}
                      </p>
                    )}
                  </label>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300">
                    Email address
                    <input
                      type="email"
                      value={signupEmail}
                      onChange={(event) => setSignupEmail(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    />
                    {signupErrors.email && (
                      <p className="mt-2 text-xs text-rose-500">
                        {signupErrors.email}
                      </p>
                    )}
                  </label>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300">
                    Password
                    <input
                      type="password"
                      value={signupPassword}
                      onChange={(event) => setSignupPassword(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    />
                    {signupErrors.password && (
                      <p className="mt-2 text-xs text-rose-500">
                        {signupErrors.password}
                      </p>
                    )}
                  </label>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300">
                    Re-enter password
                    <input
                      type="password"
                      value={signupConfirmPassword}
                      onChange={(event) =>
                        setSignupConfirmPassword(event.target.value)
                      }
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    />
                    {signupErrors.confirmPassword && (
                      <p className="mt-2 text-xs text-rose-500">
                        {signupErrors.confirmPassword}
                      </p>
                    )}
                  </label>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300">
                    Address
                    <input
                      type="text"
                      value={signupAddress}
                      onChange={(event) => {
                        const nextAddress = event.target.value
                        setSignupAddress(nextAddress)
                        setLocationValue(nextAddress)
                        setLocationQuery(nextAddress)
                      }}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    />
                    {signupErrors.address && (
                      <p className="mt-2 text-xs text-rose-500">
                        {signupErrors.address}
                      </p>
                    )}
                  </label>
                </>
              ) : (
                <>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300">
                    Email address
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(event) => setLoginEmail(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    />
                  </label>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300">
                    Password
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(event) => setLoginPassword(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    />
                    <Link
                      to="/reset-password"
                      className="mt-2 inline-flex text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                      onClick={() => setShowAuth(false)}
                    >
                      Forgot Password?
                    </Link>
                  </label>
                </>
              )}
              <button
                type="submit"
                className="w-full rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
              >
                {activeAuth === "login" ? "Log in" : "Create account"}
              </button>
              {activeAuth === "signup" ? (
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setActiveAuth("login")}
                    className="font-semibold text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
                  >
                    Please sign in.
                  </button>
                </p>
              ) : null}
            </form>
          </div>
        </div>
      )}

      {showLocation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Update your location
              </h2>
              <button
                onClick={() => setShowLocation(false)}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:border-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              >
                Close
              </button>
            </div>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
              To update your location, please select your country from the dropdown
              list. If you don't see any options, click "Refresh" or type the first
              few letters of your country name to search. Once you've selected your
              country, hit the "Save" button to update your location.
            </p>
            <div className="mt-5 grid gap-3">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                Country
                <input
                  type="text"
                  value={locationQuery}
                  onChange={(event) => setLocationQuery(event.target.value)}
                  onFocus={() => setShowCountryList(true)}
                  onClick={() => setShowCountryList(true)}
                  onBlur={() => {
                    setTimeout(() => setShowCountryList(false), 120)
                  }}
                  placeholder="Search or select a country"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                />
              </label>
              {showCountryList && (
                <div className="max-h-52 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-800">
                  {filteredCountries.length === 0 ? (
                    <p className="px-2 py-3 text-xs text-slate-500 dark:text-slate-400">
                      No countries match your search.
                    </p>
                  ) : (
                    <div className="grid gap-1">
                      {filteredCountries.map((country) => (
                        <button
                          key={country}
                          type="button"
                          onClick={() => {
                            setLocationValue(country)
                            setLocationQuery(country)
                            setShowCountryList(false)
                          }}
                          className={`rounded-xl px-3 py-2 text-left text-sm transition ${
                            locationValue === country
                              ? "bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-slate-100"
                              : "text-slate-600 hover:bg-white hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-slate-100"
                          }`}
                        >
                          {country}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setShowLocation(false)}
                  className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
