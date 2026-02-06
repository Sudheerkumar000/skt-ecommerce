import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import { useEffect, useMemo, useState } from "react"
import { Link, Route, Routes, useLocation } from "react-router-dom"
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

  const handleAddToCart = (product, options = {}) => {
    const finalPrice = Math.round(
      product.originalPrice * (1 - product.discountPercent / 100),
    )
    const size = options.size || "M"
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
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center" aria-label="SKT home">
              <img
                src="/skt-logo.png"
                alt="SKT"
                className="h-12 w-auto"
              />
            </Link>
            <button
              type="button"
              onClick={() => setShowLocation(true)}
              className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 md:flex"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4 text-slate-400"
              >
                <path
                  d="M12 22s7-4.4 7-11a7 7 0 1 0-14 0c0 6.6 7 11 7 11Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="11"
                  r="2.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              {locationValue || "Update location"}
            </button>
            {locationValue && (
              <span className="hidden text-xs text-slate-500 md:inline">
                Delivering to {locationValue}
              </span>
            )}
            <label className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600 shadow-sm focus-within:border-slate-300 md:flex">
              <span className="sr-only">Search products</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4 text-slate-400"
              >
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
                type="search"
                className="w-56 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none"
              />
            </label>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <NavigationMenu.Root>
                <NavigationMenu.List className="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-700">
                  <NavigationMenu.Item>
                    <NavigationMenu.Link asChild>
                      <Link
                        to="/"
                        className="rounded-lg px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
                      >
                        Home
                      </Link>
                    </NavigationMenu.Link>
                  </NavigationMenu.Item>
                  <NavigationMenu.Item>
                    <NavigationMenu.Link asChild>
                    <Link
                      to="/shop"
                      className="rounded-lg px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
                    >
                      Shop
                      </Link>
                    </NavigationMenu.Link>
                  </NavigationMenu.Item>
                  <NavigationMenu.Item>
                    <NavigationMenu.Link asChild>
                      <Link
                        to="/cart"
                        className="rounded-lg px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
                      >
                        Cart
                      </Link>
                    </NavigationMenu.Link>
                  </NavigationMenu.Item>
                  <NavigationMenu.Item>
                  <NavigationMenu.Link asChild>
                    <Link
                      to="/account"
                      className="rounded-lg px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
                    >
                      Account
                    </Link>
                    </NavigationMenu.Link>
                  </NavigationMenu.Item>
                </NavigationMenu.List>
              </NavigationMenu.Root>
            <div className="relative">
              <button
                onClick={() => setShowAuthMenu((prev) => !prev)}
                className="rounded-xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:from-slate-800 hover:via-slate-700 hover:to-slate-800 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
                aria-haspopup="true"
                aria-expanded={showAuthMenu}
              >
                Log in / Sign up
              </button>
              {showAuthMenu && (
                <div className="absolute right-0 mt-2 w-40 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                  <button
                    onClick={() => {
                      setActiveAuth("login")
                      setShowAuth(true)
                      setShowAuthMenu(false)
                    }}
                    className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => {
                      setActiveAuth("signup")
                      setShowAuth(true)
                      setShowAuthMenu(false)
                    }}
                    className="mt-1 w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                  >
                    Sign up
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

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

      {showAuth && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                {activeAuth === "login" ? "Welcome back" : "Create your account"}
              </h2>
              <button
                onClick={() => setShowAuth(false)}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500 hover:text-slate-700"
              >
                Close
              </button>
            </div>
            <div className="mt-4 flex rounded-full bg-slate-100 p-1 text-xs font-semibold text-slate-600">
              {["login", "signup"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveAuth(tab)}
                  className={`flex-1 rounded-full px-4 py-2 transition ${
                    activeAuth === tab
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
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
                  <label className="block text-xs font-semibold text-slate-600">
                    Full name
                    <input
                      type="text"
                      value={signupFullName}
                      onChange={(event) => setSignupFullName(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                    />
                    {signupErrors.fullName && (
                      <p className="mt-2 text-xs text-rose-500">
                        {signupErrors.fullName}
                      </p>
                    )}
                  </label>
                  <label className="block text-xs font-semibold text-slate-600">
                    Phone number
                    <input
                      type="tel"
                      value={signupPhone}
                      onChange={(event) => setSignupPhone(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                    />
                    {signupErrors.phone && (
                      <p className="mt-2 text-xs text-rose-500">
                        {signupErrors.phone}
                      </p>
                    )}
                  </label>
                  <label className="block text-xs font-semibold text-slate-600">
                    Email address
                    <input
                      type="email"
                      value={signupEmail}
                      onChange={(event) => setSignupEmail(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                    />
                    {signupErrors.email && (
                      <p className="mt-2 text-xs text-rose-500">
                        {signupErrors.email}
                      </p>
                    )}
                  </label>
                  <label className="block text-xs font-semibold text-slate-600">
                    Password
                    <input
                      type="password"
                      value={signupPassword}
                      onChange={(event) => setSignupPassword(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                    />
                    {signupErrors.password && (
                      <p className="mt-2 text-xs text-rose-500">
                        {signupErrors.password}
                      </p>
                    )}
                  </label>
                  <label className="block text-xs font-semibold text-slate-600">
                    Re-enter password
                    <input
                      type="password"
                      value={signupConfirmPassword}
                      onChange={(event) =>
                        setSignupConfirmPassword(event.target.value)
                      }
                      className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                    />
                    {signupErrors.confirmPassword && (
                      <p className="mt-2 text-xs text-rose-500">
                        {signupErrors.confirmPassword}
                      </p>
                    )}
                  </label>
                  <label className="block text-xs font-semibold text-slate-600">
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
                      className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400"
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
                  <label className="block text-xs font-semibold text-slate-600">
                    Email address
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(event) => setLoginEmail(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                    />
                  </label>
                  <label className="block text-xs font-semibold text-slate-600">
                    Password
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(event) => setLoginPassword(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                    />
                    <Link
                      to="/reset-password"
                      className="mt-2 inline-flex text-xs font-semibold text-slate-600 hover:text-slate-900"
                      onClick={() => setShowAuth(false)}
                    >
                      Forgot Password?
                    </Link>
                  </label>
                </>
              )}
              <button
                type="submit"
                className="w-full rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                {activeAuth === "login" ? "Log in" : "Create account"}
              </button>
              {activeAuth === "signup" ? (
                <p className="text-xs text-slate-500">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setActiveAuth("login")}
                    className="font-semibold text-slate-700 hover:text-slate-900"
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
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                Update your location
              </h2>
              <button
                onClick={() => setShowLocation(false)}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500 hover:text-slate-700"
              >
                Close
              </button>
            </div>
            <p className="mt-4 text-sm text-slate-600">
              To update your location, please select your country from the dropdown
              list. If you don't see any options, click "Refresh" or type the first
              few letters of your country name to search. Once you've selected your
              country, hit the "Save" button to update your location.
            </p>
            <div className="mt-5 grid gap-3">
              <label className="text-xs font-semibold text-slate-600">
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
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                />
              </label>
              {showCountryList && (
                <div className="max-h-52 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50 p-2">
                  {filteredCountries.length === 0 ? (
                    <p className="px-2 py-3 text-xs text-slate-500">
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
                              ? "bg-white text-slate-900 shadow-sm"
                              : "text-slate-600 hover:bg-white hover:text-slate-900"
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
                  className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
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
