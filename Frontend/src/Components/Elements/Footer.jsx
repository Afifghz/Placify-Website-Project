import React from 'react'
import Logo from '../../assets/LogoNav.png'
import icon1 from '../../assets/icon1.svg'
import icon2 from '../../assets/icon2.svg'
import icon3 from '../../assets/icon3.svg'
import icon4 from '../../assets/icon4.svg'
import icon5 from '../../assets/icon5.svg'
const Footer = () => {
  return (
    <div className=" bg-[#302768] h-[70vh]">
        <div className="container mx-auto px-12 flex pt-16">
            <div className="w-1/4">
                <img src={Logo} alt="" className='mb-3'/>
                <p className='text-gray-300 mb-10'>
                    Placify adalah Platform web ini dapat memberikan kemudahan dalam hal efisiensi penywaan tempat untuk keperluan event. 
                </p>
                <div className="flex flex-col gap-3">
                    <div className='flex justify-start'>
                        <img src={icon4} alt="" className='mr-3 '/>
                        <p className='text-sm font-semibold mb-1 text-gray-300'>hello@placify.com</p>
                    </div>
                    <div className='flex justify-start'>
                        <img src={icon5} alt="" className='mr-3 '/>
                        <p className='text-sm font-semibold mb-1 text-gray-300'>+62 3214 0050 267</p>
                    </div>
                </div>
            </div>
            <div className="w-1/4 flex flex-col">
                <h1 className='text-3xl font-semibold mb-2 text-white'>Placify</h1>
                <hr className='mb-4 w-3/4'/>
                <a className='text-sm font-semibold mb-1 text-gray-300' href='#'>Tentang Kami</a>
                <a className='text-sm font-semibold mb-1 text-gray-300' href='#'>Layanan</a>
                <a className='text-sm font-semibold mb-1 text-gray-300' href='#'>FAQ</a>
            </div>
            <div className="w-1/4 flex flex-col">
                <h1 className='text-3xl font-semibold mb-2 text-white'>Lain-Lain</h1>
                <hr className='mb-4 w-3/4'/>
                <a className='text-sm font-semibold mb-1 text-gray-300' href='#'>Semua Kategori</a>
                <a className='text-sm font-semibold mb-1 text-gray-300' href='#'>Lihat Promo</a>
                <a className='text-sm font-semibold mb-1 text-gray-300' href='#'>Hello Placify</a>
            </div>
            <div className="w-1/4">
                <h1 className='text-3xl font-semibold mb-2 text-white'>Temukan Kami</h1>
                <div className="flex gap-3">
                    <img src={icon1} alt="" />
                    <img src={icon2} alt="" />
                    <img src={icon3} alt="" />
                </div>
            </div>
        </div>
        <div className="container mx-auto px-12 flex pt-6">
            <div className="w-full">
                <hr className='mb-4'/>
                <p className='text-sm font-semibold text-center text-gray-300'>&copy; 2023 PT. Nextin Indonesia. All Rights Reserved</p>
            </div>
        </div>
    </div>

  )
}

export default Footer