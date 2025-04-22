// src\models\Shop.ts
import mongoose from 'mongoose';

const shopSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
    index: true,
  },
  description: {
    type: String,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    index: true,
  },
  buttonText: {
    type: String,
    default: 'Buy Now',
  },
  url: {
    type: String,
    required: true,
  },
});

const Shop = mongoose.models.Shop || mongoose.model('Shop', shopSchema);

export default Shop;