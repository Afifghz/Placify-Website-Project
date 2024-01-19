import React, { useState, useEffect } from 'react';
import Navbar from '../Elements/NavbarLog';
import Card from '../Fragments/CardProduct';
import Footer from '../Elements/Footer';
import axios from 'axios';

const Jelajah = () => {
  const [minPriceSelected, setMinPriceSelected] = useState(false);
  const [maxPriceSelected, setMaxPriceSelected] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [minCapacitySelected, setMinCapacitySelected] = useState(false);
  const [maxCapacitySelected, setMaxCapacitySelected] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, [minPriceSelected, maxPriceSelected, selectedLocations, minCapacitySelected, maxCapacitySelected]);

  // const getProducts = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:3001/products', {
  //       params: {
  //         location: selectedLocations.join(','),
  //         sortBy: minPriceSelected ? 'asc' : maxPriceSelected ? 'desc' : undefined,
  //         capacitysort: maxCapacitySelected ? 'desc' : minCapacitySelected ? 'asc' : undefined,
  //       },
  //     });

  //     setProducts(response.data);
  //   } catch (error) {
  //     console.error('Error fetching products:', error);
  //   }
  // };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleMinCapacityChange = () => {
    setMinCapacitySelected(!minCapacitySelected);
    setMaxCapacitySelected(false);
  };

  const handleMaxCapacityChange = () => {
    setMaxCapacitySelected(!maxCapacitySelected);
    setMinCapacitySelected(false);
  };

  const handleMinPriceChange = () => {
    setMinPriceSelected(!minPriceSelected);
    setMaxPriceSelected(false);
    getProducts(); // Panggil getProducts setelah perubahan status checkbox
  };

  const handleMaxPriceChange = () => {
    setMaxPriceSelected(!maxPriceSelected);
    setMinPriceSelected(false);
    getProducts(); // Panggil getProducts setelah perubahan status checkbox
  };

  const getProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/products', {
        params: {
          location: selectedLocations.join(','),
          sortBy: minPriceSelected ? 'asc' : maxPriceSelected ? 'desc' : undefined,
          capacitysort: maxCapacitySelected ? 'desc' : minCapacitySelected ? 'asc' : undefined,
        },
      });

      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleLocationChange = (event) => {
    const { id } = event.target;
    setSelectedLocations((prevLocations) => {
      if (prevLocations.includes(id)) {
        return prevLocations.filter((loc) => loc !== id);
      } else {
        return [...prevLocations, id];
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await getProducts(); // Wait for the products to be fetched before logging the event
    console.log(event);
  };
  

  return (
    <>
      <Navbar />
      <div className="w-full flex h-[120vh]">
        <div className="w-1/6 h-full bg-gray-100 shadow-xl p-8">
          <div className="flex flex-col gap-2">
          <form onClick={handleSubmit}>
              <h4 className='text-black mb-2'>Filter</h4>
              <div className='h-[1px] bg-gray-300 mb-2'></div>
              <p className='body1-semibold'>Harga</p>
              <div className="flex">
                <Input id="hargaTerendah" checked={minPriceSelected} onChange={handleMinPriceChange}/>
                <Label id="hargaTerendah" text="Harga Terendah" onClick={handleMinPriceChange}/>
              </div>
              <div className="flex">
                <Input id="hargaTertinggi" checked={maxPriceSelected} onChange={handleMaxPriceChange}/>
                <Label id="hargaTertinggi" text="Harga Tertinggi" onClick={handleMaxPriceChange}/>
              </div>
              
              <p className='body1-semibold'>Kapasitas</p>
              <div className="flex">
                <Input id="kapasitasTerendah" checked={minCapacitySelected} onChange={handleMinCapacityChange}/>
                <Label id="kapasitasTerendah" text="Kapasitas Terendah" onClick={handleMinCapacityChange}/>
              </div>
              <div className="flex">
                <Input id="kapasitasTertinggi" checked={maxCapacitySelected} onChange={handleMaxCapacityChange}/>
                <Label id="kapasitasTertinggi" text="Kapasitas Tertinggi" onClick={handleMaxCapacityChange}/>
              </div>
            </form>
          </div>
        </div>
        <div className="w-5/6 p-8">
          <div className="container mx-auto ">
            <div className="grid grid-cols-4 gap-4">
              {products.map((product) => (
                <Card key={product._id} className="w-full" type="small">
                  <Card.Header image={product.image}></Card.Header>
                  <Card.Body title={product.name} place={product.location} type="small"></Card.Body>
                  <Card.Footer price={formatPrice(product.price)} navigate={`/product/${product._id}`} type="small"></Card.Footer>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const Input = ({id, checked, onChange}) => {
  return (
    <input type="checkbox" id={id} checked={checked} onChange={onChange}/>
  );
};

const Label = ({id, text, onClick}) => {
  return (
    <label htmlFor={id} className='body2-regular ml-2' onClick={onClick}>{text}</label>
  );
};

export default Jelajah;
