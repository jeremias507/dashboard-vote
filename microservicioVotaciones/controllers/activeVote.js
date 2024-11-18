import Voto from "../models/voteSchema.js";

export const activeVote = async (req,res)=>{
    try {
        const {votedate,id} = req.body

        const voto =  await Voto.findOne({publication:id})
        if(!voto){
            return res.status(404).json("Voto no encontrado")
        }
        
       const parsedDate = new Date(votedate.split("-").reverse().join("-"));
       voto.voteDate = parsedDate 
       voto.isActive = true

       await voto.save()

       res.status(200).json({
        data: voto,
        success: true,
        error: false,
        message: "Voto activado y actualizado correctamente",
      });
    } catch (error) {
        res.status(500).json({ message: "no se pudo activar las votaciones" || error, error: true, success: false });
    }
}