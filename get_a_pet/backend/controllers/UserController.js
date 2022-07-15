const User = require('../models/User');
const bcrypt = require('bcrypt')
const secret = process.env.JWT_SECRET
const jwt = require('jsonwebtoken');
//Helps
const createUserToken = require('../helpers/create-user-token');
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class UserController{
    static async register(req,res){
        const {name,email,phone,confirmPassword,password} = req.body ;


        //Validation
        if(!name){
            res.status(422).json({message:'O nome é obrigatorio'})
            return
        }
        if(!email){
            res.status(422).json({message:'O email é obrigatório'})
            return
        }
        if(!phone){
            res.status(422).json({message:'O telefone é obrigatorio'})
            return
        }
        if(phone.length < 8){
            res.status(422).json({message:'telefone muito pequeno'})
            return
        }
        if(!password){
            res.status(422).json({message:'A senha é obrigatorio'})
            return
        }
        if(!confirmPassword){
            res.status(422).json({message:'A confirmação de senha é obrigatorio'})
            return
        }
        if(password != confirmPassword){
            res.status(422).json({message:'A senha e confirmção de senha tem que ser semelhante'})
            return
        }
        //Check if user exists
        const userExists = await User.findOne({email});

        if(userExists){
            res.status(422).json({message:'Por favor ultilize outro email,esse já esta'})
            return
        }
        //create a password 
        const salt = await bcrypt.genSalt(12)
        const passwordHash =  await bcrypt.hash(password,salt)

        //create a user
        const user  = new User({
            name,
            email,
            phone,
            password:passwordHash
        })
        try {
            const newUser = await user.save()
            createUserToken(newUser,req,res) 

        } catch (error) {
            res.status(500).json({message:error})
        }
    }
    static async login(req,res){
        const {email,password} = req.body

        //Validations
        if(!email){
            res.status(422).json({message:'Email é obrigatotio'})
            return
        }
        if(!password){
            res.status(422).json({message:'Senha é obrigatotio'})
            return
        }
        //check if user exists
        const user = await User.findOne({email})

        if(!user){
            res.status(404).json({
                message:'Não há usuario cadastrado com este e-mail'
            })
            return
        }
        //check if password match with db password
        const checkPassword = await bcrypt.compare(password,user.password)

        if(!checkPassword){
            res.status(422).json({
                message:'Senha inválida!'
            })
            return
        }
        await createUserToken(user,req,res)
    }
    static async checkUser(req,res){
        let currentUser

        console.log(req.headers.authorization)

        if(req.headers.authorization){
            const token = getToken(req)
            const decoded = jwt.verify(token,secret)

            currentUser = await User.findById(decoded.id)
            
            currentUser.password = undefined

        }else{
            currentUser = null
        }
        res.status(200).send(currentUser)
    }
    static async getUserById(req,res){
        const id = req.params.id

        const user = await User.findById(id).select('-password')

        if(!user){
            res.status(404).json({
                message:'Usuario não encontrado'
            })
            return
        }
        res.status(200).json({user})
    }
    static async editUser(req,res){
        const id = req.params.id

         //check if user exists
        const token = getToken(req)
        const user = await getUserByToken(token)


        const {name,email,phone,password,confirmPassword} = req.body
        
        if(req.file){
            user.image = req.file.filename
            
        }
        
        //validation
        if(!name){
            res.status(422).json({message:'O nome é obrigatorio'})
            return
        }
        if(!email){
            res.status(422).json({message:'O email é obrigatório'})
            return
        }
        //Check if user exists
        const userExists = await User.findOne({email});

        if(user.email !== email && userExists){
            res.status(422).json({
                message:"Usuario não encoontrado"
            })
            return
        }
        user.email = email

        if(!phone){
            res.status(422).json({message:'O telefone é obrigatorio'})
            return
        }
        if(phone.length < 8){
            res.status(422).json({message:'telefone muito pequeno'})
            return
        }
        user.phone = phone

        if(!password){
            res.status(422).json({message:'A senha é obrigatorio'})
            return
        }
        if(!confirmPassword){
            res.status(422).json({message:'A confirmação de senha é obrigatorio'})
            return
        }
        if(password != confirmPassword){
            res.status(422).json({message:'A senha e confirmção de senha tem que ser semelhante'})
            return
        }

       if(!user){
        res.status(422).json({
            message:'Usuario não encontrado'
        })
        return
       }
       user.phone = phone 

       if(password != confirmPassword){
        res.status.json({message:"As senhas não conferem!"})
        return
       }else if(password === confirmPassword && password != null){
        //creating password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password,salt)
        user.password = passwordHash
       }

       try {
         //returens user updated data
         await User.findOneAndUpdate(
            {_id: user._id },
            {$set: user},
            {new: true},
            )
            res.status(200).json({
                message:'Usuário atualizado com sucesso!'
            })
       } catch (error) {
        res.status(500).json({message:error})
       }
    }
}
