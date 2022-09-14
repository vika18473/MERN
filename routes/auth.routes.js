const {Router} = require("express");
const bcrypt = require("bcryptjs")
const {check, validationResult} = require("express-validator")
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const config = require("config")

const router = Router();

//  /api/auth/registr
router.post("/register",
    [
        check("email", "некорекктній ємеил").isEmail(),
        check("password", "Минимальня длина пароля 6 символв").isLength(6)
    ],

     async (req, res)=>{
try{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
    return res.status(400).json({
    errors : errors.array(), 
    message : "Некорреткные данные при регистрации"
})
    }

const {email, password} = req.body

const candidate = await User.findOne({email})

if(candidate){
    return res.status(400).json({message : "Такой пользователь уже существует "})
}

const hashedPassword = await bcrypt.hash(password, 12)
const user = new User({email, password: hashedPassword })
await user.save()

res.status(201).json({message : "Пользователь создан"})

}catch(e){
  res.status(500).json({message :"Что-то пошло не так, повоторите снова."})
}
})

//  /api/auth/login
router.post(
    "/login",
    [ //midleware
        check("email", "Не верный эмеил").normalizeEmail().isEmail(),
        check("password","Введите пароль").exists() //существует
    ],
 async (req, res)=>{
    try{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
        return res.status(400).json({
        errors : errors.array(), 
        message : "Некорреткные данные при входе в систему"
        })
        }

        const {email, password} = req.body

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: "Пользователь не найден"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
        return res.status(400).json({message: "Неверный пароль попробуйте снова"})
    }

    const token = jwt.sign(
    {userId : user.id},
    config.get("jwtSecret"),
    {expiresIn: "1h"}
    )

    res.json({token, userId : user.id})
    }catch(e){
        res.status(500).json({message:"Что-то пошло не так, повоторите снова."})
    }
    })
    
module.exports = router