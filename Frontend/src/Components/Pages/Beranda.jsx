import React, { useEffect, useState } from 'react'
import Navbar from '../Elements/Navbar' 
import imgHome from '../../assets/imgHome.png'
import Banner from '../../assets/banner.png'
import Card from '../../Components/Fragments/CardProduct'
import Img2 from '../../assets/img2.png'
import Img3 from '../../assets/img3.png'
import Footer from '../Elements/Footer'
import axios from 'axios'
import ImageSlider from '../Fragments/ImageSlider';


const Beranda = () => {
  const images = [
    './src/assets/imageSlider/1.png',
    './src/assets/imageSlider/2.png',
    './src/assets/imageSlider/3.png'
  ];
  return (
    <>
        <Navbar />
        <div className="container mx-auto px-12">
          
          <HeroSection />
          <ReviewSection />
        </div>
        <div className="flex">
          <img src={Banner} alt=""/>
        </div>
        
        <div className="container mx-auto px-12 flex mt-11">
          <div className="w-full">
            <h1 className='mb-1 font-bold text-3xl'>Sulit Cari Tempat Event?</h1>
            <p className='font-normal text-sm text-gray-500'>Placify hadir sebagai solusi, tinggal klik ga pakai lama</p>
          </div>
        </div>
        <div className="container mx-auto px-12 flex h-[70vh] items-center justify-center">
          <div className="w-1/2 flex items-center justify-center">
            <img src={Img2} alt="" />
          </div>
          <div className="w-1/2">
            <h1 className='mb-1 font-bold text-3xl'>Tanpa Ribet</h1>
            <p className='font-normal text-sm text-gray-500'>
              Cari dan bandingkan tempat tanpa harus datang secara langsung memberikan kemudahan dalam mencari informasi serta membandingkan berbagai lokasi atau tempat secara efisien dan praktis, tanpa perlu melakukan kunjungan langsung ke lokasi tersebut.
            </p>
          </div>
        </div>
        <div className="container mx-auto px-12 flex h-[70vh] items-center justify-center">
          <div className="w-1/2">
            <h1 className='mb-1 font-bold text-3xl'>Dengan sekali klik</h1>
            <p className='font-normal text-sm text-gray-500'>
              Cari dan bandingkan tempat tanpa harus datang secara langsung memberikan kemudahan dalam mencari informasi serta membandingkan berbagai lokasi atau tempat secara efisien dan praktis, tanpa perlu melakukan kunjungan langsung ke lokasi tersebut.
            </p>
          </div>
          <div className="w-1/2 flex items-center justify-center">
            <img src={Img3} alt="" />
          </div>
        </div>
        <div className="container mx-auto px-12 flex h-[20vh]">
          <div className="w-full flex flex-col ">
            <h1 className='mb-1 font-bold text-3xl'>Placify</h1>
            <p className='font-normal text-sm text-gray-500'>
              Integrasi yang baik terhadap proses penyewaan tempat memungkinkan untuk mencari, membandingkan, dan memesan tempat secara online.
            </p>
          </div>
        </div>
        <Footer />
    </>
  )
}

const HeroSection = () => {
  const images = [
    './src/assets/imageSlider/1.png',
    './src/assets/imageSlider/2.png',
    './src/assets/imageSlider/3.png'
  ];
  return (
    <>
      <div className="mt-8">
        <ImageSlider images={images} />
      </div>
    </>
  )
}

const ReviewSection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/products');
      if (Array.isArray(response.data)) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
  
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  const displayedProducts = products.slice(0, 4);
  return(
    <>
      <div className="flex justify-start items-start h-[80vh]">       
        <div className="flex pt-11 flex-col gap-4">
          <h2 className="text-gray-900">Tempat Pilihan</h2>
          <div className="flex items-start gap-4">
            {displayedProducts.map((product) => (
              <Card key={product.id}>
                <Card.Header image={product.image}></Card.Header>
                <Card.Body title={product.name} place={product.location}></Card.Body>
                <Card.Footer price={formatPrice(product.price)} navigate={`/products/${product._id}`} />
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Beranda