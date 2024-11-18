import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Categoría 1', 'Categoría 2', 'Categoría 3', 'Categoría 4']
  },
  direction: {
    type: String,
    required: true,
    trim: true
  },
  responsible: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: Object,
    required: true
  },
  code: {
    type: String, 
    required: true,
    unique: true 
  },
  published:{
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.model('Document', documentSchema);
