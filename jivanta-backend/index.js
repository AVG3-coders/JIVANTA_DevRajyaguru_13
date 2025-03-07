require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Define Schema & Model
const MedicineSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  stock: Number,
});
const Medicine = mongoose.model("Medicine", MedicineSchema);

const SupplierSchema = new mongoose.Schema({
  name: String,
  email: String,
  license: String,
});
const Supplier = mongoose.model("Supplier", SupplierSchema);

// CRUD APIs for Medicines
app.post("/api/medicines", async (req, res) => {
  try {
    const medicine = new Medicine(req.body);
    await medicine.save();
    res.json({ message: "Medicine Added", medicine });
  } catch (error) {
    res.status(500).json({ message: "Error adding medicine", error });
  }
});

app.get("/api/medicines", async (req, res) => {
  const medicines = await Medicine.find();
  res.json(medicines);
});

app.get("/api/medicines/:id", async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }
    res.json(medicine);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving medicine", error });
  }
});

app.put("/api/medicines/:id", async (req, res) => {
  const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json({ message: "Medicine Updated", medicine });
});

app.delete("/api/medicines/:id", async (req, res) => {
  await Medicine.findByIdAndDelete(req.params.id);
  res.json({ message: "Medicine Deleted" });
});

// CRUD APIs for Suppliers
app.post("/api/suppliers", async (req, res) => {
  try {
    const supplier = new Supplier(req.body);
    await supplier.save();
    res.json({ message: "Supplier Added", supplier });
  } catch (error) {
    res.status(500).json({ message: "Error adding supplier", error });
  }
});

app.get("/api/suppliers", async (req, res) => {
  const suppliers = await Supplier.find();
  res.json(suppliers);
});

app.get("/api/suppliers/:id", async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving supplier", error });
  }
});

app.put("/api/suppliers/:id", async (req, res) => {
  const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json({ message: "Supplier Updated", supplier });
});

app.delete("/api/suppliers/:id", async (req, res) => {
  await Supplier.findByIdAndDelete(req.params.id);
  res.json({ message: "Supplier Deleted" });
});

// Start Server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
