import mongoose from "mongoose";

const PublicationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: Object,
    required: true
  },
  code:{
    type:String,
    require:true
  },
  published:{
    type:Boolean,
    default:false
  }
}, {
  timestamps: true
});

export default mongoose.model("Publication", PublicationSchema);
