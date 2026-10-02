import React, { useEffect, useState } from 'react'
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
  const [loading, setLoading] = useState(false)
  const [removingId, setRemovingId] = useState<string | null>(null)

  const fetchList = async () => {
    try {
      setLoading(true)

      const response = await api.get('/list')

      if (response.data.success) {
        setList(response.data.data)
      } else {
        toast.error(response.data.message || 'Error fetching food')
      }
    } catch (error) {
      console.error(error)
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
    fetchList()
  }, [])

  return (
    <div className="w-full px-8 py-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Food List
      </h1>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin"></div>
        </div>
      ) : list.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No food items found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                  Image
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                  Category
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                  Price
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {list.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </td>

                  <td className="px-4 py-3 text-gray-800 font-medium">
                    {item.name}
                  </td>

                  <td className="px-4 py-3 text-gray-600">
                    {item.category}
                  </td>

                  <td className="px-4 py-3 text-gray-800">
                    ${item.price}
                  </td>

                  <td className="px-4 py-3">
                    <button
                      onClick={() => removeFood(item.id)}
                      disabled={removingId === item.id}
                      className="text-red-500 hover:text-red-700 text-2xl font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
      )}
    </div>
  )
}

export default List