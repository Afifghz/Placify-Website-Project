import ProfileIcon from '../../assets/profile.png'
import NavbarLog from '../Elements/NavbarLog'
import Footer from '../Elements/Footer'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../Elements/Input/Input'
import axios from 'axios'
import { useEffect, useState } from 'react'

const profile = () => {
  const navigate = useNavigate();
  const [users, setusers] = useState([]);

  useEffect(() => {
    // Fetch user data from the server after successful login
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/getUserData'); // Replace with your actual endpoint
        const userData = response.data;
        setusers(userData);
        console.log(response)
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error, e.g., redirect to login page if not authenticated
        navigate('/login'); // Redirect to login page
      }
    };

    fetchUserData();
  }, []);

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
                  <h2>{users.displayName}</h2>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <Buttons color="gray-300">Informasi Akun</Buttons>
                <Link to="/profile2">
                  <Buttons color="white">Riwayat Pesanan</Buttons>
                </Link>          
                <Buttons color="white">Keamanan</Buttons>
                <Buttons color="white">Pusat Bantuan dan Dukungan</Buttons>
                <Buttons color="white" onClick={handleButton}>Keluar/Hapus Akun</Buttons>
              </div>
            </div>
            <div className="w-4/6 flex flex-col gap-8">
                <div className="bg-white h-[30vh] rounded-2xl shadow-md p-10 flex flex-col gap-6">
                  <h1>Pengaturan</h1>
                  <h4>Informasi akun</h4>
                </div>
                <div className="bg-white rounded-2xl shadow-md p-10">
                  <h5>Data Pribadi</h5>
                  <hr className='bg-violet-900 h-2 rounded-sm w-[10%] mt-2'/>
                  <form action="" className='mt-7 flex flex-col gap-3'>
                    <p className='body1-semibold'>Nama Lengkap</p>
                    <Input type="text" placeholder="Masukkan Nama Lengkap" value={users.displayName} />
                    <div className="w-full flex flex-row gap-6">
                      <div className="w-1/3 flex flex-col gap-3">
                        <p className='body1-semibold'>Kelamin</p>
                        <Input type="dropdown" />
                      </div>
                      <div className="w-2/3 flex flex-col gap-3">
                        <p className='body1-semibold'>Tanggal Lahir</p>
                        <Input type="date" />
                      </div>
                    </div>
                    <p className='body1-semibold'>Kota</p>
                    <Input type="text" placeholder="Masukkan Nama Kota" />
                    <p className='body1-semibold'>Email</p>
                    <Input type="text" placeholder="Masukkan Email Anda" value={users.email} />
                    <p className='body1-semibold'>No Telpon</p>
                    <Input type="text" placeholder="Masukkan Email Anda" />
                  </form>
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
export default profile