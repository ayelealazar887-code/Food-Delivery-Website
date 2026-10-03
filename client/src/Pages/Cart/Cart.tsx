import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

function Cart() {
  const context = useContext(StoreContext)
  const navigate = useNavigate()

  if (!context) {
    throw new Error('Cart must be used inside StoreContextProvider')
  }

  const {
    cartItems,
    food_list,
    removeFromCart,
    getTotalCartAmount,
  } = context

  const subtotal = getTotalCartAmount()
  const deliveryFee = subtotal === 0 ? 0 : 2
  const total = subtotal + deliveryFee

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full">

        <div className="grid grid-cols-[80px_2fr_1fr_1fr_1fr_60px] items-center gap-4 text-sm font-semibold text-gray-600">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        <hr className="my-5 border-gray-200" />

        <div className="space-y-4">
          {food_list.map((item) => {
            if (cartItems[item.id] > 0) {
              return (
                <div
                  key={item.id}
                  className="grid grid-cols-[80px_2fr_1fr_1fr_1fr_60px] items-center gap-4 border-b border-gray-100 pb-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />

                  <p className="font-medium text-gray-800">
                    {item.name}
                  </p>

                  <p className="text-gray-600">
                    ${item.price}
                  </p>

                  <p className="text-gray-600">
                    {cartItems[item.id]}
                  </p>

                  <p className="font-semibold text-gray-800">
                    ${item.price * cartItems[item.id]}
                  </p>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 font-semibold hover:text-red-700 transition-colors"
                  >
                    x
                  </button>
                </div>
              )
            }

            return null
          })}
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12">

          <div className="max-w-md">
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
              onClick={() => navigate('/order')}
              className="mt-8 w-full rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>

          <div className="flex items-start">
            <div className="w-full max-w-md">
              <p className="mb-4 text-sm text-gray-500">
                If you have a promo code, enter it here
              </p>

              <div className="flex">
                <input
                  type="text"
                  placeholder="Promo code"
                  className="flex-1 rounded-l-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-orange-500"
                />

                <button
                  className="rounded-r-lg bg-gray-800 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-700"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Cart