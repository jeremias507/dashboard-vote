import Publication from "../../models/publication.js";
import axios from "axios";
export const OnePublication = async (req, res) => {
  try {
    const { id } = req.params; 

    const publicacion = await Publication.findOne({_id:id})
    
    if (!publicacion) {
      return res.status(404).json({ error: "Publicación no encontrada" });
    }
    
    const vote = await axios.get(`http://localhost:5000/api/vote/${id}`);
    if(!vote){
      return res.status(404).json({ error: "Voto no encontrado" });
    }
    res.status(200).json({
      data: {publicacionResponse: publicacion,voteResponse:vote.data.data},
      success: true,
      error: false,
      message: "Publicaciones obtenidas con exitos",
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la publicación y votaciones' });
  }
};