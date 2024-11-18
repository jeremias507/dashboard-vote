import { Router } from "express";
import { DocumentController } from "../controllers/documents/DocumentController.js";
import { DocumentAllController } from "../controllers/documents/DocumentAllController.js";
import { OneDocument } from "../controllers/documents/OneDocument.js";
import { DeleteDocument } from "../controllers/documents/DeleteDocument.js";
import { PublicationDocumentController } from "../controllers/publicacion/PublicaTionController.js";
import { PublicationAllController } from "../controllers/publicacion/publicationAllController.js";
import { OnePublication } from "../controllers/publicacion/OnePublication.js";
const router = Router();

router.post("/document", DocumentController);
router.get("/all-document", DocumentAllController);
router.get("/one-document/:id", OneDocument);
router.delete("/delete-document/:id", DeleteDocument);

{"publicacion"}
router.post("/publication", PublicationDocumentController);
router.get("/all-publication",PublicationAllController )
router.get("/one-publication/:id",OnePublication)
export default router;
