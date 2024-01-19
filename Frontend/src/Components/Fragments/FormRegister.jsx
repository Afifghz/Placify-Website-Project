import React, { useState } from 'react'
import InputForm from '../Elements/Input/Input'
import Button from '../Elements/Button/Button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const FormRegister = () => {
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [confPassword, setConfPassword] = useState('');
      const [msg, setMsg] = useState('');
      const navigate = useNavigate()

      const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/register', {
          name: name,
          email: email,
          password: password,
        })
        .then(result => {
          navigate('/login')
        })
        .catch(err => console.log(error))
        // if (!name || !email || !password || !confPassword) {
        //   setMsg('Semua data harus diisi');
        //   return; // Stop further execution if any field is empty
        // }
    
        // try {
        //   await axios.post('http://localhost:5000/users', {
        //     name: name,
        //     email: email,
        //     password: password,
        //     confPassword: confPassword
        //   });
        //   setMsg('Pendaftaran berhasil');
        //   window.location.href = '/login';
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
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
        />
        <InputForm
              type="email"
              placeholder="John@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
        />
        <InputForm
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
        />
        <InputForm
              type="password"
              placeholder="********"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
        />
        <p className='text-red-500'>{msg}</p>
        <Button className="mt-7">Daftar</Button>        
      </form>

    </>
  )
}

export default FormRegister