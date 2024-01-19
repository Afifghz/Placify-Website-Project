import React, {useState, useEffect, Children} from 'react';
import LogoNav from '../../assets/logoForm.png'
import iconPinjam from '../../assets/pinjamIcon.png'
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className='bg-[#302768] sticky top-0 z-50'>
      <div className='container mx-auto px-12 flex justify-between h-[17vh]'>
        <div className="flex py-4 items-center w-[24%]">
          <img src={LogoNav} alt="" className='h-10'/>
        </div>
        <div className='flex items-center gap-4 text-white'>
          <Link to="/beranda" className='flex items-center gap-2'>
            <p className='body1-semibold hover:text-gray-300' href=''>Beranda</p>
          </Link> 
          <Link to="/product" className='flex items-center gap-2'>
            <img src={iconPinjam} alt="" className='hover:fill-slate-400'/>
            <a className='subtitle hover:text-gray-300' href=''>Jelajah</a>
          </Link>          
          <Link to="/login">
            <Button buttonColor='border-gray-300'>Masuk</Button>
          </Link>
          <Link to="/register">
            <Button buttonColor='border-[#75319B]' bgColor='bg-[#75319B]'>Daftar</Button>
          </Link>          
        </div>
      </div>
    </nav>
  );
};

const Button = (props) => {
  const { buttonColor, bgColor, children } = props;
  return (
    <button className={`subtitle rounded-md py-2 px-4 border-2 ${buttonColor} ${bgColor}`}>
      {children}
    </button>
  );
};

export default Navbar;
