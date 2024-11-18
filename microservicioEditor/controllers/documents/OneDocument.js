import document from "../../models/document.js"


export const OneDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const documento = await document.findById(id);
    if (!documento) {
      return res.status(404).json({ message: "Documento no encontrado" });
    }

    res.status(200).json({
      data: documento,
      success: true,
      error: false,
      message: "documento encontrado",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
};
