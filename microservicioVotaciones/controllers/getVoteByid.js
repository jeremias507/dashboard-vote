import Voto from "../models/voteSchema.js";

export const getVoteById = async (req,res)=>{
    try {
        const {id} = req.params

        const voto =  await Voto.findOne({publication:id})
        if(!voto){
            return res.status(404).json("Voto no encontrado")
        }
        
    


       res.status(200).json({
        data: voto,
        success: true,
        error: false,
        message: "Voto Obtenido",
      });
    } catch (error) {
        res.status(500).json({ message: "no se pudo activar las votaciones" || error, error: true, success: false });
    }
}