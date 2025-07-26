import mongoose from 'mongoose';

export interface IProduct extends mongoose.Document {
  name: string;
  price: number;
  image: string;
  description: string;
  category: 'grains' | 'vegetables' | 'hotel-items';
  sellerId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['grains', 'vegetables', 'hotel-items'],
    required: true,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);