import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

function Sidebar() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer transition ${
      isActive
        ? 'bg-orange-100 text-orange-500 border-r-4 border-orange-500'
        : 'text-gray-700 hover:bg-gray-100'
    }`

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 px-5 py-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">
        Admin portal
      </h2>

      <div className="flex flex-col gap-3">
        <NavLink to="/add" className={navLinkClass}>
          <img
            src={assets.add_icon}
            alt="Add Items"
            className="w-6 h-6"
          />
          <p className="font-medium">Add Items</p>
        </NavLink>

        <NavLink to="/list" className={navLinkClass}>
          <img
            src={assets.order_icon}
            alt="List Items"
            className="w-6 h-6"
          />
          <p className="font-medium">List Items</p>
        </NavLink>

        <NavLink to="/orders" className={navLinkClass}>
          <img
            src={assets.order_icon}
            alt="Orders"
            className="w-6 h-6"
          />
          <p className="font-medium">Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar