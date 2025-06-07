/*
const User = require('../models/user.model');//traigo el modelo del usuario
const bcryptjs = require('bcryptjs');//traigo bcryptjs para encriptar la contraseña
const jwt = require('jsonwebtoken');//traigo jwt para generar el token



exports.createUser = async (req, res) => {
    app.post('/users/create',async (req,res)=>{//req y res peticion y respuesta. Aqui si se usara el request
 const {username,email,password}=req.body;
    try {
    const salt = await bcryptjs.genSalt(10) 
    const hashedPassword = await bcryptjs.hash(password, salt)
    const newUser= await User.create({username,email,password:hashedPassword});
    return res.status(200).json({newUser});
 } catch (error) {
    return res.status(500).json({
        message:'Hubo un error al crear usuario',
        error:error.message//dato tecnico con info del error
    });//status 500 error del server
 }
})
 */