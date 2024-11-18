import { Router } from "express";
import { createVoteController } from "../controllers/crearVote.js";
import { voteController } from "../controllers/vote.js";
import { allVoteController } from "../controllers/allVote.js";
import { getVotersController } from "../controllers/getVotersController.js";
import { activeVote } from "../controllers/activeVote.js";
import { getVoteById } from "../controllers/GetVoteByid.js";

const router = Router()

router.post("/create-vote",createVoteController);
router.post("/vote/:id/vote",voteController);
router.get("/all-vote",allVoteController);
router.get("/vote/:id/voters", getVotersController); 
router.post("/vote-activate", activeVote);
router.get("/vote/:id", getVoteById);
export default router