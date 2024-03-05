import User from '../models/User.js'
import bcrypt from 'bcrypt'
import { configDotenv } from 'dotenv';
import jwt from 'jsonwebtoken';

// config DOTNET
configDotenv();


export class UserControllers {

    // GET DADOS
    static async getUsers (req, res) {
        try {
            const users = await User.find();

            if (users && users.length > 0) {
                return res.status(200).json(users);
            } else {
                return res.status(404).json({ msg: "Nenhum usuário encontrado!" });
            }
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
            return res.status(500).json({ msg: "Erro interno do servidor" });
        }
    }

    // REGISTRAR USUARIO
    static async registerUser (req,res){
        const {usuario, email, password, confirmPassword} = req.body 

        if(!usuario){
            return res.status(404).json({msg: "Campo de usuário não pode ficar vazio!"})
        }

        if(!email){
            return res.status(404).json({msg: "Campo de email não pode ficar vazio!"})
        }

        if(!password){
            return res.status(404).json({msg: "Campo de senha não pode ficar vazio!"})
        }

        if(password !== confirmPassword){
            return res.status(404).json({msg: "As senhas devem ser iguais para confirmação!"})
        }

        const userExist = await User.findOne({email: email})

        if(userExist){
            return res.status(422).json({msg: "Email já existe! Por favor insira outro email"})
        }else{

            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            const newUser = new User({usuario,email,password: passwordHash})
            newUser.save();
            return res.status(200).json({msg: "Usuário cadastrado com sucesso!"})
        }
    }

    // LOGIN
    static async loginUser (req, res){
        const {email, password} = req.body

        const user = await User.findOne({email: email})
        console.log(user)

        if(!user){
            return res.status(404).json({msg: "Email não encontrado!"})
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if(!checkPassword){
            return res.status(401).json({msg: "Senha incorreta!"})
        }

        try{
            const secret = process.env.SECRET 

            const token = jwt.sign({id: user._id}, secret)
    
            return res.status(200).json({msg: "Usuário logado com sucesso", token})
        }catch(error){
            console.log("Aconteceu o seguinte erro: " + error )
            return res.json(500).json("Erro de servidor!")
        }
    }

    // DELETAR USUARIO
    static async deleteUser(req, res) {
        const id = req.params.id;
    
        try {
            const userExist = await User.findById(id);
    
            if (userExist) {
                await User.deleteOne({ _id: id });
                return res.status(200).json({ msg: "Usuário deletado!" });
            } else {
                return res.status(404).json({ msg: "Usuário não encontrado!" });
            }
        } catch (error) {
            // Lidar com erros, como por exemplo, problemas de conexão com o banco de dados
            console.error(error);
            return res.status(500).json({ msg: "Erro interno do servidor" });
        }
    }

}
