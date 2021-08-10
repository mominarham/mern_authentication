const dotenv = require('dotenv')
const express = require('express')
const app = express()

dotenv.config({path:'./config.env'})

require('./db/conn')
const User = require('./model/userSchema')

app.use(express.json())

const PORT = process.env.PORT


app.use(require('./router/auth.js'))

// app.get('/',(req,res)=>{
//     res.send('hellp world')
// })

// app.get('/about',middleware,(req,res)=>{
//     res.send('about page')
// })

// app.get('/signup',(req,res)=>{
//     res.send('sign up page')
// })

// app.get('/signin',(req,res)=>{
//     res.send('sign in page')
// })

// app.get('/contact',(req,res)=>{
//     res.send('conatct page')
// })


app.listen(PORT,(req,res)=>{
    console.log('working ho raha h ')
})