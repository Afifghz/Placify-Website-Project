import React from 'react'
import Sidebar from '../Fragments/Sidebar'
import Crud from '../Fragments/Crud'

const Dashboard = () => {
  return (
    <div className="flex">
        <div className="basis-[12%] h-[100vh]">
            <Sidebar />
        </div>
        <div className="basis-[88%] ">
            <Crud />
        </div>
    </div>
  )
}

export default Dashboard 