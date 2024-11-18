
import User from "../modules/user.js";
import bcrypt from "bcrypt";
import { createAccesToken } from "../utils/jwt.js";

export async function SignUp(req,res) {

    try{
      
        const{dni, password} = req.body;
        console.log(req.body);

        const userFind = await User.findOne({dni});

        if(!userFind) return res.status(400).json({messageError:["Usuario no registrado."], error:true, success:false});

        const isMatched = await bcrypt.compare(password, userFind.password);

        if(!isMatched) return res.status(400).json({messageError:["Contraseña incorrecta."], error:true, success:false});
        
        const token =await createAccesToken({id:userFind.dni});
        res.cookie("token",token);

        return res.status(200).json({message:"Registro exitoso.",data:userFind, success:'true'});
        
    }catch(error){
        return res.status(500).json({message:error.message||error,error:true ,success:'false'});
    }
    
}