import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const ResetPasswordPage = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState("request")
  const [email, setEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (step === "done") {
      const timer = setTimeout(() => {
        navigate("/?auth=login")
      }, 2000)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [step, navigate])

  const validateEmail = () => {
    const nextErrors = {}
    if (!email.trim()) {
      nextErrors.email = "Please enter your email address."
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
      nextErrors.email = "Enter a valid email address."
    }
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const validateReset = () => {
    const nextErrors = {}
    if (!newPassword.trim()) {
      nextErrors.newPassword = "Please enter a new password."
    } else if (newPassword.trim().length < 8) {
      nextErrors.newPassword = "Password must be at least 8 characters."
    }
    if (!confirmPassword.trim()) {
      nextErrors.confirmPassword = "Please re-enter your password."
    } else if (confirmPassword !== newPassword) {
      nextErrors.confirmPassword = "Passwords do not match."
    }
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  return (
    <section className="mx-auto max-w-lg space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
          Password recovery
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Reset your password
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          We will send a secure, time-limited reset link to your registered email
          address.
        </p>
      </div>

      {step === "request" && (
        <form
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          onSubmit={(event) => {
            event.preventDefault()
            const isValid = validateEmail()
            if (isValid) {
              setMessage(
                "If an account exists for this email, a reset link has been sent.",
              )
              setStep("reset")
            }
          }}
        >
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
            Email address
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-slate-700"
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email && (
              <p className="mt-2 text-xs text-rose-500">{errors.email}</p>
            )}
          </label>
          <button className="mt-4 w-full rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white">
            Send reset link
          </button>
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Reset links are encrypted and expire after a short period for
            security.
          </p>
          {message && (
            <p className="mt-3 text-xs font-semibold text-emerald-600">
              {message}
            </p>
          )}
        </form>
      )}

      {step === "reset" && (
        <form
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          onSubmit={(event) => {
            event.preventDefault()
            const isValid = validateReset()
            if (isValid) {
              setMessage("Your password has been updated.")
              setStep("done")
            }
          }}
        >
          <p className="text-sm text-slate-600 dark:text-slate-300">{message}</p>
          <div className="mt-4 space-y-3">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              New password
              <input
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-slate-700"
                aria-invalid={Boolean(errors.newPassword)}
              />
              {errors.newPassword && (
                <p className="mt-2 text-xs text-rose-500">
                  {errors.newPassword}
                </p>
              )}
            </label>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              Re-enter new password
              <input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-slate-700"
                aria-invalid={Boolean(errors.confirmPassword)}
              />
              {errors.confirmPassword && (
                <p className="mt-2 text-xs text-rose-500">
                  {errors.confirmPassword}
                </p>
              )}
            </label>
          </div>
          <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
            <p className="font-semibold text-slate-700 dark:text-slate-200">Password guidelines</p>
            <ul className="mt-2 space-y-1">
              <li>Minimum 8 characters</li>
              <li>Use a mix of letters, numbers, and symbols</li>
              <li>Avoid reusing old passwords</li>
            </ul>
          </div>
          <button className="mt-4 w-full rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white">
            Update password
          </button>
        </form>
      )}

      {step === "done" && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm font-semibold text-emerald-600">
            {message}
          </p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Your password has been updated successfully. You can now sign in.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate("/?auth=login")}
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
            >
              Go to login
            </button>
            <Link
              to="/"
              className="text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              Back to home
            </Link>
          </div>
        </div>
      )}
    </section>
  )
}

export default ResetPasswordPage
