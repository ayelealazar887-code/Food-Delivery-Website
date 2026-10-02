import { assets } from '../assets/assets'

type NavbarProps = {
  isMenuOpen: boolean
  onMenuClick: () => void
}

function Navbar({ isMenuOpen, onMenuClick }: NavbarProps) {
  return (
    <header className="flex min-h-18 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-7 lg:px-10">
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Open navigation menu"
          aria-controls="admin-sidebar"
          aria-expanded={isMenuOpen}
          onClick={onMenuClick}
          className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 md:hidden"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5 stroke-current" strokeWidth="2" strokeLinecap="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <img
          src={assets.logo}
          alt="Logo"
          className="h-auto w-28 sm:w-32"
        />
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden text-right sm:block">
          <span className="block text-sm font-semibold text-slate-800">Admin</span>
          <span className="block text-xs text-slate-500">Workspace</span>
        </span>
        <img
          src={assets.profile_image}
          alt="Admin profile"
          className="h-10 w-10 cursor-pointer rounded-full border-2 border-white object-cover shadow-sm ring-1 ring-slate-200"
        />
      </div>
    </header>
  )
}

export default Navbar