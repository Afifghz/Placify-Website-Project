import React, { useState, useEffect } from 'react'
import Navbar from '../Elements/NavbarLog'
import Footer from '../Elements/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocation } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@material-tailwind/react'

const CekPesanan = () => {

      const [transaksi, settransaksi] = useState([]);
      const { tid } = useParams();
      const navigate = useNavigate()
      const [produkid, setprodukid] = useState([])
      const [produk, setProduk] = useState([])
      const [cancellationReason, setCancellationReason] = useState('');

      const [selectedOption, setSelectedOption] = useState('');
      const [additionalReason, setAdditionalReason] = useState('');

      useEffect(() => {
        // Fetch the existing product data based on the id
        const fetchtransaksiData = async () => {
          try {
            const response = await axios.get(`http://localhost:3001/transactions/${tid}`);
            const transaksiData = response.data;
            settransaksi(transaksiData)
            setprodukid(transaksiData.products_id)
            console.log(transaksiData)
          } catch (error) {
            console.error('Error fetching transaksi data:', error);
          }
        };
    
        fetchtransaksiData();
      }, [tid]);


      useEffect(() => {
        // Fetch the existing product data based on the id
        const fetchProductData = async () => {
          try {
            const response = await axios.get(`http://localhost:3001/products/${produkid}`);
            const productData = response.data;
            setProduk(productData)
            console.log(productData)
          } catch (error) {
            console.error('Error fetching product data:', error);
          }
        };
    
        fetchProductData();
      }, [produkid]);
  


      const handleOptionChange = (option) => {
        setSelectedOption(option);
        setAdditionalReason('');
      };

  const formatDate = (timestamp) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(timestamp).toLocaleDateString('en-US', options);
  };

  const handleConfirmation = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/transactions/${tid}`, {
        cancellationReason,
        status: 'processed',  // Ganti status sesuai kebutuhan Anda
      });
  
      console.log(response.data);
  
      // Handle success, redirect or show a success message
    } catch (error) {
      console.error('Error confirming transaction:', error);
      // Handle error, show an error message, or redirect to an error page
    }
  };
      
  return (
    <>
        <Navbar/>

        


        <div className="container mx-auto px-12 flex flex-col  mb-12">
            <div className="w-full rounded-md border-2 border-black p-6 mb-7">
                <h4>Lokasi Pemesanan</h4>
                <div className='flex'>
                <FontAwesomeIcon icon={faLocation} className="text-blue-500 cursor-pointer hover:text-blue-700" />
                <p className='px-4'>{produk.location}</p>
                </div>
            </div>

            <div className="w-full rounded-md border-2 border-black p-6">
                
                <div className='flex justify-between '>
                    <div className='flex flex-col'>
                        <label htmlFor="name" className='text-md font-semibold text-gray-900'>Tempat Pemesanan</label>
                    </div>
                    <div className='flex flex-col'>
                        
                    </div>
                    <div className='flex flex-col'>
                        
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="name" className='text-md font-semibold text-gray-900'>Harga Tempat</label>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="name" className='text-md font-semibold text-gray-900'>Jumlah</label>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="name" className='text-md font-semibold text-gray-900'>Total Harga</label>
                    </div>
                </div>                
            </div>
            <div className="w-full rounded-t-md border-x-2 border-black p-6 ">
                
                <div className='flex justify-between '>
                    <div className='flex flex-col'>
                        <label htmlFor="name" className='text-md font-semibold text-gray-900'>{produk.name}</label>
                        <img src={produk.image}  alt="" style={{ width: '200px' }} />
                    </div>
                    <div className='flex flex-col'>
                        
                        </div>
                        <div className='flex flex-col'>
                            
                        </div>
                    <div className='flex flex-col'>
                        <label htmlFor="name" className='text-md font-semibold text-gray-900'>Rp. {produk.price}</label>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="name" className='text-md font-semibold text-gray-900'>1</label>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="name" className='text-md font-semibold text-gray-900'>Rp. {produk.price}</label>
                    </div>
                </div>                
            </div>
            <div className="w-full border-t border-dashed border-black">
</div>

            <div className="w-full border-l-2 border-r-2 border-black p-6">
                <div className='flex justify-between '>
                    <div className='flex'>
                        <label htmlFor="name" className='text-md font-semibold text-gray-900 mx-4'>Pesan</label>
                        <input type="text" placeholder='Tuliskan Pesan Tambahan' />
                    </div>
                    <div className='flex flex-col'>
                        
                    </div>
                    <div className='flex flex-col'>
                        
                    </div>
                    <div className='flex flex-col'>

                    </div>
                    <div className='flex flex-col'>

                    </div>
                    <div className='flex flex-col'>

                    </div>
                </div>                
            </div>
            <div className="w-full border-b border-dashed border-black">
</div>
<div className="w-full rounded-b-md border-x-2 border-b-2 border-black p-6 mb-7">
                
                <div className='flex justify-between '>
                    <div className='flex flex-col'>
                     
                    </div>
                    <div className='flex flex-col'>
                        
                    </div>
                    <div className='flex flex-col'>
                        
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="name" className='text-md font-semibold text-gray-900'>Total Pesanan (1 Tempat)</label>
                    </div>
                    <div className='flex flex-col'>
                      
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="name" className='text-md font-semibold text-gray-900'>Rp. {produk.price}</label>
                    </div>
                </div>                
            </div>



            <div className="w-full rounded-md border-2 border-black p-6">
                
                <div className='flex justify-between '>
                    <div className='flex flex-col'>
                        <label htmlFor="name" className='text-md font-semibold text-gray-900'>Metode Pembayaran</label>
                    </div>
                    <div className='flex flex-col'>
                        
                    </div>
                    <div className='flex flex-col'>
                        
                    </div>
                    <div className='flex flex-col'>
                        
                    </div>
                    <div className='flex flex-col'>
                        
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="name" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 justify-end">{transaksi.tipe_pembayaran}</label>
                    </div>
                </div>                
            </div>

            <div className="w-full  rounded-t-md border-l-2 border-r-2 border-t border-black p-6">
                <div className='flex justify-between '>
                    <div className='flex'>
                        
                    </div>
                    <div className='flex flex-col'>
                        
                    </div>
                    <div className='flex flex-col'>
                        
                    </div>
                    <div className='flex flex-col'>

                    </div>
                    <div className='flex flex-col'>
                    <label htmlFor="name" className='text-md font-semibold text-gray-900'>No.Pemesanan : </label>
                    <label htmlFor="name" className='text-md font-semibold text-gray-900'>Waktu pemesanan : </label>
                    </div>
                    <div className='flex flex-col'>
                    <label htmlFor="name" className='text-md font-semibold text-gray-900'>{transaksi.no_pesanan}</label>
                    <label htmlFor="name" className='text-md font-semibold text-gray-900'>{formatDate(transaksi.tanggal_pemakaian)}</label>
                    </div>
                </div>                
            </div>
            <div className="w-full border-b border-dashed border-black">
</div>
<div className="w-full rounded-b-md border-x-2 border-b-2 border-black p-6">
                
                <div className='flex justify-between '>
                    <div className='flex flex-col'>
                     
                    </div>
                    <div className='flex flex-col'>
                        
                    </div>
                    <div className='flex flex-col'>
                        
                        <label htmlFor="name" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 justify-end">Hubungi Pemilik Tempat</label>
                    </div>
                    <div className='flex flex-col'>
                      
                    </div>
                    <div className='flex flex-col'>
      
                    </div>
                </div>                
            </div>


            <div className="w-full rounded-md border-2 border-black p-6 mt-7">
                
                <div className='flex justify-between '>
                    <div className='flex flex-col'>
                        <label htmlFor="name" className='text-md font-semibold text-gray-900'>Kebijakan Pembatalan</label>
                    </div>
                    <div className='flex flex-col'>
                        
                    </div>
                    <div className='flex flex-col'>
                        
                    </div>
                    <div className='flex flex-col'>
                        
                    </div>
                    <div className='flex flex-col'>
                        
                    </div>
                    <div className='flex flex-col'>
                       
                    </div>
                </div>                
            </div>
            <div className="w-full rounded-md border-2 border-black p-6">
                
                <div className='flex justify-between '>
                    <div className='flex flex-col'>
                    <label htmlFor="name" className='text-md font-semibold text-gray-900'>Pilih Alasan Pembatalan</label>
                    </div>
                    <div className='flex flex-col'>
                        
                    </div>
                    <div className='flex flex-col'>
                        
                        
                    </div>
                    <div className='flex flex-col'>
                      
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="options" className='text-md font-semibold text-gray-900'>Pilihan:</label>
                        <select
                            id="options"
                            value={selectedOption}
                            onChange={(e) => handleOptionChange(e.target.value)}
                            className="mb-2"
                        >
                            <option value="">Pilih opsi</option>
                            <option value="changePaymentMethod">Ingin mengubah metode pembayaran</option>
                            <option value="changeDetails">Ingin mengubah rincian & membuat penyewaan baru</option>
                            <option value="other">Lainnya</option>
                        </select>

                        {selectedOption === 'other' && (
                            <div className='flex flex-col'>
                            <label htmlFor="additionalReason" className='text-md font-semibold text-gray-900'>
                                Alasan Lainnya:
                            </label>
                            <input
                                type="text"
                                id="additionalReason"
                                placeholder='Masukkan Alasan Lainnya'
                                value={additionalReason}
                                onChange={(e) => setAdditionalReason(e.target.value)}
                                className="mb-2"
                            />
                            </div>
                        )}

                        <Button
                            htmlFor="name"
                            onClick={handleConfirmation}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 justify-end"
                        >
                            Konfirmasi
                        </Button>
                        </div>
                </div>                
            </div>
            {/* <div className="w-2/5 rounded-md border-2 border-black p-6 h-[35vh]" >
                <div className="flex justify-center items-center gap-10 mb-5">
                    <img src={products.image} alt="" style={{ width: '50%' }} />
                    <h1 className='text-xl font-bold text-gray-900 mb-6 pt-4'>{products.name} </h1>
                </div>
                <hr className='bg-gray-300 h-[3px] mb-3'/>
                <p className=" flex justify-end text-2xl text-purple-700 font-bold mb-2">Rp{products.price}</p>
            </div> */}
            
        </div>
        <Footer/>
    </>
  )
}

export default CekPesanan