import LayoutAdmin from "../components/LayoutAdmin";
import { useEffect, useState } from "react";
import axios from 'axios';

const TransactionAll = () => {
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    getTransaction();
  }, []);

  const getTransaction = async () => {
    try {
      const response = await axios.get('http://localhost:3001/transactionsga');
      setTransaction(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };


  const handleAccept = async (transactionId) => {
    try {
      // Make an API request to update the transaction status to "Success"
      await axios.put(`http://localhost:3001/transactions/${transactionId}`, {
        status: "Success",
      });

      getTransaction();

      console.log(`Accepted transaction with ID ${transactionId}`);
    } catch (error) {
      console.error(`Error accepting transaction with ID ${transactionId}:`, error);
    }
  };

  const handleDecline = async (transactionId) => {
    try {
      // Make an API request to update the transaction status to "Declined"
      await axios.put(`http://localhost:3001/transactions/${transactionId}`, {
        status: "Declined",
      });

      getTransaction();

      console.log(`Declined transaction with ID ${transactionId}`);
    } catch (error) {
      console.error(`Error declining transaction with ID ${transactionId}:`, error);
    }
  };

  return (
    <LayoutAdmin>
      <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
        <section className="p-8 ">
          <h1 className="pb-3 font-semibold text-xl text-gray-900">Transaction List</h1>
  
          <table className="min-w-full border bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">No Pesanan</th>
                <th className="py-2 px-4">Nama Lengkap</th>
                <th className="py-2 px-4">No HP</th>
                <th className="py-2 px-4">Jumlah Tamu</th>
                <th className="py-2 px-4">Start</th>
                <th className="py-2 px-4">End</th>
                <th className="py-2 px-4">Pesan</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="justify-center text-gray-900">
              {transaction.map((user, index) => (
                <tr key={index}>
                 <td className="py-2 px-4 text-center">{index + 1}</td>
                <td className="py-2 px-4 text-center">{user.no_pesanan}</td>
                <td className="py-2 px-4 text-center">{user.nama_lengkap}</td>
                <td className="py-2 px-4 text-center">{user.no_hp}</td>
                <td className="py-2 px-4 text-center">{user.jumlah_tamu}</td>
                <td className="py-2 px-4 text-center">{user.waktu_awal}</td>
                <td className="py-2 px-4 text-center">{user.waktu_akhir}</td>
                <td className="py-2 px-4 text-center">{user.tambahan}</td>
                <td className="py-2 px-4 text-center">
                    {user.status === 'processed' ? (
                      <>
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
                          onClick={() => handleAccept(user._id)}
                        >
                          Accept
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleDecline(user._id)}
                        >
                          Decline
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-600">{user.status}</span>
                    )}
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

export default TransactionAll;
