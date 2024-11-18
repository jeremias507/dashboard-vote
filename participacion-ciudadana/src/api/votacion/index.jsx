import axios from "./axios";

export const activateVoteRequest = async(payload)=>{
    return await axios.post(`/vote-activate`,payload)
}

