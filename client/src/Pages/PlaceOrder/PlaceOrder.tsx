import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'

function PlaceOrder() {
  const context = useContext(StoreContext)

  if (!context) {
    throw new Error('PlaceOrder must be used inside StoreContextProvider')
  }

  const { getTotalCartAmount } = context

  const subtotal = getTotalCartAmount()
  const deliveryFee = subtotal === 0 ? 0 : 2
  const total = subtotal + deliveryFee

  return (
    <form className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <p className="text-2xl font-semibold text-gray-800 mb-6">
            Delivery Information
          </p>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
              />

              <input
                type="text"
                placeholder="Last Name"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>

            <input
              type="email"
              placeholder="Email Address"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
            />

            <input
              type="text"
              placeholder="Street Address"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="City"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
              />

              <input
                type="text"
                placeholder="State"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Zip Code"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
              />

              <input
                type="text"
                placeholder="Country"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>

            <input
              type="text"
              placeholder="Phone Number"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>
        </div>

        <div className="max-w-md lg:ml-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Cart Totals
          </h2>

          <div className="space-y-4 text-gray-600">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>${subtotal}</p>
            </div>

            <hr className="border-gray-200" />

            <div className="flex justify-between">
              <p>Delivery Fee</p>
              <p>${deliveryFee}</p>
            </div>

            <hr className="border-gray-200" />

            <div className="flex justify-between text-lg">
              <b>Total</b>
              <b>${total}</b>
            </div>
          </div>

          <button
            type="submit"
            className="mt-8 w-full rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder