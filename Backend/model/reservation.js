const{Sequelize,Model}=require('sequelize');
const db = require('../db/db')
const Client = require('./client'); 
const Chambre = require('../model/chambre');
class Reservation extends Model{}

Reservation.init(
    {
      idreservation: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      date_debut: {
        type: Sequelize.DATE
      },
      date_fin: {
        type: Sequelize.DATE
      },
      heure_entree: {
        type: Sequelize.TIME
      },
      heure_sortie: {
        type: Sequelize.TIME
      },
      heure_prevue_sortie: {
        type: Sequelize.TIME
      },
      chambre_idchambre: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: Chambre,
          key: 'idchambre'
        }
      },
      user_name: {
        type: Sequelize.STRING(45)
      }
      ,
      statut: {
        type: Sequelize.STRING(45),
        validate: {
          isIn: [['ACTIVE', 'INACTIVE']]
        }
      },
      montant: {
        type: Sequelize.STRING(45)
      },
      client_idclient: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: Client,
          key: 'idCLIENT'
        }
      }
    },
    {
        sequelize:db,
        modelName:'Reservation',
        tableName:'Reservation',
        timestamps:false
    }
);
Reservation.belongsTo(Chambre, { 
    foreignKey: 'chambre_idchambre'
});
// Reservation.belongsTo(Client, { 
//     foreignKey: 'client_idclient'
// })
module.exports=Reservation;
