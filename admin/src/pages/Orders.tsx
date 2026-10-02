function Orders() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
      <div className="mb-7">
        <p className="text-sm font-semibold text-orange-500">ORDER MANAGEMENT</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Orders</h1>
        <p className="mt-2 text-sm text-slate-500">Track incoming orders and keep every delivery on schedule.</p>
      </div>
      <section className="rounded-2xl border border-slate-200 bg-white px-6 py-20 text-center shadow-sm">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-orange-50 text-2xl text-orange-500">🧾</div>
        <h2 className="text-lg font-semibold text-slate-800">Your orders will show up here</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">When customers place orders, you’ll be able to review their details and manage order status from this page.</p>
      </section>
    </div>
  )
}

export default Orders