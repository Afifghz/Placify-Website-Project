import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Elements/NavbarLog'
import Footer from '../Elements/Footer'
import ImgDetail from '../../assets/imgDetail.svg'
import backIcon from '../../assets/backIcon.png'
import IconLoc from '../../assets/iconLoc.png'
import IconTime from '../../assets/iconTime.png'
import ImgMaps from '../../assets/imgMaps.png'
import IconAc from '../../assets/iconAc.png'
import IconMusic from '../../assets/iconMusic.png'
import IconRapat from '../../assets/iconRapat.png'
import IconToilet from '../../assets/iconToilet.png'
import IconWifi from '../../assets/iconWifi.png'
import icon3 from '../../assets/icon3.svg'
import icon5 from '../../assets/icon5.svg'
import { Link } from 'react-router-dom'

const DetailJelajah = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/products/${id}`);
        console.log('API Response:', response.data); // Log the response data
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
  
    console.log('Component Rendered'); // Log that the component rendered
    fetchProduct();
  }, [id]);

  const formatPrice = (price) => {
    if (price !== undefined && price !== null) {
      const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return `Rp ${formattedPrice}`;
    }
    return "";
  };

  return (
    <>
      <Navbar />
      <Link to="/product"> {/* Update to the correct route */}
        <div className="bg-white">
          <div className="container py-2 mx-auto px-12 flex justify-start items-center">
            <img src={backIcon} alt="" className='h-[30px] invert top-1'/>
            <p className='body2-semibold text-md hover:text-blue-700'>Kembali</p>
          </div>
        </div>
      </Link>
      <div className="container mx-auto px-12">
        {product && (
          <>
            <img src={product.image} alt="" className='object-cover w-full h-[50vh] rounded-xl'/>
            <div className="container mx-auto px-12 bg-white sticky top-[108px] z-50">
        
          <ul className='flex justify-center items-center gap-10 py-6 text-md font-semibold body1-semibold'>
            <a href='#desc'>Deskripsi</a>
            <a href='#loc'>Lokasi</a>
            <a href='#fasilitas'>Fasilitas</a>
            <a href='#ulasan'>Ulasan</a>
            <a href='#persyaratan'>Persyaratan & Aturan</a>
            <a href='#contact'>Kontak</a>
          </ul>
          <hr className='bg-gray-300 h-[3px] mb-3'/>
        </div>
        <div className="container mx-auto pt-6 px-12 mt-3" id='desc'>
          <p className='border-2 border-gray-200 w-[60px] rounded-md text-center body2-semibold py-2 mb-4'>Cafe</p>
          <h2 className=' text-gray-900 mb-2'>{product.name}</h2>
          <div className='mb-2'>
              <div className="flex items-center">
                  <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                  </svg>
                  <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                  </svg>
                  <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                  </svg>
                  <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                  </svg>
                  <svg className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                  </svg>
                  <p className="ms-1 body2-semibold text-gray-500 dark:text-gray-400">4</p>
                  <p className="body2-semibold text-gray-500 dark:text-gray-400">/5</p>
                  <p className="ms-1 body2-semibold text-gray-500 dark:text-gray-400">(1.5k reviews)</p>
              </div>
            </div>
            <h3 className=" text-purple-700 font-bold mb-2">{formatPrice(product.price)}</h3>
            <div className='mb-2'>
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="#ffffff"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill="#FF0000"
                />
              </svg>
            </div>
            <div className='flex justify-end mt-6 mb-12 '>
              <Link to={`/formsewa/${product._id}`}>
                <button className="w-full inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#4E2167] rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 justify-center">
                  Sewa
                </button>
              </Link>
             </div>
            <hr className='bg-gray-300 h-[3px] mb-3'/>
        </div>
        <div className="container mx-auto px-12 flex py-6">
          <div className="w-2/5">
            <h2 className=' text-gray-900 mb-3' id='loc'>Lokasi</h2>
              <div className="mb-4 flex flex-row gap-5">
                <img src={IconLoc} alt=""  className='h-[40px] w-auto'/>
                <p className='body1-regular text-gray-500'>{product.location}</p>
              </div>
              <div className="mb-2 flex flex-row gap-3 items-center">
                <img src={IconTime} alt="" className='h-[30px] w-auto' />
                <p className='body1-regular text-gray-500'>11.00 - 23.00 (Setiap Hari)</p>
              </div>
          </div>
        </div>
        <div className="container mx-auto px-12 py-6 body1-regular">
          <hr className='bg-gray-300 h-[3px] mb-6'/>
          <h2 className=' text-gray-900 mb-6' id='fasilitas'>Fasilitas</h2>
          <div className="flex flex-row gap-20">
            <div>
              <div className="mb-4 flex flex-row gap-3 items-center">
                <img src={IconRapat} alt="" className='h-[30px] w-auto' />
                <p className='font-semibold text-md text-gray-500'>Fasilitas Rapat</p>
              </div>
              <div className="mb-4 flex flex-row gap-3 items-center">
                <img src={IconWifi} alt="" className='h-[23px] w-auto' />
                <p className='font-semibold text-md text-gray-500'>Free Wifi</p>
              </div>
              <div className="mb-4 flex flex-row gap-3 items-center">
                <img src={IconMusic} alt="" className='h-[30px] w-auto' />
                <p className='font-semibold text-md text-gray-500'>Live Music</p>
              </div>
              
            </div>
            <div>
                <div className="mb-4 flex flex-row gap-3 items-center">
                  <img src={IconAc} alt="" className='h-[30px] w-auto' />
                  <p className='font-semibold text-md text-gray-500'>Ac</p>
                </div>
                <div className="mb-4 flex flex-row gap-3 items-center">
                  <img src={IconToilet} alt="" className='h-[30px] w-auto' />
                  <p className='font-semibold text-md text-gray-500'>Toilet</p>
                </div>
              </div>
          </div>
        </div>
        <div className="container mx-auto px-12">
          <hr className='bg-gray-300 h-[3px] mb-3'/>
          <h2 className=' text-gray-900 mb-3' id='persyaratan'>Persyaratan dan Aturan</h2>
          <ul className='list-decimal pl-4 mb-6 body1-regular'>
            <li>Dapat  digunakan untuk acara event  seperti ulang tahun,rapat santai,acara kumpul keluarga,dll.</li>
            <li>Dilarang membawa makanan dan minuman dari luar</li>
            <li>Tidak membuat keributan ditempat.</li>
            <li>Jika telah melakukan penyewaan tempat dan melakukan pembayaran awal terjadi pembatalan menggunakan tempat uang hanya dikembalikan setengahnya saja.</li>
          </ul>
        </div>
        <div className="container mx-auto px-12">
          <hr className='bg-gray-300 h-[3px] mb-3'/>
          <h2 className=' text-gray-900 mb-6' id='contact'>Contact</h2>
          <div className="flex flex-col gap-3 mb-6 body1-regular">
            <div className='flex justify-start items-center'>
                <img src={icon3} alt="" className='mr-3 '/>
                <p className='text-md font-semibold mb-1 text-gray-900'>tema.coffeandspace</p>
            </div>
            <div className='flex justify-start items-center'>
                <img src={icon5} alt="" className='mr-3 invert h-10'/>
                <p className='text-md font-semibold mb-1 text-gray-900'>0813-664-13151</p>
            </div>
          </div>
        </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default DetailJelajah;
