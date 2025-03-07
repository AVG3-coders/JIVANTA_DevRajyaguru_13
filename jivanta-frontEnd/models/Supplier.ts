import mongoose from 'mongoose';

const SupplierSchema = new mongoose.Schema(
  {
    id: String,
    companyName: String,
    email: String,
    phone: String,
    registrationNumber: String,
    gstNumber: String,
    drugLicenseNumber: String,
    cdscoNumber: String,
    location: String,
    verified: Boolean,
    joinDate: Date,
    productsListed: Number,
    totalSales: Number
  },
  { timestamps: true }
);

// Check if the model is already defined to prevent overwriting during hot reloads
export default mongoose.models.Supplier || mongoose.model('Supplier', SupplierSchema);