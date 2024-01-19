import LayoutAdmin from "../components/LayoutAdmin";
import { useEffect, useState } from "react";
import axios from 'axios';

const UsersAll = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/users');
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <LayoutAdmin>
      <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
        <section className="p-8 ">
          <h1 className="pb-3 font-semibold text-xl text-gray-900">Users List</h1>
  
          <table className="min-w-full border bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Email</th>
                {/* Add more columns as needed */}
              </tr>
            </thead>
            <tbody className="justify-center text-black">
              {users.map((user, index) => (
                <tr key={index}>
                 <td className="py-2 px-4 text-center font-bold text-blue-700">{index + 1}</td>
                <td className="py-2 px-4 text-center">{user.name}</td>
                <td className="py-2 px-4 text-center">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
  
        </section>
      </div>
    </LayoutAdmin>
  );
};

export default UsersAll;
