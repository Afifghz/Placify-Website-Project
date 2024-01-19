import React from 'react'
import { Link } from 'react-router-dom'
import Image1 from '../../assets/imgForm.png'
import Logo from '../../assets/logo.png'
const AuthLayouts = (props) => {
    const { children, title, type } = props
  return (
    <>
        <div className="h-[10vh] flex justify-center items-center gap-2">
            <img src={Logo} alt="" className='h-[6vh]'/>
        </div>
        <div className="container flex mx-auto w-5/6 h-[90vh]">           
            <div className="flex w-1/2 justify-center items-center flex-col gap-2">
                <img src={Image1} alt="" className='h-3/5 w-auto'/>
                <h3 className='text-center'>Cari Tempat Ga Pake Lama <br />Langsung di <span className='text-purple-500'>Placify</span></h3>
                <p className='body2-regular text-gray-500'>Kunjungi platform sekarang dan dapatkan kemudahannya</p>
            </div>
            <div className="w-1/2 h-full flex justify-center items-center">
                <div className="h-5/6 w-4/6 py-8 border-2 border-gray-100 rounded-lg shadow-xl flex flex-col items-center bg-white mr-11">
                    <h3 className='text-center'>{ title }</h3>
                    <p className='body2-regular text-gray-400 text-center'>Silakan isikan data diri Anda</p>
                    { children }
                    <Navigation type={type} />
                </div>
            </div>
        </div>
    </>
  )
}
const Navigation = ({type}) => {
    if (type === "login") {
        return(
            <p className='text-center body2-regular text-gray-500 mt-2'>
                Belum punya akun? 
                <Link to='/register'>
                    <span className='text-purple-500 body2-semibold'> Daftar</span>
                </Link>
            </p>
            
        );
    }else{
        return(
            <p className='text-center body2-regular text-gray-500 mt-2'>
                Sudah punya akun?  
                <Link to='/login'>
                    <span className='text-purple-500 body2-semibold'> Masuk</span>
                </Link>
            </p>
        );
    }
}
export default AuthLayouts