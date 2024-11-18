import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  votes: [{
    votoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Voto' },
    option: { type: String, enum: ['favor', 'contra'], required: true },
    voteDate: { type: Date, default: Date.now }
  }]
},
{
  timestamps: true,
});

export default mongoose.model("Usuario", UsuarioSchema);