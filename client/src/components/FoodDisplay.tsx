import { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import FoodItem from './FoodItem'

function FoodDisplay({ category }: { category: string }) {
    const context = useContext(StoreContext)

    if (!context) {
        throw new Error('FoodDisplay must be used inside StoreContextProvider')
    }

    const { food_list } = context

    const filteredFood = food_list.filter((item) => {
        return category === 'All' || category === item.category
    })

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8">
                Top dishes near you
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredFood.map((item) => {
                    return (
                        <FoodItem
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            description={item.description}
                            price={item.price}
                            image={item.image}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default FoodDisplay