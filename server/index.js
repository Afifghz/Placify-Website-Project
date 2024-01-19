const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UsersModel = require('./models/Users');
const ProductsModel = require('./models/Products');
const TransactionsModel = require('./models/Transaction');
const cookieParser = require('cookie-parser');
const multer = require('multer');

const app = express();
app.use(cors(
    {
        origin: 'http://localhost:5173',
        methods: ['POST','GET', 'PUT', 'DELETE'],
        credentials: true
    }
));
app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/users');

// const storage = multer.diskStorage({
//   destination: 'upload/',
//   filename: (req, file, cb) => {
//       cb(null, file.originalname);
//   }
// });
// const upload = multer({
//   storage: storage,
//   limits: {
//       fileSize: 1024 * 1024 * 5, // Set a limit, e.g., 5 MB
//   },
// });

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}

// Middleware to check if the request has a valid JWT
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
  
    if (!token) {
      return res.sendStatus(401);
    }
  
    jwt.verify(token, 'jwt-secret-key', (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
  
      req.user = user;
      next();
    });
};
  
  // Example route to get user data
  app.get('/getUserData', authenticateToken, (req, res) => {
    // Assuming the user information is stored in req.user after the authentication middleware
    const { email } = req.user;
  
    UsersModel.findOne({ email })
      .then(user => {
        if (user) {
          res.json({
            displayName: user.name,
            email: user.email,
            role: user.role
          });
        } else {
          res.status(404).json({
            message: 'User not found'
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
  
  app.post('/logout', (req, res) => {
    res.clearCookie('token').sendStatus(200);
  });


  app.post('/register', async (req, res) => {
    try {
        const { name, email } = req.body;

        // Hash the password asynchronously using bcrypt.hash()
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(req.body.password, salt);

        // Create a new user in the database
        await UsersModel.create({
            name,
            email,
            password: passwordHash
        });

        // Respond with success message
        res.json({
            status: 'Success',
            message: 'User registered successfully'
        });
    } catch (error) {
        // Handle errors during registration
        console.error('Error during registration:', error);

        // Check for duplicate key error (unique constraint on email)
        if (error.code === 11000) {
            return res.status(400).json({
                error: 'Email is already registered'
            });
        }

        // For other errors, respond with a generic error message
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});



app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await UsersModel.findOne({ email });

      if (!user) {
          return res.status(404).json({
              message: 'User not found'
          });
      }

      bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
              const token = jwt.sign({ email: user.email, role: user.role },
                  'jwt-secret-key', { expiresIn: '1d' });
              res.cookie('token', token);
              return res.json({
                  Status: 'Success',
                  role: user.role,
                  displayName: user.name
              });
          } else {
              return res.json({
                  message: 'Password is incorrect'
              });
          }
      });
  } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({
          error: 'Internal Server Error'
      });
  }
});


app.get('/users', (req, res) => {
    // Retrieve products from the database using the ProductsModel
    UsersModel.find({})
      .then(products => {
        res.json(products);
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });


// app.get('/products', (req, res) => {
//     // Retrieve products from the database using the ProductsModel
//     ProductsModel.find({})
//       .then(products => {
//         res.json(products);
//       })
//       .catch(err => {
//         res.status(500).json({
//           error: err
//         });
//       });
//   });
  
  
  app.post('/products', authenticateToken,  async (req, res) => {
    try {
        const { name, image, location, price, capacity, hasWifi, hasMusholla, hasSoundSystem, hasAC } = req.body;

        // // Check if an image is uploaded
        // if (!req.file) {
        //     return res.status(400).json({
        //         error: 'No image uploaded'
        //     });
        // }

        // Access the uploaded image data from req.file.buffer
        // const imageData = req.file.buffer;

        // Create a new product in the database with the image data
        const newProduct = await ProductsModel.create({
            name,
            image,
            location,
            price,
            capacity,
            hasWifi,
            hasMusholla,
            hasSoundSystem,
            hasAC
        });

        // Respond with the newly created product
        res.json({
            status: 'Success',
            message: 'Product created successfully',
            product: newProduct
        });
    } catch (error) {
        // Handle errors during product creation
        console.error('Error creating product:', error);

        // Respond with a generic error message
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});

app.put('/products/:id', async (req, res) => {
  try {
      const { id } = req.params;

      // Validate if the provided ID is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ message: 'Invalid product ID' });
      }

      const updatedProduct = await ProductsModel.findByIdAndUpdate(
          id,
          req.body,
          { new: true, runValidators: true }
      );

      if (!updatedProduct) {
          return res.status(404).json({ message: 'Product not found' });
      }

      // Respond with the updated product
      res.json({
          status: 'Success',
          message: 'Product updated successfully',
          product: updatedProduct
      });
  } catch (error) {
      // Handle errors during product update
      console.error('Error updating product:', error);

      // Respond with a generic error message
      res.status(500).json({
          error: 'Internal Server Error'
      });
  }
});

app.delete('/products/:id', async (req, res) => {
  try {
      const { id } = req.params;

      // Validate if the provided ID is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ message: 'Invalid product ID' });
      }

      const deletedProduct = await ProductsModel.findByIdAndDelete(id);

      if (!deletedProduct) {
          return res.status(404).json({ message: 'Product not found' });
      }

      // Respond with the deleted product
      res.json({
          status: 'Success',
          message: 'Product deleted successfully',
          product: deletedProduct
      });
  } catch (error) {
      // Handle errors during product deletion
      console.error('Error deleting product:', error);

      // Respond with a generic error message
      res.status(500).json({
          error: 'Internal Server Error'
      });
  }
});

  
  app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Validate if the provided ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }

        // Use findById to retrieve the document by ID
        const product = await ProductsModel.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
  
app.post('/transactions', authenticateToken, async (req, res) => {
  try {
      const { products_id, nama_lengkap, no_hp, jumlah_tamu, tanggal_pemakaian, waktu_awal, waktu_akhir, tambahan, total } = req.body;

      // Mendapatkan ID pengguna dari token yang diotorisasi
      const { email } = req.user;
      const user = await UsersModel.findOne({ email });

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      const no_pesanan = generateRandomString(6);

      // Membuat transaksi baru dengan ID pengguna yang ditemukan
      const newTransaction = await TransactionsModel.create({
          user_id: user._id,
          products_id,
          nama_lengkap,
          no_hp,
          jumlah_tamu,
          tanggal_pemakaian,
          waktu_awal,
          waktu_akhir,
          tambahan,
          total,
          no_pesanan
      });

      res.json({
          status: 'Success',
          message: 'Transaction created successfully',
          transaction: newTransaction
      });
  } catch (error) {
      console.error('Error creating transaction:', error);
      res.status(500).json({
          error: 'Internal Server Error'
      });
  }
});

// Rute untuk mendapatkan semua transaksi berdasarlam user
app.get('/transactions', authenticateToken, async (req, res) => {
  try {
      const { email } = req.user;
      const user = await UsersModel.findOne({ email });

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      const transactions = await TransactionsModel.find({ user_id: user._id });
      res.json(transactions);
  } catch (error) {
      console.error('Error fetching transactions:', error);
      res.status(500).json({
          error: 'Internal Server Error'
      });
  }
});

// Rute untuk mendapatkan semua transaksi 
app.get('/transactionsga', authenticateToken, async (req, res) => {
    try {

        const transactions = await TransactionsModel.find({  });
        res.json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
  });

// Rute untuk mendapatkan detail transaksi berdasarkan ID
app.get('/transactions/:id', authenticateToken, async (req, res) => {
  try {
      const { id } = req.params;
      const { email } = req.user;
      const user = await UsersModel.findOne({ email });

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      const transaction = await TransactionsModel.findOne({ _id: id, user_id: user._id });

      if (!transaction) {
          return res.status(404).json({ message: 'Transaction not found' });
      }

      res.json(transaction);
  } catch (error) {
      console.error('Error fetching transaction details:', error);
      res.status(500).json({
          error: 'Internal Server Error'
      });
  }
});

// Rute untuk memperbarui transaksi berdasarkan ID
// app.put('/transactions/:id', authenticateToken, async (req, res) => {
//   try {
//       const { id } = req.params;
//       const { email } = req.user;
//       const user = await UsersModel.findOne({ email });

//       if (!user) {
//           return res.status(404).json({ message: 'User not found' });
//       }
//       const updatedTransaction = await TransactionsModel.findOneAndUpdate(
//           { _id: id, user_id: user._id },
//           { status: 'dibatalkan' },
//           { new: true, runValidators: true }
//       );

//       if (!updatedTransaction) {
//           return res.status(404).json({ message: 'Transaction not found' });
//       }

//       res.json({
//           status: 'Success',
//           message: 'Transaction updated successfully',
//           transaction: updatedTransaction
//       });
//   } catch (error) {
//       console.error('Error updating transaction:', error);
//       res.status(500).json({
//           error: 'Internal Server Error'
//       });
//   }
// });

app.put('/transactions/:id', authenticateToken, async (req, res) => {
    try {
      const { id } = req.params;
    //   const { email } = req.user;
    //   const user = await UsersModel.findOne({ email });
  
    //   if (!user) {
    //     return res.status(404).json({ message: 'User not found' });
    //   }
  
      // Assuming your request body contains the fields you want to update
      const { status, tipe_pembayaran, cancellationReason } = req.body;
  
      // Modify the update query based on the fields you want to update
      const updateFields = {};
      if (status) {
        updateFields.status = status;
      }
      if (tipe_pembayaran) {
        updateFields.tipe_pembayaran = tipe_pembayaran;
      }
      if (cancellationReason) {
        updateFields.cancellationReason = cancellationReason;
      }
  
      const updatedTransaction = await TransactionsModel.findOneAndUpdate(
        { _id: id},
        updateFields, // Use the updateFields object to dynamically update fields
        { new: true, runValidators: true }
      );
  
      if (!updatedTransaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }
  
      res.json({
        status: 'Success',
        message: 'Transaction updated successfully',
        transaction: updatedTransaction
      });
    } catch (error) {
      console.error('Error updating transaction:', error);
      res.status(500).json({
        error: 'Internal Server Error'
      });
    }
  });
  

// Rute untuk menghapus transaksi berdasarkan ID
app.delete('/transactions/:id', authenticateToken, async (req, res) => {
  try {
      const { id } = req.params;
      const { email } = req.user;
      const user = await UsersModel.findOne({ email });

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      const deletedTransaction = await TransactionsModel.findOneAndDelete({ _id: id, user_id: user._id });

      if (!deletedTransaction) {
          return res.status(404).json({ message: 'Transaction not found' });
      }

      res.json({
          status: 'Success',
          message: 'Transaction deleted successfully',
          transaction: deletedTransaction
      });
  } catch (error) {
      console.error('Error deleting transaction:', error);
      res.status(500).json({
          error: 'Internal Server Error'
      });
  }
});

// app.get('/api/products', async (req, res) => {
//     try {
//       const { location, sortBy } = req.query;
  
//       let filter = {};
//       if (location) {
//         filter.location = location;
//       }
  
//       let sort = {};
//       if (sortBy) {
//         sort = { price: sortBy === 'asc' ? 1 : -1 };
//       }
  
//       const products = await ProductsModel.find(filter).sort(sort);
  
//       res.json(products);
//     } catch (error) {
//       console.error('Error fetching products', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });


app.get('/products', async (req, res) => {
    try {
      const { location, sortBy, capacitysort } = req.query;
  
      let filter = {};
      if (location) {
        filter.location = location;
      }
  
      let sort = {};
      if (sortBy) {
        if (sortBy === 'asc') {
          sort.price = 1;
        } else if (sortBy === 'desc') {
          sort.price = -1;
        }
      }
  
      if (capacitysort) {
        if (capacitysort === 'asc') {
          sort.capacity = 1;
        } else if (capacitysort === 'desc') {
          sort.capacity = -1;
        }
      }
  
      const products = await ProductsModel.find(filter).sort(sort);
  
      res.json(products);
    } catch (error) {
      console.error('Error fetching products', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.listen(3001, () => console.log('Server is running'));