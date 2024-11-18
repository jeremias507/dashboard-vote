import document from "../../models/document.js"

export const DocumentAllController = async (req,res)=>{
  try {
      const documentAll = await document.find().sort({  createdAt: -1  })
       res.status(200).json({
        data: documentAll,
        success: true,
        error: false,
        message: "Todos los documentos obtenidos",
      })
  } catch (error) {
    res.status(500).json({ message: error.message || error, error: true, success: false })
  }
} 