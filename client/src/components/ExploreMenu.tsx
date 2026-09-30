import React from 'react'
import { menu_list } from '../assets/assets'

function ExploreMenu({
  category,
  setCategory,
}: {
  category: string
  setCategory: React.Dispatch<React.SetStateAction<string>>
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Explore our menu
        </h1>

        <p className="text-gray-500 text-sm sm:text-base leading-7">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
          corrupti eligendi ullam culpa ipsam incidunt laboriosam ex obcaecati,
          a deleniti veniam iste quas, tenetur inventore veritatis nisi sed
          reprehenderit ut molestias nostrum ratione exercitationem officia?
          Laboriosam doloremque temporibus dolore consequatur!
        </p>
      </div>

      <div className="mt-10 flex gap-6 overflow-x-auto pb-4 justify-center">
        {menu_list.map((item, index) => {
          return (
            <div
              key={index}
              className="flex-shrink-0 flex flex-col items-center cursor-pointer group"
            >
              <div
                onClick={() =>
                  setCategory((prev) =>
                    prev === item.menu_name ? 'All' : item.menu_name
                  )
                }
                className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                  category === item.menu_name
                    ? 'border-orange-500'
                    : 'border-transparent group-hover:border-orange-500'
                }`}
              >
                <img
                  src={item.menu_image}
                  alt={item.menu_name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <p
                className={`mt-3 text-sm sm:text-base font-medium transition-colors duration-300 ${
                  category === item.menu_name
                    ? 'text-orange-500'
                    : 'text-gray-700 group-hover:text-orange-500'
                }`}
              >
                {item.menu_name}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ExploreMenu