const express = require("express");
const Client = require("../model/client");
const route = express.Router();

    //Route pour creer un client
route.post("api/create/client", async (req, res) => {
    try {
      const { nom,prenom,numeroPiece,typePiece,contact,username,statut} = req.body; // Supposons que vous envoyez les informations du client dans la requête POST
  
      // Création d'un nouveau client en utilisant le modèle client
      const newClient = await Client.create({nom,prenom,numeroPiece,typePiece,contact,username,statut});
  
      res.status(201).json(newClient);
  
    } catch (error) {
      console.error(error)
      res.status(400).json({ error: "Impossible de créer un nouveau client." });
    }
  });

    //Route pour afficher tous les clients

route.get("api/getclient", async(req,res)=>{
    try {
        
        const findClient=await Client.findAll()
        res.status(201).json(findClient);

    } catch (error) {
        console.error(error)
      res.status(400).json({ error: "Impossible d'afficher tous les clients." })
    }
  });

    // Route pour la mise à jour d'un client existant

route.put("api/edit/client/:id", async (req, res) => {
    try {
      const { id } = req.params; // Identifiant du client à mettre à jour
      const { nom,prenom,numeroPiece,typePiece,contact,username,statut } = req.body; // Nouvelles informations du client
  
      // Recherche du client à mettre à jour
      const existingClient = await Client.findByPk(id);
  
      // Vérification si le client existe
      if (!existingClient) {
        return res.status(404).json({ error: 'Client non trouvé' });
      }
  
      // Mise à jour des champs du client
      existingClient.nom = nom;
      existingClient.prenom = prenom;
      existingClient.numeroPiece = numeroPiece;
      existingClient.typePiece = typePiece;
      existingClient.username = username;
      existingClient.contact = contact;
      existingClient.statut = statut;

  
      // Sauvegarde des modifications dans la base de données
      await existingClient.save();
  
      res.status(200).json({ message: 'Client mis à jour avec succès', updatedClient: existingClient });
    } catch (error) {
      console.error(error)
      res.status(400).json({ error: "Impossible de mettre à jour le client." });
    }
  });

    // Route pour supprimer un client existant

route.delete("api/drop/client/:id", async (req, res) => {
    try {
      const { id } = req.params; // Identifiant du client à supprimer
  
      // Recherche du client à supprimer
      const existingClient = await Client.findByPk(id);
  
      // Vérification si le client existe
      if (!existingClient) {
        return res.status(404).json({ error: 'Client non trouvé' });
      }
  
      // Suppression du client de la base de données
      await existingClient.destroy();
  
      res.status(200).json({ message: 'Client supprimé avec succès' });
    } catch (error) {
      console.error(error)
      res.status(400).json({ error: "Impossible de supprimer le client." });
    }
  });

  module.exports=route;
  

 
