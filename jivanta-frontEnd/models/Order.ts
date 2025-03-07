import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    id: String,
    doctorId: String,
    items: [
      {
        medicineId: String,
        name: String,
        quantity: Number,
        price: Number
      }
    ],
    totalAmount: Number,
    status: {
      type: String,
      enum: ['processing', 'shipped', 'delivered', 'cancelled'],
      default: 'processing'
    },
    paymentMethod: {
      type: String,
      enum: ['online', 'cod'],
      default: 'online'
    },
    orderDate: Date,
    deliveryDate: Date,
    shippingAddress: {
      clinic: String,
      street: String,
      city: String,
      state: String,
      pincode: String
    }
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);