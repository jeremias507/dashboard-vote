import axios from "./axios";

export const htmlRequest = async(payload)=>{
    return await axios.post("/html",payload)
}

export const documentRequest = async(payload)=>{
    return await axios.post("/document",payload)
}

export const documentAllRequest = async()=>{
    return await axios.get("/all-document")
}

export const documentOneRequest = async(id)=>{
    return await axios.get(`/one-document/${id}`)
}

export const deleteRequest = async(id)=>{
    return await axios.delete(`/delete-document/${id}`)
}

export const publicationRequest = async(payload)=>{
    return await axios.post(`/publication`,payload)
}

export const publicationAllRequest = async()=>{
    return await axios.get(`/all-publication`)
}

export const OnePublicationRequest = async(id)=>{
    return await axios.get(`/one-publication/${id}`)
}