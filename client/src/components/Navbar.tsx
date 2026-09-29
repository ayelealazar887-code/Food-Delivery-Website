import React from 'react'
import { assets } from '../assets/assets'

function Navbar() {
  return (
    <div>
        <img src={assets.logo} alt='' className='' />
        <ul className=''>
            <li>home</li>
            <li>menu</li>
            <li>mobile-app</li>
            <li>contact us</li>
        </ul>
        <div>
            <img src={assets.search_icon} alt='' className='' />
            <div>
                <img src={assets.basket_icon} alt="" className=''/>
                <div className=''></div>
            </div>
            <button className=''>sign in</button>
        </div>
    </div>
  )
}

export default Navbar