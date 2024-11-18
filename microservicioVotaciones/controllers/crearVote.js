import Voto from "../models/voteSchema.js";

export const createVoteController = async (req, res) => {
  try {
    const { title,  publicationId } = req.body; // Recibe publicationId
    const newVoto = new Voto({ 
      title, 
      publication: publicationId 
    }); 
    const votoSaved = await newVoto.save();

    res.status(200).json(votoSaved);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el voto." });
  }
};
