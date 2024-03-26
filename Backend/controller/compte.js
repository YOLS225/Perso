const express = require("express");
const Compte=require('../model/compte');
const route = express.Router();

// Route pour créer un rôle (POST)
route.post("api/create/compte", async (req, res) => {
  try {
    const { montant,residence_id } = req.body; 

    // Création d'un nouveau rôle en utilisant le modèle Role
    const newCompte = await Compte.create({ montant,residenceid:residence_id });

    res.status(201).json(newCompte);
  } catch (error) {
    res.status(400).json({ error: "Impossible de créer un nouveau rôle." });
  }
});

module.exports = route;
