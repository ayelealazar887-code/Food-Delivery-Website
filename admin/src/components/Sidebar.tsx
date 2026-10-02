import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

type SidebarProps = {
  isOpen: boolean
  onClose: () => void
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors md:gap-4 md:px-4 ${
      isActive
        ? 'bg-orange-50 text-orange-600 shadow-sm ring-1 ring-orange-100'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-[1px] md:hidden"
        />
      )}
      <aside
        id="admin-sidebar"
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white px-5 py-6 shadow-xl transition-transform duration-300 md:w-64 md:translate-x-0 md:shadow-sm ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        aria-label="Admin navigation"
      >
      <div className="mb-9 flex h-10 items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Admin <span className="text-orange-500">portal</span>
        </h2>
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={onClose}
          className="grid h-9 w-9 place-items-center rounded-lg text-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 md:hidden"
        >
          ×
        </button>
      </div>

      <p className="mb-3 hidden px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400 md:block">Workspace</p>
      <nav className="flex flex-col gap-2">
        <NavLink to="/add" aria-label="Add items" title="Add items" onClick={onClose} className={navLinkClass}>
          <img
            src={assets.add_icon}
            alt="Add Items"
            className="h-5 w-5 shrink-0 opacity-80 group-hover:opacity-100"
          />
          <span>Add items</span>
        </NavLink>

        <NavLink to="/list" aria-label="List items" title="List items" onClick={onClose} className={navLinkClass}>
          <img
            src={assets.order_icon}
            alt="List Items"
            className="h-5 w-5 shrink-0 opacity-80 group-hover:opacity-100"
          />
          <span>Food items</span>
        </NavLink>

        <NavLink to="/orders" aria-label="Orders" title="Orders" onClick={onClose} className={navLinkClass}>
          <img
            src={assets.order_icon}
            alt="Orders"
            className="h-5 w-5 shrink-0 opacity-80 group-hover:opacity-100"
          />
          <span>Orders</span>
        </NavLink>
      </nav>
      <div className="mt-auto hidden rounded-2xl bg-orange-50 p-4 md:block">
        <p className="text-sm font-semibold text-slate-800">Fresh food, made easy</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">Manage your menu and keep orders moving.</p>
      </div>
      </aside>
    </>
  )
}

export default Sidebar