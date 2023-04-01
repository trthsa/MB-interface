import React from 'react'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import Navbar from '../Components/Navbar'
import Banner from '../Components/Slider/Banner'
import Body from '../Components/Body'
const Home = () => {
  return (
    <div className="home">
    <Header/>
    <Navbar/>
    <Banner/>
    <Body/>
    <Footer/>
    </div>
  )
}

export default Home