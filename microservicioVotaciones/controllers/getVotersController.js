import Voto from "../models/voteSchema.js";

export const getVotersController = async (req, res) => {
  const { id } = req.params;

  try {
    const voto = await Voto.findById(id).populate('voters', 'name'); 

    if (!voto) {
      return res.status(404).json({ error: "Votación no encontrada" });
    }

    res.status(200).json(voto.voters); 
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar los votantes' });
  }
};