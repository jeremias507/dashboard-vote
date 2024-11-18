
import User from "../modules/user.js";
import bcrypt from "bcrypt";
import { createAccesToken } from "../utils/jwt.js";


export async function Register(req,res) {

    try{
        const{dni, password} = req.body;

        const userFind = await User.findOne({dni});
        if(userFind) return res.status(400).json({messageError:["Usuario ya registrado."], error:true, success:false});
        
            const hashedPassword =await bcrypt.hash(password,10);       
            const user = new User({dni,password: hashedPassword});
            const usersave = await user.save();
            const token =await createAccesToken({id:usersave._id});
            res.cookie("token",token);
            
            console.log();
    
            return res.status(200).json({message:"Registro exitoso.",data:usersave, success:'true'});
    
      
    }catch(error){
        return res.status(500).json({message:error.message||error,error:true, success:'false'});
    }
    
}