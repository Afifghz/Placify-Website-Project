import LayoutAdmin from "../components/LayoutAdmin";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductEdit = () => {
  const navigate = useNavigate();
  const { productId } = useParams(); // Get the product ID from the URL params

  // State variables for form fields
  const [nama, setNama] = useState('');
  const [tempat, setTempat] = useState('');
  const [image, setImage] = useState('');
  const [harga, setHarga] = useState('');
  const [capacity, setCapacity] = useState('');
  const [wifi, setWifi] = useState(false);
  const [musola, setMusola] = useState(false);
  const [soundistem, setSoundistem] = useState(false);
  const [ac, setAc] = useState(false);

  useEffect(() => {
    // Fetch the existing product data based on the productId
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/products/${productId}`);
        const productData = response.data;

        console.log(productData)

        // Set the state with the existing product data
        setNama(productData.name);
        setTempat(productData.location);
        setImage(productData.image);
        setHarga(productData.price);
        setCapacity(productData.capacity);
        setWifi(productData.hasWifi);
        setMusola(productData.hasMusholla);
        setSoundistem(productData.hasSoundSystem);
        setAc(productData.hasAC);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, [productId]);


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
    setCapacity(e.target.value);
  };

  const handleWifiChange = (e) => {
    setWifi(e.target.checked);
  };

  const handlemusolaChange = (e) => {
    setMusola(e.target.checked);
  };

  const handlessChange = (e) => {
    setSoundistem(e.target.checked);
  };

  const handleacChange = (e) => {
    setAc(e.target.checked);
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
      const response = await axios.put(`http://localhost:3001/products/${productId}`, requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('Product updated successfully');
        navigate('/productall');
      } else {
        console.error('Error updating product:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

    return (
      <LayoutAdmin>
        <div className="h-full ml-14 mt-14 mb-10 md:ml-64">

          <section className="p-8 ">
            <h1 className="pb-3 font-semibold text-xl text-gray-900">Edit Products</h1>
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
                  value={image}
                  onChange={handleImageChange}
                  className="text-gray-900 border rounded-md py-2 px-3 w-full focus:outline-none focus:shadow-outline"
                />


              {image && (
                  <div className="mt-2">
                    <img src={image} alt="Product" className="max-w-full h-auto" />
                  </div>
                )}

              </div>
              <div className="mb-4">
                <label htmlFor="harga" className="block text-gray-700 text-sm font-bold mb-2">
                  Harga
                </label>
                <input
                  type="text"
                  id="harga"
                  name="harga"
                  value={harga}
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
                  value={capacity}
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
                  value={wifi}
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
                  value={musola}
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
                  value={soundistem}
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
                  value={ac}
                  onChange={handleacChange}
                />
              </div>
              <br />
  
              <button
                type="button"
                onClick={handleSubmit}
                className="rounded-sm px-4 py-2 bg-blue-700 hover:bg-blue-500 text-white focus:outline-none focus:shadow-outline"
              >
                Edit Products
              </button>
            </form>
          </section>
        </div>
      </LayoutAdmin>
    );
  };
  
  export default ProductEdit;