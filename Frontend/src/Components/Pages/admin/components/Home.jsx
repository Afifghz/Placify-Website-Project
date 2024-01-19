
import { faMoneyBill, faBan, faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Chart from "react-apexcharts";

const HomeAdmin = () => {
  const [users, setUsers] = useState([]);
  const [transaksi, settransactions] = useState([]);
  const [ttransaksi, setttransactions] = useState([]);
  const [bar, setbar] = useState([]);
  const [produk, setproducts] = useState([]);

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

  useEffect(() => {
    gettransactions();
  }, []);

  // const gettransactions = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:3001/transactionsga');
  //     const transactions = response.data;
  //     setttransactions(transactions)
  
  //     console.log('Raw transactions:', transactions);
  
  //     const productQuantities = {};
  
  //     transactions.forEach(transaction => {
  //       const productId = transaction.products_id;
  //       const quantity = 1;
  
  //       if (!productQuantities[productId]) {
  //         productQuantities[productId] = 0;
  //       }
  
  //       productQuantities[productId] += quantity;
  //     });
  
  //     console.log('Product quantities:', productQuantities);
  
  //     const aggregatedTransactions = produk.map(product => ({
  //       ...product,
  //       totalQuantity: productQuantities[product._id] || 0,
  //     }));
  
  //     console.log('Aggregated transactions:', aggregatedTransactions);
  
  //     settransactions(aggregatedTransactions);
  
  //     console.log('Updated transactions state:', aggregatedTransactions);
  //   } catch (error) {
  //     console.error('Error fetching transactions:', error);
  //   }
  // };
  
  const gettransactions = async () => {
    try {
      const response = await axios.get('http://localhost:3001/transactionsga');
      const transactions = response.data;
      setttransactions(transactions);
  
      console.log('Raw transactions:', transactions);
  
      // Create an array of all product IDs
      const productIds = produk.map(product => product._id);
  
      // Initialize productQuantities with default values of 0 for each product ID
      const productQuantities = Object.fromEntries(productIds.map(id => [id, 0]));
  
      // Calculate total quantity for each product
      transactions.forEach(transaction => {
        const productId = transaction.products_id;
        const quantity = 1;
  
        if (productQuantities.hasOwnProperty(productId)) {
          productQuantities[productId] += quantity;
        }
      });
  
      console.log('Product quantities:', productQuantities);
      setbar(productQuantities);
  
      const combinedData = produk.map(product => {
        const matchingTransaction = transactions.find(t => t._id === product._id);
        return {
          ...product,
          transaction: matchingTransaction || null,
        };
      });
  
      const aggregatedTransactions = combinedData.map(item => ({
        ...item,
        totalQuantity: productQuantities[item._id] || 0,
      }));
  
      console.log('Aggregated transactions:', aggregatedTransactions);
  
      settransactions(aggregatedTransactions);
  
      console.log('Updated transactions state:', aggregatedTransactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };
  

  console.log("dataisi", transaksi)
  console.log("bar", bar)

  useEffect(() => {
    getproducts();
  }, []);

  const getproducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/products');
      setproducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  

//   const[product, setProduct]= useState(
//     [
//         {
//             name:"T-shirt",
//             data:[1]
//         },
//         {
//           name:"Shirt",
//           data:[2]
//         },
//         {
//           name:"Jeans",
//           data:[0]
//         }
//     ]
// );

// const[option, setOption]= useState(
//     {
//         title:{ text:`Product sell in ${new Date().getFullYear()}`},
//         xaxis:{
//             title:{text:"Product Sell in Months"},
//             categories:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
//         },
//         yaxis:{
//             title:{text:"Product"}                 
//         }

//     }
// );
  

    return(
        <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
          <div className="bg-blue-400 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-300  text-white font-medium group">
            <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
            <FontAwesomeIcon icon={faUser} className="w-5 h-5 bg-slate-600" />
            </div>
            <div className="text-right">
              <p className="text-2xl">{users.length}</p>
              <p>Customers</p>
            </div>
          </div>
          <div className="bg-blue-400 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-300  text-white font-medium group">
            <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
            <FontAwesomeIcon icon={faMoneyBill} className="w-5 h-5 bg-slate-600" />
            </div>
            <div className="text-right">
              <p className="text-2xl">{ttransaksi.length}</p>
              <p>Transcations</p>
            </div>
          </div>
          <div className="bg-blue-400  shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-300  text-white font-medium group">
            <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
            <FontAwesomeIcon icon={faBan} className="w-5 h-5 bg-slate-600" />
           
            </div>
            <div className="text-right">
              <p className="text-2xl">{produk.length}</p>
              <p>Products</p>
            </div>
          </div>
          
        </div>
        <div className="flex">
        <Chart
          type="bar"
          width={500}
          height={400}
          series={[
            {
              name: "TOP 5 Tempat Terlaris",
              data: produk.slice(0, 5).map(product => bar[product._id] || 0),
            },
          ]}
          options={{
            colors: ["#800080", "#800080", "#800080", "#800080", "#800080"], // Ganti warna menjadi ungu
            theme: { mode: "light" },

            xaxis: {
              tickPlacement: "on",
              categories: produk.slice(0, 5).map((product) => product.name),

              title: {
                text: "TOP 5 Tempat Terlaris",
                style: { color: "#800080", fontSize: 15 },
              },
            },

            yaxis: {
              labels: {
                formatter: (val) => {
                  return `${val}`;
                },
                style: { fontSize: "15", colors: ["#800080"] },
              },
              title: {
                text: "Pemesanan Total",
                style: { color: "#800080", fontSize: 15 },
              },
            },

            legend: {
              show: true,
              position: "right",
            },

            dataLabels: {
              formatter: (val) => {
                return `${val}`;
              },
              style: {
                colors: ["#f4f4f4"],
                fontSize: 15,
              },
            },
          }}
        ></Chart>

        <Chart
          type="line"
          width={500}
          height={400}
          series={produk.slice(0, 5).map(product => ({
            name: product.name,
            data: ttransaksi
              .filter(t => t.products_id === product._id)
              .map(t => t.tanggal_pemakaian),
          }))}
          options={{
            title: { text: `Product sell in ${new Date().getFullYear()}` },
            xaxis: {
              title: { text: "Product Sell in Months" },
              categories: [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
              ],
            },
            yaxis: {
              title: { text: "Product" },
            },
          }}
        ></Chart>
        </div>
      </div>
    );
}

export default HomeAdmin