import { useState } from "react"
import { Link } from "react-router-dom"

const AccountPage = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [profileErrors, setProfileErrors] = useState({})
  const [profileSaved, setProfileSaved] = useState(false)
  const [wishlistItems, setWishlistItems] = useState([
    "SKT Air Knit Hoodie",
    "SKT Utility Jacket",
    "SKT Core Tee",
  ])
  const [wishlistMessage, setWishlistMessage] = useState("")

  const validateProfile = () => {
    const errors = {}
    if (!profile.name.trim()) {
      errors.name = "Please enter your name."
    }
    if (!profile.email.trim()) {
      errors.email = "Please enter your email."
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(profile.email.trim())) {
      errors.email = "Enter a valid email address."
    }
    if (!profile.password.trim()) {
      errors.password = "Please enter a password."
    } else if (profile.password.trim().length < 8) {
      errors.password = "Password must be at least 8 characters."
    }
    setProfileErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleProfileSave = (event) => {
    event.preventDefault()
    const isValid = validateProfile()
    if (isValid) {
      setProfileSaved(true)
      setTimeout(() => setProfileSaved(false), 2000)
    }
  }

  const handleMoveToCart = (item) => {
    setWishlistItems((prev) => prev.filter((entry) => entry !== item))
    setWishlistMessage(`Moved "${item}" to cart.`)
    setTimeout(() => setWishlistMessage(""), 2000)
  }

  return (
    <section className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
          Account
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-slate-900">
          Manage your SKT experience
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Update your personal details, track orders, and fine-tune your
          preferences.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Profile</h2>
          <p className="mt-2 text-sm text-slate-600">
            View and edit your name, email, and password.
          </p>
          <form className="mt-4 grid gap-3" onSubmit={handleProfileSave}>
            <label className="text-xs font-semibold text-slate-600">
              Full name
              <input
                type="text"
                value={profile.name}
                onChange={(event) =>
                  setProfile((prev) => ({ ...prev, name: event.target.value }))
                }
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                aria-invalid={Boolean(profileErrors.name)}
              />
              {profileErrors.name && (
                <p className="mt-2 text-xs text-rose-500">{profileErrors.name}</p>
              )}
            </label>
            <label className="text-xs font-semibold text-slate-600">
              Email
              <input
                type="email"
                value={profile.email}
                onChange={(event) =>
                  setProfile((prev) => ({ ...prev, email: event.target.value }))
                }
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                aria-invalid={Boolean(profileErrors.email)}
              />
              {profileErrors.email && (
                <p className="mt-2 text-xs text-rose-500">{profileErrors.email}</p>
              )}
            </label>
            <label className="text-xs font-semibold text-slate-600">
              Password
              <input
                type="password"
                value={profile.password}
                onChange={(event) =>
                  setProfile((prev) => ({ ...prev, password: event.target.value }))
                }
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                aria-invalid={Boolean(profileErrors.password)}
              />
              {profileErrors.password && (
                <p className="mt-2 text-xs text-rose-500">
                  {profileErrors.password}
                </p>
              )}
              <Link
                to="/reset-password"
                className="mt-2 inline-flex text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Forgot Password?
              </Link>
            </label>
            <button className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 active:scale-[0.98]">
              Save changes
            </button>
            {profileSaved && (
              <p
                className="text-xs font-semibold text-emerald-600 transition"
                role="status"
                aria-live="polite"
              >
                Profile updated successfully.
              </p>
            )}
          </form>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Order history</h2>
          <p className="mt-2 text-sm text-slate-600">
            Review past purchases, track shipments, and start returns.
          </p>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
              <p className="font-semibold text-slate-900">Order #SKT-1048</p>
              <p>In transit · Estimated delivery Feb 12</p>
              <button className="mt-2 text-xs font-semibold text-slate-700 hover:text-slate-900">
                View tracking
              </button>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
              <p className="font-semibold text-slate-900">Order #SKT-0972</p>
              <p>Delivered · Jan 24</p>
              <button className="mt-2 text-xs font-semibold text-slate-700 hover:text-slate-900">
                Manage return
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Wishlist</h2>
          <p className="mt-2 text-sm text-slate-600">
            Save favorite items for quick access later.
          </p>
          <div className="mt-4 grid gap-3">
            {wishlistItems.length === 0 ? (
              <p className="text-sm text-slate-500">Your wishlist is empty.</p>
            ) : (
              wishlistItems.map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm transition hover:border-slate-200"
                >
                  <span className="font-semibold text-slate-900">{item}</span>
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="rounded-full border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900 active:scale-[0.98]"
                  >
                    Move to cart
                  </button>
                </div>
              ))
            )}
          </div>
          {wishlistMessage && (
            <p
              className="mt-3 text-xs font-semibold text-emerald-600"
              role="status"
              aria-live="polite"
            >
              {wishlistMessage}
            </p>
          )}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Addresses</h2>
          <p className="mt-2 text-sm text-slate-600">
            Manage shipping and billing addresses.
          </p>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
              <p className="font-semibold text-slate-900">Primary address</p>
              <p>123 Market St, San Francisco, CA</p>
              <button className="mt-2 text-xs font-semibold text-slate-700 hover:text-slate-900">
                Edit address
              </button>
            </div>
            <button className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900">
              Add new address
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Payment methods</h2>
          <p className="mt-2 text-sm text-slate-600">
            Add, remove, or update your cards securely.
          </p>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
              <div>
                <p className="font-semibold text-slate-900">Visa ending 4242</p>
                <p>Expires 09/27</p>
              </div>
              <button className="text-xs font-semibold text-slate-600 hover:text-slate-900">
                Update
              </button>
            </div>
            <button className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900">
              Add new payment method
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Settings</h2>
          <p className="mt-2 text-sm text-slate-600">
            Control notifications, privacy, and account preferences.
          </p>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <label className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
              <span>Email notifications</span>
              <input type="checkbox" className="h-4 w-4" />
            </label>
            <label className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
              <span>SMS updates</span>
              <input type="checkbox" className="h-4 w-4" />
            </label>
            <button className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900">
              Manage privacy
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AccountPage
