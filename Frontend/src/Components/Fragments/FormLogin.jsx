import React, { useState } from 'react'
import InputForm from '../Elements/Input/Input'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Button from '../Elements/Button/Button'

const FormLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login', {
          email: email,
          password: password,
        })
        .then(res => {
          if (res.data.Status === "Success") {
            if (res.data.role === "admin") {
              navigate('/dashboard')
            }else{
              navigate('/beranda')
            }
          }
        })
        .catch(err => console.log(error))
        // if (!email || !password) {
        //   setMsg('Semua data harus diisi');
        //   return; // Stop further execution if any field is empty
        // }
    
        // try {
        //   await axios.post('http://localhost:5000/login', {
        //     email: email,
        //     password: password,
        //   });
        //   window.location.href = '/beranda';
        // } catch (error) {
        //   if (error.response) {
        //     setMsg(error.response.data.msg);
        //   }
        // }
      }
  return (
    <>
         <form onSubmit={handleSubmit} className='w-3/4 flex flex-col gap-3 mt-4'>
            <InputForm
                type="email"
                placeholder="John@example.com"
                onChange={(e) => setEmail(e.target.value)}
            />
            <InputForm
                type="password"
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
            />
            <div className='text-end'>
                <span
                    className='body2-regular text-[#8C2AC8] cursor-pointer'
                    style={{
                    display: 'inline-block'
                    }}
                >
                    Lupa kata sandi?
                </span>
            </div>
            <p className='text-red-500'>{msg}</p>
            <div className='mt-3'>
            <Button>Masuk</Button>        
            </div>
         </form>
    </>
  )
}

export default FormLogin