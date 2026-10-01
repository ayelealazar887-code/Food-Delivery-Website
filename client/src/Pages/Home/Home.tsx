import { useState } from 'react'
import Header from '../../components/Header'
import ExploreMenu from '../../components/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay'
import AppDownload from '../../components/AppDownload'
import Footer from '../../components/Footer'

function Home() {
  const [category, setCategory] = useState('All')

  return (
    <>
      <section id="home">
        <Header />
      </section>

      <section id="menu">
        <ExploreMenu
          category={category}
          setCategory={setCategory}
        />

        <FoodDisplay category={category} />
      </section>

      <section id="mobile-app">
        <AppDownload />
      </section>

      <section id="contact-us">
        <Footer />
      </section>
    </>
  )
}

export default Home