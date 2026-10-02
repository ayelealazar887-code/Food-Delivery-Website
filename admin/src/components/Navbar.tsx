import React from 'react'
import { assets } from '../assets/assets'

function Navbar() {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      <img
        src={assets.logo}
        alt="Logo"
        className="w-32 h-auto"
      />

      <img
        src={assets.profile_image}
        alt="Profile"
        className="w-10 h-10 rounded-full object-cover cursor-pointer"
      />
    </div>
  )
}

export default Navbar