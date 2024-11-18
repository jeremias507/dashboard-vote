import Document from "../../models/document.js";
import Publication from "../../models/publication.js";
import axios from "axios"; // Asegúrate de instalar axios

export const PublicationDocumentController = async (req, res) => {
  try {
    const { documentId } = req.body; 

    const document = await Document.findById(documentId);
    const publication = await Publication.findById(documentId);

    if (!document) {
      return res.status(404).json("Documento no encontrado!!");
    }

    if (document.published) {
      return res.status(400).json("El documento ya ha sido publicado!!");
    }

    if (publication) {
      return res.status(400).json("Publicación ya existe!!");
    }

    const { title, content, code } = document;

    // Crear la publicación
    const PublicDocument = new Publication({
      title: title,
      content: content,
      published: true,
      code: code,
    });

    const savePublication = await PublicDocument.save();

    // Actualizar el documento a publicado
    document.published = true;
    await document.save();

    // Hacer una solicitud al microservicio de votación
    const voteResponse = await axios.post('http://localhost:5000/api/create-vote', {
      title: title,
      publicationId: savePublication._id 
    });

    res.status(200).json({
      data: savePublication,
      voteData: voteResponse.data, // Devuelve la respuesta de la creación de votación
      success: true,
      error: false,
      message: "Publicación exitosa y documento actualizado a publicado. Votación creada.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message || error, error: true, success: false });
  }
};
