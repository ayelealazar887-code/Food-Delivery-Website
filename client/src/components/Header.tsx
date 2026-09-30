import React from 'react'

function Header() {
  return (
    <section className="px-4 sm:px-6 lg:px-10">
      <div
        className="relative mx-auto mt-6 min-h-[550px] max-w-7xl overflow-hidden
                   rounded-2xl bg-cover bg-center"
        style={{ backgroundImage: "url('/header_img.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

        <div className="relative z-10 flex min-h-[550px] items-end">
          <div className="max-w-2xl px-7 pb-12 text-left sm:px-12 sm:pb-16 lg:px-16 lg:pb-20">

            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Order your
              <span className="block text-orange-500">
                favourite food
              </span>
              here
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-gray-200 sm:text-lg">
              Discover delicious meals from your favourite restaurants,
              freshly prepared and delivered straight to your door.
            </p>

            <button
              className="mt-8 rounded-full bg-orange-500 px-8 py-3.5
                         font-semibold text-white shadow-lg
                         transition-all duration-300
                         hover:-translate-y-0.5 hover:bg-orange-600
                         hover:shadow-xl"
            >
              View Menu
            </button>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Header