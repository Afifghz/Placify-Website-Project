import React from 'react'

const Input = (props) => {
  const { type, placeholder, value, onChange, label } = props;
  if (type === 'dropdown') {
    // Jika tipe dropdown, tampilkan elemen dropdown
    return (
      <select defaultValue=" " className="w-[100%] border-2 border-gray-300 rounded-md p-2 body2-regular placeholder-gray-300 text-gray-900 focus:border-purple-500 focus:outline-none">
         <option value="" disabled hidden>Pilih Jenis Kelamin</option>
        <option value="option1" className='body1-regular'>Laki-Laki</option>
        <option value="option2" className='body1-regular'>Perempuan</option>
      </select>
    );
  }
  return (
    <input 
    type={type} 
    className="w-[100%] border-2 border-gray-300 rounded-md p-2 body2-regular placeholder-gray-300 text-gray-900 focus:border-purple-500 focus:outline-none" 
    placeholder = {placeholder}
    onChange = {onChange}
    value = {value}
    label = {label}
    />
  )
}

export default Input