import { useEffect, useState } from 'react'
import api from '../api/axios'
import { toast } from 'react-toastify'

type Food = {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

function List() {
  const [list, setList] = useState<Food[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [removingId, setRemovingId] = useState<string | null>(null)

  const fetchList = async () => {
    setLoading(true)
    setLoadError(null)

    try {
      const response = await api.get('/list')

      if (response.data.success) {
        setList(response.data.data)
      } else {
        const message = response.data.message || 'Error fetching food'
        setLoadError(message)
        toast.error(message)
      }
    } catch (error) {
      console.error(error)
      setLoadError('We couldn’t load food items from the database. Check your connection and try again.')
      toast.error('Failed to fetch food')
    } finally {
      setLoading(false)
    }
  }

  const removeFood = async (id: string) => {
    try {
      setRemovingId(id)

      const response = await api.delete('/remove', {
        data: { id },
      })

      if (response.data.success) {
        toast.success(response.data.message)
        setList((prev) => prev.filter((item) => item.id !== id))
      } else {
        toast.error(response.data.message || 'Failed to remove food')
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to remove food')
    } finally {
      setRemovingId(null)
    }
  }

  useEffect(() => {
    void Promise.resolve().then(fetchList)
  }, [])

  return (
    <div className="mx-auto flex h-[calc(100dvh-4.5rem)] w-full max-w-7xl flex-col overflow-hidden px-4 py-5 sm:px-6 sm:py-7 lg:px-10">
      <div className="mb-5 flex shrink-0 flex-col gap-2 sm:mb-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-orange-500">MENU MANAGEMENT</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Food items</h1>
          <p className="mt-2 text-sm text-slate-500">View and manage the dishes currently on your menu.</p>
        </div>
        <div className="flex w-fit items-center gap-3">
          <span className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-slate-600 ring-1 ring-slate-200">
            {list.length} {list.length === 1 ? 'item' : 'items'}
          </span>
          <button
            type="button"
            onClick={fetchList}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 7v5h-5M4 17v-5h5" />
              <path d="M5.6 9a7 7 0 0 1 11.6-2L20 12M4 12l2.8 5a7 7 0 0 0 11.6-2" />
            </svg>
            <span>{loading ? 'Refreshing' : 'Refresh'}</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex min-h-0 flex-1 items-center justify-center rounded-2xl border border-slate-200 bg-white py-20 shadow-sm">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-orange-500"></div>
        </div>
      ) : loadError ? (
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-amber-50 text-2xl text-amber-600">!</div>
          <h2 className="text-lg font-semibold text-slate-800">Couldn’t load food items</h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">{loadError}</p>
          <button
            type="button"
            onClick={fetchList}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-100"
          >
            Try again
          </button>
        </div>
      ) : list.length === 0 ? (
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-orange-50 text-2xl text-orange-500">🍽</div>
          <h2 className="text-lg font-semibold text-slate-800">No food items yet</h2>
          <p className="mt-2 text-sm text-slate-500">Your menu items will appear here once you add them.</p>
        </div>
      ) : (
        <div className="min-h-0 flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="h-full overflow-auto">
          <table className="w-full min-w-170 border-collapse text-left">
            <thead className="sticky top-0 z-10">
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Image
                </th>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Name
                </th>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Category
                </th>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Price
                </th>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {list.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-slate-100 transition last:border-0 hover:bg-slate-50/80"
                >
                  <td className="px-5 py-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-14 w-14 rounded-xl object-cover ring-1 ring-slate-200"
                    />
                  </td>

                  <td className="px-5 py-4 font-semibold text-slate-800">
                    {item.name}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">{item.category}</span>
                  </td>

                  <td className="px-5 py-4 text-sm font-medium text-slate-800">
                    ${item.price}
                  </td>

                  <td className="px-5 py-4">
                    <button
                      onClick={() => removeFood(item.id)}
                      disabled={removingId === item.id}
                      aria-label={`Remove ${item.name}`}
                      className="grid h-9 w-9 place-items-center rounded-lg text-xl font-medium text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {removingId === item.id ? (
                        <span className="inline-block w-5 h-5 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin"></span>
                      ) : (
                        '×'
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      )}
    </div>
  )
}

export default List