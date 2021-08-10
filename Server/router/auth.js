const express = require('express')
const jwt = require('jsonwebtoken')
// const { findOne } = require('../model/userSchema')
const router = express.Router()
const bycrypt = require('bcryptjs')
const authenticate = require('../middleware/authenticate')

require('../db/conn')

const User = require('../model/userSchema')


router.get('/',(req,res)=>{
    res.send('hellp world ab router se hai')
})



router.get('/signup',(req,res)=>{
    res.send('sign up page')
})

router.get('/signin',(req,res)=>{
    res.send('sign in page')
})

router.get('/contact',(req,res)=>{
    res.send('conatct page')
})

router.post('/register',async (req,res)=>{
    const {name,email,phone,work,password,cpassword} = req.body

    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.json({error: 'fill kar sab'})
    }

    try{
       const userExist = await User.findOne({email:email})

       if(userExist){
        return res.json({already:'user already exist'})
        }else if(password !=cpassword){
            return res.json({pass : 'password sahi daal '})
        }else{
            const user = new User({name,email,phone,work,password,cpassword})
            
            const userRegister = await user.save()

            if(userRegister){
                return res.json({saved:'user save hua'})
            }
        }
    }catch {}

})

router.post('/signin',async (req,res)=>{
    try{
        const {email,password} = req.body
        if(!email || !password){
            return res.json({dono:'dono bhar'})
        }
        const userLogin = await User.findOne({email:email})     
        
        if(userLogin){
            const isMatch = await bycrypt.compare(password,userLogin.password)

            let token = await userLogin.generateAuthToken()
            
            res.cookie('jwtoken', token,{
                expires : new Date(Date.now() + 25892000000),
                httpOnly : true
            })
            if(!isMatch){
                res.json({error:'invalid rednetial '})
            }
            else{
                return res.json({user: ' you have login succesfully'})
            }
        }else{
            return res.json({error : 'invalid credential'})
        }

    }catch{}
})

router.get('/about',authenticate,(req,res)=>{
    res.send(req.rootUser)
})


module.exports = router