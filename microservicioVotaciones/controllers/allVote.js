import Voto from "../models/voteSchema.js";

export const allVoteController=async(req,res)=>{
    try {
        const votaciones = await Voto.find();
        res.status(200).json(votaciones);
      } catch (error) {
        res.status(500).json({ message: "Error al obtener las votaciones" });
      }
}


  
     