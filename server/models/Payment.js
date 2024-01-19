const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    transaction_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
        required: true
    },
    metode_pembayaran: {
        type: String,
        required: true
    },
    total_pembayaran: {
        type: Number,
        required: true
    },
    tanggal_pembayaran: {
        type: Date,
        default: Date.now
    }
});

const PaymentModel = mongoose.model('Payment', paymentSchema);

module.exports = PaymentModel;
