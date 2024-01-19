import LayoutAdmin from "../components/LayoutAdmin";
import { useEffect, useState } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom"; 

const ProductAll = () => {

  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/products');
      setProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleUpdate = (productId) => {
    setSelectedProductId(productId);
    navigate(`/productedit/${productId}`);
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:3001/products/${productId}`);
      
      // Assuming you have a function to refetch the updated product list
      window.location.reload()

      // Optional: You can display a success message or perform additional actions
      console.log(`Product with ID ${productId} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting product with ID ${productId}:`, error);
    }
  };

  return (
    <LayoutAdmin>
      <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
        <section className="p-8 ">
          <h1 className="pb-3 font-semibold text-xl text-gray-900">Data Products</h1>
          <table className="min-w-full border bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Nama Tempat</th>
                <th className="py-2 px-4">Gambar</th>
                <th className="py-2 px-4">Lokasi</th>
                <th className="py-2 px-4">Harga</th>
                <th className="py-2 px-4">Wifi</th>
                <th className="py-2 px-4">Musola</th>
                <th className="py-2 px-4">Sound System</th>
                <th className="py-2 px-4">AC</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="text-center text-black">
            {products.map((product, index) => (
              <tr key={index}>
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{product.name}</td>
                <td className="py-2 px-4"><img src={product.image} alt="Product" className="max-w-full h-auto" /></td>
                <td className="py-2 px-4">{product.location}</td>
                <td className="py-2 px-4">{product.price}</td>
                <td className="py-2 px-4">{product.hasWifi ? "Yes" : "No"}</td>
                <td className="py-2 px-4">{product.hasMusholla ? "Yes" : "No"}</td>
                <td className="py-2 px-4">{product.hasSoundSystem ? "Yes" : "No"}</td>
                <td className="py-2 px-4">{product.hasAC ? "Yes" : "No"}</td>
                <td className="py-2 px-4">
                  <button onClick={() => handleUpdate(product._id)}>
                    <FontAwesomeIcon icon={faEdit} className="text-blue-500 cursor-pointer hover:text-blue-700" />
                  </button>
                  <button onClick={() => handleDelete(product._id)}>
                    <FontAwesomeIcon icon={faTrash} className="text-red-500 cursor-pointer hover:text-red-700" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </section>
      </div>
    </LayoutAdmin>
  );
};

export default ProductAll;
