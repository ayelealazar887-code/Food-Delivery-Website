import React, { useState } from 'react'
import { assets } from '../assets/assets'

type FoodItemProps = {
  id: string
  name: string
  price: number
  description: string
  image: string
}

function FoodItem({
  id,
  name,
  price,
  description,
  image,
}: FoodItemProps) {
    
  const [itemCount, setItemCount] = useState<number>(0)

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="relative w-full h-52 overflow-hidden">
        <img
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          src={image}
          alt={name}
        />

        {!itemCount ? (
          <img
            onClick={() => setItemCount((prev) => prev + 1)}
            src={assets.add_icon_white}
            alt="Add"
            className="absolute bottom-3 right-3 w-9 h-9 cursor-pointer hover:scale-110 transition-transform duration-200"
          />
        ) : (
          <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-white rounded-full px-2 py-1 shadow-md">
            <img
              onClick={() => setItemCount((prev) => prev - 1)}
              src={assets.remove_icon_red}
              alt="Remove"
              className="w-7 h-7 cursor-pointer hover:scale-110 transition-transform duration-200"
            />

            <p className="min-w-5 text-center font-semibold text-gray-800">
              {itemCount}
            </p>

            <img
              onClick={() => setItemCount((prev) => prev + 1)}
              src={assets.add_icon_green}
              alt="Add"
              className="w-7 h-7 cursor-pointer hover:scale-110 transition-transform duration-200"
            />
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-gray-800">
            {name}
          </p>

          <img
            className="w-20"
            src={assets.rating_starts}
            alt="Rating"
          />
        </div>

        <p className="mt-2 text-sm text-gray-500 line-clamp-2">
          {description}
        </p>

        <p className="mt-3 text-xl font-bold text-orange-500">
          ${price}
        </p>
      </div>
    </div>
  )
}

export default FoodItem