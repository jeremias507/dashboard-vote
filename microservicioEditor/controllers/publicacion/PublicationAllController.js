import Publication from "../../models/publication.js";


export const PublicationAllController = async (req,res)=>{
    try {
        const response = await Publication.find().sort({createdAt:-1})
        res.status(200).json({
            data: response,
            success: true,
            error: false,
            message: "Publicaciones obtenidas con exitos",
          });
    } catch (error) {
        res.status(500).json({ message: error.message || error, error: true, success: false });
    }
}