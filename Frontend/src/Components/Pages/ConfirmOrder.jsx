import React from 'react'
import Footer from '../Elements/Footer'
import Navbar from '../Elements/NavbarLog'
import Fake1 from '../../assets/fake1.png'
import Fake2 from '../../assets/fake2.png'
import Fake3 from '../../assets/fake3.png'
import Fake4 from '../../assets/fake4.png'
import { Link } from 'react-router-dom'

const ConfirmOrder = () => {
  return (
    <>
        <Navbar/>
        <div className="container mx-auto px-12 flex flex-col gap-10 my-10">
            <img src={Fake1} alt="" />
            <img src={Fake2} alt="" />
            <img src={Fake3} alt="" />
            <Link to="/order">
              <img src={Fake4} alt="" />
            </Link>
            
        </div>
        <Footer />
    </>
  )
}

export default ConfirmOrder