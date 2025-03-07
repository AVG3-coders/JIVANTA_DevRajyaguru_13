import mongoose from 'mongoose';

const MedicineSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    genericName: String,
    brand: String,
    price: Number,
    category: String,
    prescription: Boolean,
    activeIngredients: String,
    description: String,
    images: [String],
    dosage: String,
    usage: String,
    storage: String,
    warnings: String,
    sideEffects: String,
    interactions: String,
    stock: Number,
    supplierId: String,
    rating: Number,
    sales: Number
  },
  { timestamps: true }
);

// Check if the model is already defined to prevent overwriting during hot reloads
export default mongoose.models.Medicine || mongoose.model('Medicine', MedicineSchema);