const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/user");
const route = express.Router();


// route pour creer un nouvel utilisateur 
route.post("/utilisateur", async (req, res) => {
  try {
    const {login,name,role,password,role_id } = req.body; // Supposons que vous envoyez les informations de l'utilisateur dans la requête POST

    const saltRounds=20;
      const salt = bcrypt.genSaltSync(saltRounds);
      const passHash= bcrypt.hashSync(password,salt)



    // Création d'un nouvel utilisateur en utilisant le modèle Utilisateur
    const newUser = await User.create({
      login,
      name,
      password:passHash,
      role,
      roleid:role_id,
    });

    res.status(201).json(newUser);

  } catch (error) {
    console.error(error)
    res.status(400).json({ error: "Impossible de créer un nouvel utilisateur." });
  }
});


// route pour le loggin
route.post('/authentification', async(req,res)=>{
  try{
    const {login,passwords}= req.body
   
    const elementTrouve = await User.findOne({ 
      where: { name: login }});
    
      if (!elementTrouve){ 
        return res.status(201).json({status:false,message :"L'utilisateur n'existe pas!! "});
      }

      const saltRounds=10;
      const salt = bcrypt.genSaltSync(saltRounds);
     // const passHash= bcrypt.hashSync(passwords,salt)

      if (!bcrypt.compareSync(passwords,elementTrouve.password)){
        return res.status(201).json({status:false,message :"Le mot de passe est incorrect!! "});
      }

    const paylod = { 
      name:elementTrouve.name,
      login : elementTrouve.name,
      id_role: elementTrouve.roleid
    }

    const secretKey = 'secretKey';

    const  token= jwt.sign(paylod,secretKey,{expiresIn:'1h'});
    return res.status(201).json({status:true,message :"Authentification réussie!! ",data:token});

  }
  catch (error) {
    console.error(error)
    res.status(400).json({ error: "Impossible de vous authentifier : "+error });}
});

module.exports=route;

