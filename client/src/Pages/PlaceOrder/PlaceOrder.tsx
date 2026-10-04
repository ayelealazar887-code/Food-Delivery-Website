import React, { useContext, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { apiOrder } from '../../api/axios'

function PlaceOrder() {
  const context = useContext(StoreContext)

  if (!context) {
    throw new Error('PlaceOrder must be used inside StoreContextProvider')
  }

  const {
    getTotalCartAmount,
    cartItems,
    token,
  } = context

  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  })

  const subtotal = getTotalCartAmount()
  const deliveryFee = subtotal === 0 ? 0 : 2
  const total = subtotal + deliveryFee

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    if (!token) {
      alert('Please login first')
      return
    }

    if (subtotal === 0) {
      alert('Your cart is empty')
      return
    }

    if (isLoading) {
      return
    }

    setIsLoading(true)

    try {
      const response = await apiOrder.post(
        '/create',
        {
          items: cartItems,
          amount: total,
          address: formData,
        },
        {
          headers: {
            token,
          },
        }
      )

      if (response.data.success) {
        window.location.href = response.data.checkoutUrl
        return
      }

      setIsLoading(false)

      alert(
        response.data.message ||
          'Unable to initialize payment'
      )
    } catch (error: any) {
      console.error(
        'PAYMENT ERROR:',
        error.response?.data || error
      )

      setIsLoading(false)

      alert(
        error.response?.data?.message ||
          'Unable to initialize payment'
      )
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <p className="text-2xl font-semibold text-gray-800 mb-6">
            Delivery Information
          </p>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
              />

              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
            />

            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              placeholder="Street Address"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
              />

              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="Zip Code"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
              />

              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
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
              <p>{subtotal} ETB</p>
            </div>

            <hr className="border-gray-200" />

            <div className="flex justify-between">
              <p>Delivery Fee</p>
              <p>{deliveryFee} ETB</p>
            </div>

            <hr className="border-gray-200" />

            <div className="flex justify-between text-lg">
              <b>Total</b>
              <b>{total} ETB</b>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`mt-8 flex w-full items-center justify-center gap-3 rounded-lg px-6 py-3 font-semibold text-white transition ${
              isLoading
                ? 'cursor-not-allowed bg-orange-400'
                : 'bg-orange-500 hover:bg-orange-600'
            }`}
          >
            {isLoading ? (
              <>
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Processing...
              </>
            ) : (
              'PROCEED TO PAYMENT'
            )}
          </button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder