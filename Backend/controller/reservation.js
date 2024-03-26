const express = require("express");
const Reservation=require("../model/reservation");
const { Sequelize } = require("sequelize");
const route = express.Router();

route.post("api/create/reservation", async (req, res) => {
    try {

      const {date_debut,date_fin,heure_entree,heure_sortie,montant,user_name,heure_prevue_sortie,chambre_id,client_id} = req.body; // Supposons que vous envoyez les informations de la facture dans la requête POST
      
      const where={  where: { user_name: user_name }}
      
      const findReservation = await Reservation.findOne(where);
    
      if (findReservation){ 
      return res.status(201).json({status:false,message :"La reservation existe déjà!! "});
        }  
      // Création d'une nouvelle reservation 
      const newReservation = await Reservation.create({
        date_debut,
        date_fin,
        heure_entree,
        heure_sortie,
        heure_prevue_sortie,
        montant,
        statut,
        user_name,
        chambreid:chambre_id,
        clientid:client_id
      });

      res.status(201).json(newReservation);
  
    } catch (error) {
      console.error(error)
      res.status(400).json({ error: "Impossible de créer une nouvelle reservation." });
    }
  });

route.get("api/getreservation", async(req,res)=>{
    try {
        
        const findReservation=await Reservation.findAll()
        res.status(201).json(findReservation);

    } catch (error) {
        console.error(error)
      res.status(400).json({ error: "Impossible d'afficher tous les reservations." })
    }
  });

    // Route pour la mise à jour d'un reservation existant
route.put("api/edit/reservation/:id", async (req, res) => {
    try {
      const { id } = req.params; // Identifiant du reservation à mettre à jour
      const {date_debut,date_fin,heure_entree,heure_sortie,montant,user_name,heure_prevue_sortie,chambre_id,client_id} = req.body; // Nouvelles informations du reservation
  
      // Recherche du reservation à mettre à jour
      const existingReservation = await Reservation.findByPk(id);
  
      // Vérification si le reservation existe
      if (!existingReservation) {
        return res.status(404).json({ error: 'reservation non trouvé' });
      }
  
      // Mise à jour des champs du reservation
      existingReservation.date_debut = date_debut;
      existingReservation.date_fin = date_fin;
      existingReservation.heure_entree = heure_entree;
      existingReservation.heure_sortie = heure_sortie;
      existingReservation.numero_reservation = numero_reservation;
      existingReservation.montant = montant;
      existingReservation.user_name = user_name;
      existingReservation.heure_prevue_sortie = heure_prevue_sortie;
      existingReservation.chambre_id = chambre_id;
      existingReservation.client_id = client_id;



  
      // Sauvegarde des modifications dans la base de données
      await existingReservation.save();
  
      res.status(200).json({ message: 'reservation mis à jour avec succès', updatedReservation: existingReservation });
    } catch (error) {
      console.error(error)
      res.status(400).json({ error: "Impossible de mettre à jour la reservation." });
    }
  });

    // Route pour supprimer un reservation existant
route.delete("api/drop/reservation/:id", async (req, res) => {
    try {
      const { id } = req.params; // Identifiant du reservation à supprimer
  
      // Recherche de la reservation à supprimer
      const existingReservation = await Reservation.findByPk(id);
  
      // Vérification si la reservation existe
      if (!existingReservation) {
        return res.status(404).json({ error: 'reservation non trouvée' });
      }
  
      // Suppression de la reservation de la base de données
      await existingReservation.destroy();
  
      res.status(200).json({ message: 'reservation supprimée avec succès' });
    } catch (error) {
      console.error(error)
      res.status(400).json({ error: "Impossible de supprimer la reservation." });
    }
  });

  module.exports=route;