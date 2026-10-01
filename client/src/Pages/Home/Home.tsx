import React, { useState } from 'react'
import Header from '../../components/Header'
import ExploreMenu from '../../components/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay';
import AppDownload from '../../components/AppDownload';

function Home() {
  const [category, setCategory] = useState<string>("All");
  return (
    <div>
        <Header />
        <ExploreMenu category={category} setCategory={setCategory}/>
        <FoodDisplay category={category}/>
        <AppDownload />
    </div>
  )
}

export default Home