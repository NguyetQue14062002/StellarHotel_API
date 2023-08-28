import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
        },
        orderId: {
            type: String,
        },
        amount: {
            type: Number,
        },
        bankCode: {
            type: String,
        },
        dateCreted: {
            type: String,
        },
        status: {
            type: Number,
            default: 0,
        },
    }
);  
export default mongoose.model('Payments', paymentSchema);