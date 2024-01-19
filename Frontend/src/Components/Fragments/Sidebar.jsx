import React from 'react'
import { FaTachometerAlt, FaMapMarkerAlt, FaDollarSign} from "react-icons/fa"

const Sidebar = () => {
    return (
        <div className='bg-[#4E73DF] h-screen flex flex-col '>
            <div className='px-[15px] py-[30px] flex items-center justify-center border-b-[1px] border-[#EDEDED]/[0.3]'>
                <h1 className='text-white text-[20px] leading-[24px] font-extrabold cursor-pointer text-center'>Admin panel</h1>
            </div>
            <div className='flex justify-center items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer bg-blue-500'>
                <FaTachometerAlt color='white' />
                <p className='text-[14px] leading-[20px] font-bold text-white'>Dashboard</p>
            </div>
            <div className='pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3] px-4'>
                <p className='text-[10px] font-extrabold leading-[16px] text-white/[0.4] '> Menu</p>
                <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer '>
                    <div className='flex items-center gap-[10px]'>
                        <FaDollarSign color='white' /> <p className='text-[14px] leading-[20px] font-normal text-white'>Transaction</p>
                    </div>
                </div>
                <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
                    <div className='flex items-center gap-[10px]'>
                        <FaMapMarkerAlt color='white' /> <p className='text-[14px] leading-[20px] font-normal text-white'>Place</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar