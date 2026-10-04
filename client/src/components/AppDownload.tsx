import { assets } from '../assets/assets'

function AppDownload() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <p className="text-2xl sm:text-3xl font-semibold text-gray-800 leading-relaxed">
          For Better Experience Download
          <br />
          Alec App
        </p>

        <div className="flex items-center justify-center gap-4 mt-6">
          <img
            src={assets.play_store}
            alt="Google Play"
            className="w-40 sm:w-44 cursor-pointer hover:scale-105 transition-transform duration-200"
          />

          <img
            src={assets.app_store}
            alt="App Store"
            className="w-40 sm:w-44 cursor-pointer hover:scale-105 transition-transform duration-200"
          />
        </div>
      </div>
    </div>
  )
}

export default AppDownload