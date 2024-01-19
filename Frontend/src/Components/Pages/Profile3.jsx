import React, { useEffect, useState } from 'react'
import ProfileIcon from '../../assets/profile.png'
import NavbarLog from '../Elements/NavbarLog'
import Footer from '../Elements/Footer'
import { Link, useNavigate } from 'react-router-dom'
import Back from '../../assets/Vector.png'
import axios from 'axios'
const Profile3 = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from the server after successful login
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/getUserData'); // Replace with your actual endpoint
        const userData = response.data;
        setName(userData.displayName);
        console.log(response);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error, e.g., redirect to login page if not authenticated
        navigate('/login'); // Redirect to the login page
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleButton = () => {
    localStorage.clear();
    window.location.href = '/login';
  }
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
                <Link to="/profile2">
                  <Buttons color="white">Riwayat Pesanan</Buttons>
                </Link>  
                <Link to="/profile3">                                            
                  <Buttons color="white">Keamanan</Buttons>  
                </Link> 
                <Link to="/profile4">
                  <Buttons color="gray-300">Pusat Bantuan dan Dukungan</Buttons>
                </Link>
                <Buttons color="white" onClick={handleButton}>Keluar/Hapus Akun</Buttons>
              </div>
            </div>
            <div className="w-4/6 flex flex-col gap-8">
                <div className="bg-white h-[30vh] rounded-2xl shadow-md p-10 flex flex-col gap-6">
                  <h1>Pengaturan</h1>
                  <h4>Keamanan</h4>
                </div>
                <div className="bg-white rounded-2xl shadow-md p-10 flex flex-col gap-6">
                  <MenuBtn>Bagaimana Membatalkan Pesanan ?</MenuBtn>
                  <MenuBtn>Bagaimana Cara Menghubungi Penyewa Tempat ?</MenuBtn>
                  <MenuBtn>Bagaimana Cara Menghapus Akun?</MenuBtn>
                  <MenuBtn>Bagaimana Cara menghubungi Layanan Pengaduam Konsumen ?</MenuBtn>
                </div>
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

const MenuBtn = (props) => {
  const { children } = props;
  return (
    <button className='w-full flex justify-between items-center border-2 border-gray-400 rounded-md py-2 text-start px-4 text-black subtitle  hover:bg-gray-100'>
      {children}
      <img src={Back} alt=""/>
    </button> 
  )
}

export default Profile3