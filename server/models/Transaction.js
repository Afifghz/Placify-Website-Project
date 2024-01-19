const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Mengacu pada model User jika diperlukan
        required: true
    },
    products_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products', // Mengacu pada model User jika diperlukan
        required: true
    },
    nama_lengkap: {
        type: String,
        required: true
    },
    no_hp: {
        type: String,
        required: true
    },
    jumlah_tamu: {
        type: Number,
        required: true
    },
    tanggal_pemakaian: {
        type: Date,
        required: true
    },
    waktu_awal: {
        type: String,
        required: true
    },
    waktu_akhir: {
        type: String,
        required: true
    },
    tambahan: {
        type: String
        // Sesuaikan dengan jenis data yang dibutuhkan untuk tambahan, bisa String atau jenis data lain
    },
    no_pesanan: {
        type: String,
        required: true,
        unique: true // Pastikan setiap nomor pesanan unik
    },
    total: {
        type: String,
    },
    tipe_pembayaran: {
        type: String,
    },
    status: {
        type: String,
        default: 'sukses'
    },
    cancellationReason: {
        type: String,
    }
});

const TransactionModel = mongoose.model('Transaction', transactionSchema);

module.exports = TransactionModel;
