import { assets } from '../assets/assets'

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <img
              src={assets.logo}
              alt="Ale Food"
              className="w-32 mb-5"
            />

            <p className="text-gray-400 text-sm leading-7 max-w-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Iste nemo, et odio ab error fugit nobis consectetur.
              Nostrum eligendi, excepturi deserunt temporibus autem nisi
              impedit nihil maiores possimus.
            </p>

            <div className="flex items-center gap-4 mt-6">
              <img
                src={assets.facebook_icon}
                alt="Facebook"
                className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform duration-200"
              />

              <img
                src={assets.twitter_icon}
                alt="Twitter"
                className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform duration-200"
              />

              <img
                src={assets.linkedin_icon}
                alt="LinkedIn"
                className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform duration-200"
              />
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-5">
              COMPANY
            </h2>

            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="hover:text-orange-500 cursor-pointer transition-colors duration-200">
                Home
              </li>
              <li className="hover:text-orange-500 cursor-pointer transition-colors duration-200">
                About
              </li>
              <li className="hover:text-orange-500 cursor-pointer transition-colors duration-200">
                Delivery
              </li>
              <li className="hover:text-orange-500 cursor-pointer transition-colors duration-200">
                Privacy policy
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-5">
              GET IN TOUCH
            </h2>

            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="hover:text-orange-500 transition-colors duration-200">
                +251-91-232-2
              </li>
              <li className="hover:text-orange-500 transition-colors duration-200">
                contact@alefood.com
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        <p className="text-center text-gray-500 text-sm">
          Copyright 2026 @ alecfood.com - All Right Reserved
        </p>
      </div>
    </footer>
  )
}

export default Footer