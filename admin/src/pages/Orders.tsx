import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { apiOrder } from '../api/axios'

type OrderStatus = 'PENDING' | 'PROCESSING' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED'

type OrderItem = {
  id?: string
  _id?: string
  name?: string
  quantity?: number
  price?: number
  image?: string
}

type Order = {
  id: string
  amount: number
  address: Record<string, unknown> | string
  items: OrderItem[] | Record<string, number>
  status: OrderStatus
  payment: boolean
  date: string
  user: { name: string; email: string }
}

const statuses: OrderStatus[] = ['PENDING', 'PROCESSING', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED']

const statusStyles: Record<OrderStatus, string> = {
  PENDING: 'bg-amber-50 text-amber-700 ring-amber-200',
  PROCESSING: 'bg-blue-50 text-blue-700 ring-blue-200',
  OUT_FOR_DELIVERY: 'bg-violet-50 text-violet-700 ring-violet-200',
  DELIVERED: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  CANCELLED: 'bg-red-50 text-red-700 ring-red-200',
}

const formatStatus = (status: OrderStatus) => status.replaceAll('_', ' ')

const getAddress = (address: Order['address']) => {
  if (typeof address === 'string') {
    try {
      return JSON.parse(address) as Record<string, unknown>
    } catch {
      return { address }
    }
  }
  return address
}

const getItems = (items: Order['items']): OrderItem[] => {
  if (Array.isArray(items)) return items
  return Object.entries(items ?? {}).map(([id, quantity]) => ({ id, quantity }))
}

function Orders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const fetchOrders = useCallback(async () => {
    setLoading(true)
    setLoadError(null)
    try {
      const response = await apiOrder.get('/list')
      if (!response.data.success) throw new Error(response.data.message || 'Could not load orders')
      setOrders(response.data.data as Order[])
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Could not load orders. Check your connection and try again.'
      setLoadError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void Promise.resolve().then(fetchOrders)
  }, [fetchOrders])

  const summary = useMemo(() => ({
    total: orders.length,
    pending: orders.filter((order) => order.status === 'PENDING').length,
    active: orders.filter((order) => ['PROCESSING', 'OUT_FOR_DELIVERY'].includes(order.status)).length,
    delivered: orders.filter((order) => order.status === 'DELIVERED').length,
  }), [orders])

  const changeStatus = async (orderId: string, status: OrderStatus) => {
    setUpdatingId(orderId)
    try {
      const response = await apiOrder.patch('/status', { orderId, status })
      if (!response.data.success) throw new Error(response.data.message || 'Could not update order')
      setOrders((current) => current.map((order) => order.id === orderId ? { ...order, status } : order))
      toast.success('Order status updated')
    } catch (error) {
      const message = (error as { response?: { data?: { message?: string } } }).response?.data?.message
        || (error instanceof Error ? error.message : 'Could not update order status')
      toast.error(message)
    } finally {
      setUpdatingId(null)
    }
  }

  const renderOrder = (order: Order) => {
    const address = getAddress(order.address)
    const items = getItems(order.items)
    const addressLine = Object.values(address).filter((value) => typeof value === 'string' && value.trim()).join(', ')
    const itemSummary = items.map((item) => `${item.quantity ?? 1} × ${item.name || item.id || item._id || 'Item'}`).join(', ')

    return (
      <article key={order.id} className="grid gap-5 border-b border-slate-100 p-5 last:border-0 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-semibold text-slate-900">Order #{order.id.slice(-8).toUpperCase()}</h2>
            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyles[order.status]}`}>{formatStatus(order.status)}</span>
            <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${order.payment ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>{order.payment ? 'Paid' : 'Payment pending'}</span>
          </div>
          <p className="mt-2 text-sm font-medium text-slate-700">{order.user?.name || 'Customer'} <span className="font-normal text-slate-500">· {order.user?.email || 'No email'}</span></p>
          <p className="mt-1 wrap-break-word text-sm text-slate-600">{itemSummary || 'No item details'}</p>
          <p className="mt-1 text-sm text-slate-500">Deliver to: {addressLine || 'Address unavailable'}</p>
          <p className="mt-1 text-xs text-slate-400">{new Date(order.date).toLocaleString()}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 lg:justify-end">
          <p className="mr-1 whitespace-nowrap text-lg font-bold text-slate-900">{Number(order.amount).toFixed(2)} ETB</p>
          <label className="sr-only" htmlFor={`status-${order.id}`}>Update status for order {order.id}</label>
          <select
            id={`status-${order.id}`}
            value={order.status}
            disabled={updatingId === order.id}
            onChange={(event) => void changeStatus(order.id, event.target.value as OrderStatus)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100 disabled:opacity-60"
          >
            {statuses.map((status) => <option key={status} value={status}>{formatStatus(status)}</option>)}
          </select>
        </div>
      </article>
    )
  }

  return (
    <div className="mx-auto flex h-[calc(100dvh-4.5rem)] w-full max-w-7xl flex-col overflow-hidden px-4 py-5 sm:px-6 sm:py-7 lg:px-10">
      <div className="mb-5 flex shrink-0 flex-col gap-3 sm:mb-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-orange-500">ORDER MANAGEMENT</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Orders</h1>
          <p className="mt-2 text-sm text-slate-500">Review customer orders, payment, delivery details, and update fulfillment status.</p>
        </div>
        <button type="button" onClick={() => void fetchOrders()} disabled={loading} className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-60">
          <span className={loading ? 'animate-spin' : ''} aria-hidden="true">↻</span>{loading ? 'Refreshing' : 'Refresh'}
        </button>
      </div>

      <div className="mb-5 grid shrink-0 grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          ['Total orders', summary.total], ['Awaiting action', summary.pending], ['In fulfillment', summary.active], ['Delivered', summary.delivered],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">{label}</p><p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
          </div>
        ))}
      </div>

      <section className="min-h-0 flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <div className="flex h-full min-h-64 items-center justify-center"><div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-orange-500" /></div>
        ) : loadError ? (
          <div className="flex h-full min-h-64 flex-col items-center justify-center px-6 text-center">
            <h2 className="text-lg font-semibold text-slate-800">Couldn’t load orders</h2><p className="mt-2 max-w-md text-sm text-slate-500">{loadError}</p>
            <button type="button" onClick={() => void fetchOrders()} className="mt-5 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600">Try again</button>
          </div>
        ) : orders.length === 0 ? (
          <div className="flex h-full min-h-64 flex-col items-center justify-center px-6 text-center">
            <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-orange-50 text-2xl text-orange-500">🧾</div>
            <h2 className="text-lg font-semibold text-slate-800">No orders yet</h2><p className="mt-2 text-sm text-slate-500">Customer orders will appear here when they are placed.</p>
          </div>
        ) : <div className="h-full overflow-auto">{orders.map(renderOrder)}</div>}
      </section>
    </div>
  )
}

export default Orders