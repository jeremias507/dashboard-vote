import Voto from "../models/voteSchema.js";
import Usuario from "../models/usuarioSchema.js";

export const voteController = async (req, res) => {
  const { id } = req.params;
  const { userId, voteType } = req.body;

  try {
    const voto = await Voto.findById(id);
    if (!voto) {
      return res.status(404).json({ error: "Votación no encontrada" });
    }

    if (voto.isActive) {
      const usuario = await Usuario.findById(userId);
      if (!usuario) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      const userVote = usuario.votes.find(vote => vote.votoId.toString() === id);
      if (userVote) {
        return res.status(400).json({ error: "El usuario ya ha votado en esta votación" });
      }

      
      if (voteType === "favor") {
        await Voto.findByIdAndUpdate(id, { $inc: { favor: 1 }, $push: { voters: userId } }, { new: true });
      } else if (voteType === "contra") {
        await Voto.findByIdAndUpdate(id, { $inc: { contra: 1 }, $push: { voters: userId } }, { new: true });
      } else {
        return res.status(400).json({ error: "Tipo de voto inválido" });
      }

      await Usuario.findByIdAndUpdate(userId, { $push: { votes: { votoId: id, option: voteType } } });

      res.status(200).json({ message: "Voto registrado" });
    } else {
      res.status(403).json({ error: "Votación cerrada" });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el voto' });
  }
};
