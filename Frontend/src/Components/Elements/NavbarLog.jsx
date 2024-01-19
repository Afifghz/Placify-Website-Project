import React, { useState, useEffect } from 'react';
import LogoNav from '../../assets/logoForm.png'
import iconPinjam from '../../assets/pinjamIcon.png'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NavbarLog = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from the server after successful login
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/getUserData'); // Replace with your actual endpoint
        const userData = response.data;
        setName(userData.displayName);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error, e.g., redirect to login page if not authenticated
        navigate('/login'); // Redirect to login page
      }
    };

    fetchUserData();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  const handleLogout = async () => {
    try {
      // Make a request to the logout endpoint to clear the token cookie
      await axios.post('http://localhost:3001/logout');
      // Redirect to the login page or perform any other desired actions
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <nav className='bg-[#302768] sticky top-0 z-50'>
      <div className='container mx-auto px-12 flex justify-between h-[17vh]'>
        <div className="flex py-4 items-center w-[24%]">
          <img src={LogoNav} alt="" className='h-10'/>
        </div>
        <div className='flex items-center gap-6 text-white'>
          <Link to="/beranda" className='flex items-center gap-2'>
            <p className='body1-semibold hover:text-gray-300' href=''>Beranda</p>
          </Link>          
          <Link to="/product" className='flex items-center gap-2'>
            <img src={iconPinjam} alt="" className='hover:fill-slate-400'/>
            <p className='body1-semibold hover:text-gray-300' href=''>Jelajah</p>
          </Link>
          <Link to="/profile1">
            <p className='body1-semibold hover:text-gray-300'>Welcome, {name}</p>
          </Link>    
          <Button buttonColor='border-[#75319B]' bgColor='bg-[#75319B]' onClick={handleLogout}>Log Out</Button>
        </div>
      </div>
    </nav>
  );
};

const Button = (props) => {
  const { buttonColor, bgColor, children, onClick } = props;
  return (
    <button className={`body1-semibold rounded-md py-2 px-4 border-2 ${buttonColor} ${bgColor}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default NavbarLog;
