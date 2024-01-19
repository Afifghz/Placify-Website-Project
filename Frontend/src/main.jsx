import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './Components/Pages/Masuk'
import RegisterPage from './Components/Pages/Daftar'
import BerandarPage from './Components/Pages/Beranda'
import BerandarLog from './Components/Pages/BerandaLog'
import JelajahPage from './Components/Pages/Jelajah'
import DtlJelajahPage from './Components/Pages/DetailJelajah'
import FormSewa from './Components/Pages/FormSewa'
import ConfirmOrder from './Components/Pages/ConfirmOrder'
import Order from './Components/Pages/Order'
import Profile1 from './Components/Pages/Profile'
import Profile2 from './Components/Pages/Profile1'
import Profile3 from './Components/Pages/Profile2'
import Profile4 from './Components/Pages/Profile3'
import './index.css'
import Dashboard from './Components/Pages/admin/Dashboard'
import UsersAll from './Components/Pages/admin/users/UsersAll'
import TransactionAll from './Components/Pages/admin/transaksi/TransactionAll'
import ProductAll from './Components/Pages/admin/product/ProductAll'
import ProductAdd from './Components/Pages/admin/product/ProductAdd'
import ProductEdit from './Components/Pages/admin/product/ProductEdit'
import CekPesanan from './Components/Pages/CekPesanan'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage/>
  },
  {
    path: '/register',
    element: <RegisterPage/>
  },
  {
    path: '/',
    element: <BerandarPage/>
  },
  {
    path: '/beranda',
    element: <BerandarLog/>
  },
  {
    path: '/product',
    element: <JelajahPage/>
  },
  {
    path: '/product/:id',
    element: <DtlJelajahPage/>
  },
  {
    path: '/formsewa/:id',
    element: <FormSewa/>
  },
  {
    path: '/konfirmasipesanan',
    element: <ConfirmOrder/>
  },
  {
    path: '/order/:transactionId',
    element: <Order/>
  },
  {
    path: '/cekpesanan/:tid',
    element: <CekPesanan/>
  },
  {
    path: '/profile1',
    element: <Profile1/>
  },
  {
    path: '/profile2',
    element: <Profile2/>
  },
  {
    path: '/profile3',
    element: <Profile3/>
  },
  {
    path: '/profile4',
    element: <Profile4/>
  },
  {
    path: '/dashboard',
    element: <Dashboard/>
  },
  {
    path: '/usersall',
    element: <UsersAll/>
  },
  {
    path: '/productall',
    element: <ProductAll/>
  },
  {
    path: '/productedit/:productId',
    element: <ProductEdit/>
  },
  {
    path: '/productadd',
    element: <ProductAdd/>
  },
  {
    path: '/transaksisall',
    element: <TransactionAll/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
