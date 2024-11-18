import mongoose from "mongoose";


const VoteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  voteDate: { type: Date, default: null },
  isActive: { type: Boolean, default: false },
  favor: { type: Number, default: 0 },
  contra: { type: Number, default: 0 },
  voters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }],
  publication: { type: mongoose.Schema.Types.ObjectId, ref: 'Publication', required: true } 
},
{
  timestamps: true,
});

export default mongoose.model("Voto", VoteSchema);