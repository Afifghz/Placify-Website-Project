import React, { useEffect, useState } from 'react'
import ProfileIcon from '../../assets/profile.png'
import NavbarLog from '../Elements/NavbarLog'
import Footer from '../Elements/Footer'
import { Link, useNavigate } from 'react-router-dom'
import pesanan from '../../assets/pesanan.png'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const Profile1 = () => {
  const handleButton = () => {
    localStorage.clear();
    window.location.href = '/login';
  }

  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from the server after successful login
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/getUserData'); // Replace with your actual endpoint
        const userData = response.data;
        setName(userData.displayName);
        console.log(response)
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error, e.g., redirect to login page if not authenticated
        navigate('/login'); // Redirect to login page
      }
    };

    fetchUserData();
  }, []);


  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    getTransaction();
  }, []);

  const getTransaction = async () => {
    try {
      const response = await axios.get('http://localhost:3001/transactions');
      setTransaction(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const formatDate = (timestamp) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(timestamp).toLocaleDateString('en-US', options);
  };

  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleUpdate = (productId) => {
    setSelectedProductId(productId);
    navigate(`/cekpesanan/${productId}`);
  };

  return (
    <>  
        <NavbarLog />
        <div className="bg-gray-200">
          <div className="container mx-auto py-6 flex flex-row gap-6">
            <div className="w-2/6 flex flex-col gap-8">
              <div className="bg-white h-[30vh] rounded-2xl shadow-md flex justify-center items-center gap-6">
                <img src={ProfileIcon} alt="" className='h-[20vh]'/>
                <div className="flex flex-col justify-center items-start gap-3">
                  <h2>Hello</h2>
                  <h2>{name}</h2>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <Link to="/profile1">
                  <Buttons color="white" >Informasi Akun</Buttons>
                </Link>        
                <Buttons color="gray-300">Riwayat Pesanan</Buttons>
                <Link to="/profile3">
                  <Buttons color="white">Keamanan</Buttons>
                </Link>
                <Link to="/profile4">
                  <Buttons color="white">Pusat Bantuan dan Dukungan</Buttons>
                </Link>
                <Buttons color="white" onClick={handleButton}>Keluar/Hapus Akun</Buttons>
              </div>
            </div>
            <div className="w-4/6 flex flex-col gap-8">
                <div className="bg-white rounded-2xl shadow-md py-5 px-20">
                  Riwayat Pesanan
                </div>
                <table className="min-w-full border bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Nama Lengkap</th>
                <th className="py-2 px-4">Waktu</th>
                <th className="py-2 px-4">Tanggal Pakai</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Aksi</th>
              </tr>
            </thead>
            <tbody className="justify-center">
              {transaction.map((transaksi, index) => (
                <tr key={index}>
                 <td className="py-2 px-4 text-center">{index + 1}</td>
                <td className="py-2 px-4 text-center">{transaksi.nama_lengkap}</td>
                <td className="py-2 px-4 text-center">{transaksi.waktu_awal}</td>
                <td className="py-2 px-4 text-center">{formatDate(transaksi.tanggal_pemakaian)}</td>
                <td className="py-2 px-4 text-center">{transaksi.status}</td>
                <td className="py-2 px-4 text-center"><button onClick={() => handleUpdate(transaksi._id)}>
                    <FontAwesomeIcon icon={faEye} className="text-blue-500 cursor-pointer hover:text-blue-700" />
                  </button></td>
                </tr>
              ))}
            </tbody>
          </table>
            </div>
          </div>
        </div>
        
        <Footer />
    </>
  )
}
const Buttons = (props) => {
  const { children, color, onClick } = props;
  return (
    <button className={`w-full bg-${color} rounded-md py-6 text-black subtitle shadow-md hover:bg-gray-300`} onClick={onClick}>
        {children}
    </button>
  )
}
export default Profile1