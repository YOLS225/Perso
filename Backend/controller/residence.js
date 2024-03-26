const express = require("express");
const Residence = require("../model/residence");
const route = express.Router();

    //Route pour creer un Residence
route.post("api/create/residence", async (req, res) => {
    try {
      const { name,adresse,contact,email,username,status} = req.body; // Supposons que vous envoyez les informations du Residence dans la requête POST
  
      // Création d'un nouveau Residence en utilisant le modèle Residence
      const newResidence = await Residence.create({name,adresse,contact,email,username,status});
  
      res.status(201).json(newResidence);
  
    } catch (error) {
      console.error(error)
      res.status(400).json({ error: "Impossible de créer un nouveau Residence." });
    }
  });

    //Route pour afficher tous les Residences
route.get("api/getresidence", async(req,res)=>{
    try {
        
        const findResidence=await Residence.findAll()
        res.status(201).json(findResidence);

    } catch (error) {
        console.error(error)
      res.status(400).json({ error: "Impossible d'afficher tous les Residences." })
    }
  });

    // Route pour la mise à jour d'un Residence existant
route.put("api/edit/residence/:id", async (req, res) => {
    try {
      const { id } = req.params; // Identifiant du Residence à mettre à jour
      const { name,adresse,contact,email,username,status } = req.body; // Nouvelles informations du Residence
  
      // Recherche du Residence à mettre à jour
      const existingResidence = await Residence.findByPk(id);
  
      // Vérification si le Residence existe
      if (!existingResidence) {
        return res.status(404).json({ error: 'Residence non trouvé' });
      }
  
      // Mise à jour des champs du Residence
      existingResidence.name = name;
      existingResidence.adresse = adresse;
      existingResidence.contact = contact;
      existingResidence.email = email;
      existingResidence.username = username;

      existingResidence.status = status;

  
      // Sauvegarde des modifications dans la base de données
      await existingResidence.save();
  
      res.status(200).json({ message: 'Residence mis à jour avec succès', updatedResidence: existingResidence });
    } catch (error) {
      console.error(error)
      res.status(400).json({ error: "Impossible de mettre à jour le Residence." });
    }
  });

    // Route pour supprimer un Residence existant
route.delete("api/drop/residence/:id", async (req, res) => {
    try {
      const { id } = req.params; // Identifiant du Residence à supprimer
  
      // Recherche du Residence à supprimer
      const existingResidence = await Residence.findByPk(id);
  
      // Vérification si le Residence existe
      if (!existingResidence) {
        return res.status(404).json({ error: 'Residence non trouvé' });
      }
  
      // Suppression du Residence de la base de données
      await existingResidence.destroy();
  
      res.status(200).json({ message: 'Residence supprimé avec succès' });
    } catch (error) {
      console.error(error)
      res.status(400).json({ error: "Impossible de supprimer le Residence." });
    }
  });

  module.exports=route;
