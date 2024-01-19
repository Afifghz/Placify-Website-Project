import React, { useState, useEffect } from 'react'
import FooterAdmin from './Footer';
import SidebarAdmin from './Sidebar';
// import useTokenRefresh from '../../../controllers/useToken';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-tailwind/react';

const LayoutAdmin = ({children}) => {
    const navigate = useNavigate()
    // const { data,  refreshToken } = useTokenRefresh()
    const Logout = async () => {
        try {
          await axios.post('http://localhost:3001/logout')      
          navigate('/')
        } catch(error) {
          console.log(error)
        }
      }
    return (
    <div className={`min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased`}>
        <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white  text-black dark:text-white">
            <div className={`fixed w-full flex items-center justify-between h-14 text-white z-10  bg-blue-500`}>
                <div className="flex items-center justify-start md:justify-center pl-3 w-14 md:w-64 h-14 border-none">
                    <h4>Dashboard Admin</h4>
                    {/* <span className="hidden md:block">{data.username}</span> */}
                    </div>
                    <div className="flex justify-between items-center h-14 header-right">
                    <ul className="flex items-center">
                        <li>
                        
                        </li>
                        <li>
                        <div className="block w-px h-6 mx-3 bg-gray-400 " />
                        </li>
                        <li>
                        <Button onClick={Logout} className="bg-transparent flex items-center mr-4 hover:text-blue-100">
                            <span className="inline-flex mr-1">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                            </span>
                            Logout
                        </Button>
                        </li>
                    </ul>
                    </div>
                </div>
          {children}
          <SidebarAdmin />
          <FooterAdmin />
        </div>
      </div>
    );
}

export default LayoutAdmin