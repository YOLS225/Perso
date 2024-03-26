const express = require("express");
const Role=require('../model/role')
const route = express.Router();

// Route pour créer un rôle (POST)
route.post("/role", async (req, res) => {
  try {
    const { code,designation } = req.body; // Supposons que vous envoyez le nom du rôle dans la requête POST

    // Création d'un nouveau rôle en utilisant le modèle Role
    const newRole = await Role.create({ code,designation });
    console.log(newRole);

    res.status(201).json(newRole);
  } catch (error) {
    res.status(400).json({ error: "Impossible de créer un nouveau rôle :",error});
  }
});

module.exports = route;
