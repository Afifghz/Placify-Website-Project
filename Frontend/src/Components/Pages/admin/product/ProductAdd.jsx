import LayoutAdmin from "../components/LayoutAdmin";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const ProductAdd = () => {
  
  const navigate = useNavigate();
  const [nama, setNama] = useState('');
  const [tempat, setTempat] = useState('');
  const [image, setImage] = useState('');  
  const [harga, setHarga] = useState('');
  const [capacity, setcapacity] = useState('');
  const [wifi, setWifi] = useState(false); 
  const [musola, setMusola] = useState(false); 
  const [soundistem, setsoundistem] = useState(false); 
  const [ac, setac] = useState(false); 

  const handleTitleChange = (e) => {
    setNama(e.target.value);
  };

  const handleContentChange = (e) => {
    setTempat(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);

  };

  const handlehargaChange = (e) => {
    setHarga(e.target.value);
  };

  const handlecapacityChange = (e) => {
    setcapacity(e.target.value);
  };

  const handleWifiChange = (e) => {
    setWifi(e.target.checked);
  };
  const handlemusolaChange = (e) => {
    setMusola(e.target.checked);
  };
  
  const handlessChange = (e) => {
    setsoundistem(e.target.checked);
  };
  const handleacChange = (e) => {
    setac(e.target.checked);
  };


  const handleSubmit = async () => {
    try {
      // Prepare the data as an object
      const requestData = {
        name: nama,
        image,
        location: tempat,
        price: harga,
        capacity,
        hasWifi: wifi,
        hasMusholla: musola,
        hasSoundSystem: soundistem,
        hasAC: ac,
      };
  
      // Replace 'http://localhost:3001/products' with your actual API endpoint
      const response = await axios.post('http://localhost:3001/products', requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        // Assuming you want to reset the form after successful submission
        setNama('');
        setImage('');
        setTempat('');
        setHarga('');
        setcapacity('');
        setWifi(false);
        setMusola(false);
        setsoundistem(false);
        setac(false);
  
        console.log('Product added successfully');

        navigate('/productall')
      } else {
        console.error('Error adding product:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
  
  
  


    return (
      <LayoutAdmin>
        <div className="h-full ml-14 mt-14 mb-10 md:ml-64">

          <section className="p-8 ">
            <h1 className="pb-3 font-semibold text-xl text-gray-900">Add Products</h1>
            <form className="border-2 border-gray-600 p-8">
              <div className="mb-4">
                <label htmlFor="nama_tempat" className="block text-gray-700 text-sm font-bold mb-2">
                  Nama Tempat
                </label>
                <input
                  type="text"
                  id="nama_tempat"
                  name="nama_tempat"
                  value={nama}
                  onChange={handleTitleChange}
                  className="text-gray-900 border rounded-md py-2 px-3 w-full focus:outline-none focus:shadow-outline"
                />
              </div>
  
              <div className="mb-4">
                <label htmlFor="tempat" className="block text-gray-700 text-sm font-bold mb-2">
                  Tempat
                </label>
                <textarea
                  id="tempat"
                  name="tempat"
                  value={tempat}
                  onChange={handleContentChange}
                  className="text-gray-900 border rounded-md py-2 px-3 w-full h-32 focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
                  Image
                </label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  className="text-gray-900 border rounded-md py-2 px-3 w-full focus:outline-none focus:shadow-outline"
                />

              </div>
              <div className="mb-4">
                <label htmlFor="harga" className="block text-gray-700 text-sm font-bold mb-2">
                  Harga
                </label>
                <input
                  type="text"
                  id="harga"
                  name="harga"
                  onChange={handlehargaChange}
                  className="text-gray-900 border rounded-md py-2 px-3 w-full focus:outline-none focus:shadow-outline"
                />

              </div>

              <div className="mb-4">
                <label htmlFor="capacity" className="block text-gray-700 text-sm font-bold mb-2">
                Kapasitas Maksimal
                </label>
                <input
                  type="text"
                  id="capacity"
                  name="capacity"
                  onChange={handlecapacityChange}
                  className="text-gray-900 border rounded-md py-2 px-3 w-full focus:outline-none focus:shadow-outline"
                />

              </div>

                            
              <div className="flex items-center mb-4">
                <label htmlFor="wifi" className="block text-gray-700 text-sm font-bold mr-2">
                  Wifi
                </label>
                <input
                  type="checkbox"
                  id="wifi"
                  name="wifi"
                  checked={wifi}
                  onChange={handleWifiChange}
                />

                <label htmlFor="musola" className="block text-gray-700 text-sm font-bold ml-4 mr-2">
                  Mushola
                </label>
                <input
                  type="checkbox"
                  id="musola"
                  name="musola"
                  checked={musola}
                  onChange={handlemusolaChange}
                />

                <label htmlFor="soundsistem" className="block text-gray-700 text-sm font-bold ml-4 mr-2">
                  Sound System
                </label>
                <input
                  type="checkbox"
                  id="soundsistem"
                  name="soundsistem"
                  checked={soundistem}
                  onChange={handlessChange}
                />

                <label htmlFor="ac" className="block text-gray-700 text-sm font-bold ml-4">
                  AC
                </label>
                <input
                  type="checkbox"
                  id="ac"
                  name="ac"
                  checked={ac}
                  onChange={handleacChange}
                />
              </div>
              <br />
  
              <button
                type="button"
                onClick={handleSubmit}
                className="rounded-sm px-4 py-2 bg-blue-700 hover:bg-blue-500 text-white focus:outline-none focus:shadow-outline"
              >
                Add Products
              </button>
            </form>
          </section>
        </div>
      </LayoutAdmin>
    );
  };
  
  export default ProductAdd;