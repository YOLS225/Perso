const express = require("express");
const Chambre=require("../model/chambre");
const route = express.Router();



function generateCode(length) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      code += charset[randomIndex];
    }
    return code;
  }
  
  // // Exemple d'utilisation :
  // const generated = generateCode(8);
  // console.log(generated); // Affichera un code alphanumérique de 8 caractères
  

route.post("api/create/chambre", async (req, res) => {
    try {

      const {designation,description,prix,statut,numero_chambre,username,residence_id} = req.body; // Supposons que vous envoyez les informations de la facture dans la requête POST
      
      const where={  where: { code: code }}
      
      const findChambre = await Chambre.findOne(where);
    
      if (findChambre){ 
      return res.status(201).json({status:false,message :"La chambre existe déjà!! "});
        }  
      // Création d'une nouvelle chambre 
      const newChambre = await Chambre.create({code:generateCode(8),designation,description,prix,statut,numero_chambre,username,residenceid:residence_id
      });

      res.status(201).json(newChambre);
  
    } catch (error) {
      console.error(error)
      res.status(400).json({ error: "Impossible de créer une nouvelle chambre." });
    }
  });

route.get("api/getchambre", async(req,res)=>{
    try {
        
        const findChambre=await Chambre.findAll()
        res.status(201).json(findChambre);

    } catch (error) {
        console.error(error)
      res.status(400).json({ error: "Impossible d'afficher tous les chambres." })
    }
  });

    // Route pour la mise à jour d'un chambre existant
route.put("api/edit/chambre/:id", async (req, res) => {
    try {
      const { id } = req.params; // Identifiant du chambre à mettre à jour
      const {designation,description,prix,statut,numero_chambre,username,residence_id} = req.body; // Nouvelles informations du chambre
  
      // Recherche du chambre à mettre à jour
      const existingChambre = await Chambre.findByPk(id);
  
      // Vérification si le chambre existe
      if (!existingChambre) {
        return res.status(404).json({ error: 'chambre non trouvé' });
      }
  
      // Mise à jour des champs du chambre
      existingChambre.designation = designation;
      existingChambre.description = description;
      existingChambre.prix = prix;
      existingChambre.statut = statut;
      existingChambre.numero_chambre = numero_chambre;
      existingChambre.username = username;
      existingChambre.residence_id = residence_id;


  
      // Sauvegarde des modifications dans la base de données
      await existingChambre.save();
  
      res.status(200).json({ message: 'chambre mis à jour avec succès', updatedChambre: existingChambre });
    } catch (error) {
      console.error(error)
      res.status(400).json({ error: "Impossible de mettre à jour la chambre." });
    }
  });

    // Route pour supprimer un chambre existant
route.delete("api/drop/chambre/:id", async (req, res) => {
    try {
      const { id } = req.params; // Identifiant du chambre à supprimer
  
      // Recherche de la chambre à supprimer
      const existingChambre = await Chambre.findByPk(id);
  
      // Vérification si la chambre existe
      if (!existingChambre) {
        return res.status(404).json({ error: 'chambre non trouvée' });
      }
  
      // Suppression de la chambre de la base de données
      await existingChambre.destroy();
  
      res.status(200).json({ message: 'chambre supprimée avec succès' });
    } catch (error) {
      console.error(error)
      res.status(400).json({ error: "Impossible de supprimer la chambre." });
    }
  });

  module.exports=route;