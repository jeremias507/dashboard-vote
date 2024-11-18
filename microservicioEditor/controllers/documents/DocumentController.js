import document from "../../models/document.js";

export const DocumentController = async (req, res) => {
  try {
    const { title, category, direction, responsible, content } = req.body;

    // Generar código de 4 dígitos
    const generateCode = () => {
      return Math.floor(1000 + Math.random() * 9000).toString(); // Genera un número de 4 dígitos aleatorio
    };

    // Crear nuevo documento con el código generado
    const newDocument = new document({
      title: title,
      category: category,
      direction: direction,
      responsible: responsible,
      content: content,
      code: generateCode(),
    });

    const saveDocument = await newDocument.save();

    res.status(201).json({
      data: saveDocument,
      success: true,
      error: false,
      message: "Documento Guardado",
    });
  } catch (error) {
    console.error('Error saving document:', error);
    res.status(500).json({ message: error.message || error, error: true, success: false });
  }
};
