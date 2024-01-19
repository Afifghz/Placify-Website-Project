import React, { useEffect, useState } from 'react'
import Navbar from '../Elements/NavbarLog'
import Desc from '../../assets/desc.png'
import method1 from '../../assets/method1.png' 
import method2 from '../../assets/method2.png'
import method3 from '../../assets/method3.png'
import method4 from '../../assets/method4.png'
import ImgMethod from '../../assets/imgMethod.png'
import Footer from '../Elements/Footer'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import bca from '../images/brand/bca.png'
import dana from '../images/brand/dana.png'
import linkaja from '../images/brand/linkaja.png'
import mandiri from '../images/brand/mandiri.png'
import qris from '../images/brand/qris.png'

const Order = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { transactionId } = useParams();
  const navigate = useNavigate()
  const [order, setOrder] = useState([]);
  const [idproduk, setIdProduk] = useState('')
  const [products, setProducts] = useState([]);


  useEffect(() => {
    // Fetch the existing product data based on the id
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/products/${idproduk}`);
        const productData = response.data;
        setProducts(productData)

        console.log(productData)
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, [idproduk]);


  useEffect(() => {
    // Fetch the existing product data based on the id
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/transactions/${transactionId}`);
        const productData = response.data;
        setOrder(productData)
        setIdProduk(productData.products_id)

        console.log(productData)
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, [transactionId]);

  const formatDate = (timestamp) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(timestamp).toLocaleDateString('en-US', options);
  };

  const handlePayment = async () => {
    try {
      // Make an API call to update the transaction status and selected payment method
      await axios.put(`http://localhost:3001/transactions/${transactionId}`, {
        status: 'paid',
        tipe_pembayaran: selectedMethod,
      });
  
      // Handle payment based on the selected method
      switch (selectedMethod) {
        case 'qris':
          // Implement QRIS payment logic
          break;
        case 'linkaja':
          // Implement LinkAja payment logic
          break;
        case 'bca':
        case 'bri':
        case 'mandiri':
          // Implement BCA, BRI, Mandiri payment logic
          break;
        case 'dana':
          // Implement Dana payment logic
          break;
        default:
          console.error('Invalid payment method');
      }
  
      // Show success popup
      setShowPopup(true);
    } catch (error) {
      console.error('Error handling payment:', error);
    }
  };
  

  const [selectedMethod, setSelectedMethod] = useState(null);

  const handlePaymentSelection = (method) => {
    setSelectedMethod(method);
  };

         
  return (
    <>
        <Navbar />
        <div className="container mx-auto">
            <h1 className='text-3xl font-semibold text-gray-900 mb-6 mt-12'>Detail Pemesanan</h1>
            {/* <img src={Desc} alt="" className='mb-6'/> */}
            <div className="flex gap-4">
              <div className="w-3/5 rounded-md border-2 border-black p-6">
                <table>
                  <tbody>
                    <tr>
                      <th className='text-md font-semibold text-gray-900 text-left'>Nama Pemesan</th>
                      <td className='text-md font-semibold text-gray-900'>: {order.nama_lengkap}</td>
                    </tr>
                    <tr>
                      <th className='text-md font-semibold text-gray-900 text-left'>No Ponsel</th>
                      <td className='text-md font-semibold text-gray-900'>: {order.no_hp}</td>
                    </tr>
                    <tr>
                      <th className='text-md font-semibold text-gray-900 text-left'>Alamat Email</th>
                      <td className='text-md font-semibold text-gray-900'>: {order.no_hp}</td>
                    </tr>
                    <tr>
                      <th className='text-md font-semibold text-gray-900 text-left'>Jumlah Tamu</th>
                      <td className='text-md font-semibold text-gray-900'>: {order.jumlah_tamu}</td>
                    </tr>
                    <tr>
                      <th className='text-md font-semibold text-gray-900 text-left'>Tanggal Pemakaian</th>
                      <td className='text-md font-semibold text-gray-900'>: {formatDate(order.tanggal_pemakaian)} ({order.waktu_awal}) </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="w-2/5 rounded-md border-2 border-black p-6 h-[35vh]">
                <div className="flex justify-center items-center gap-10 mb-5">
                  <img src={products.image} alt="" style={{ width: '50%' }} />
                  <br />
                  <h1 className='text-xl font-bold text-gray-900 mb-6 pt-4'>{products.name} </h1>
                </div>
              </div>
            </div>


            <h1 className='text-3xl font-semibold text-gray-900 mb-6'>Metode Pembayaran</h1>
            <div className='border-2 border-gray-400 p-6 flex flex-col justify-between  mb-12 rounded-md'>
              <div className="flex flex-col mx-auto gap-6">

                <div className="flex gap-4">
                <div
        className={`w-1/2 rounded-md border-2 border-black p-6 h-[35vh] ${
          selectedMethod === 'qris' ? 'bg-gray-200' : ''
        }`}
        onClick={() => handlePaymentSelection('qris')}
      >
        <div className="flex justify-between items-center gap-10 mb-5">
          <img src={qris} alt="" />
          <br />
          <h1 className='text-xl font-bold text-gray-900 mb-6 pt-4'>{products.price} </h1>
        </div>
      </div>

      <div
        className={`w-1/2 rounded-md border-2 border-black p-6 h-[35vh] ${
          selectedMethod === 'linkaja' ? 'bg-gray-200' : ''
        }`}
        onClick={() => handlePaymentSelection('linkaja')}
      >
        <div className="flex justify-between items-center gap-10 mb-5">
          <img src={linkaja} alt="" />
          <br />
          <h1 className='text-xl font-bold text-gray-900 mb-6 pt-4'>{products.price} </h1>
        </div>
      </div>
                </div>

                <div className="flex gap-4">
                <div
        className={`w-1/2 rounded-md border-2 border-black p-6 h-[35vh] ${
          selectedMethod === 'bca' ? 'bg-gray-200' : ''
        }`}
        onClick={() => handlePaymentSelection('bca')}
      >
        <div className="flex justify-between items-center gap-10 mb-5">
          <img src={bca} alt="" />
          <img src={mandiri} alt="" />
          <br />
          <h1 className='text-xl font-bold text-gray-900 mb-6 pt-4'>{products.price} </h1>
        </div>
      </div>

      <div
        className={`w-1/2 rounded-md border-2 border-black p-6 h-[35vh] ${
          selectedMethod === 'dana' ? 'bg-gray-200' : ''
        }`}
        onClick={() => handlePaymentSelection('dana')}
      >
        <div className="flex justify-between items-center gap-10 mb-5">
          <img src={dana} alt="" />
          <br />
          <h1 className='text-xl font-bold text-gray-900 mb-6 pt-4'>{products.price} </h1>
        </div>
      </div>
                </div>

              </div>

                <div className='flex justify-end mt-6'>
                  
                        <button onClick={handlePayment} className="inline-flex items-center px-3 py-2 text-xl font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 justify-end">
                            Pesan
                        </button>
                        {showPopup && (
                          <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
                            <div className="bg-white p-8 rounded-md shadow-md">
                              <p className="text-2xl font-bold mb-4 text-purple-700">Sewa Sukses</p>
                              <p className="text-lg mb-4">Terima kasih telah menggunakan layanan kami</p>
                              <button
                                onClick={() => setShowPopup(false)}
                                className="px-4 py-2 bg-purple-700 text-white rounded-md"
                              >
                                Tutup
                              </button>
                            </div>
                          </div>
                        )}
                </div>
            </div>
        </div>
        <Footer />
    </>
  )
}

export default Order