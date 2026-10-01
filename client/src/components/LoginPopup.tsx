import React, { useState } from 'react'
import { assets } from '../assets/assets'

function LoginPopup({
  setShowLogin,
}: {
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [currentState, setCurrentState] = useState('Sign Up')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <form className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {currentState}
          </h2>

          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
            className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform duration-200"
          />
        </div>

        <div className="flex flex-col gap-4">
          {currentState === 'Login' ? null : (
            <input
              type="text"
              placeholder="Your name"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
          )}

          <input
            type="email"
            placeholder="Your email"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-6 rounded-lg bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 active:scale-[0.98]"
        >
          {currentState === 'Sign Up' ? 'Create account' : 'Login'}
        </button>

        <div className="flex items-start gap-2 mt-5">
          <input
            type="checkbox"
            required
            className="mt-1 accent-orange-500"
          />

          <p className="text-xs leading-5 text-gray-500">
            By continuing, I agree to the terms of use & privacy policy.
          </p>
        </div>

        {currentState === 'Login' ? (
          <p className="mt-5 text-sm text-gray-500">
            Create a new account?{' '}
            <span
              onClick={() => setCurrentState('Sign Up')}
              className="cursor-pointer font-semibold text-orange-500 hover:text-orange-600"
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="mt-5 text-sm text-gray-500">
            Already have an account?{' '}
            <span
              onClick={() => setCurrentState('Login')}
              className="cursor-pointer font-semibold text-orange-500 hover:text-orange-600"
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  )
}

export default LoginPopup