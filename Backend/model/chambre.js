const{Sequelize,Model}=require('sequelize');
const Residence = require('./residence');
const db = require('../db/db')

class Chambre extends Model{}

Chambre.init(
    {
      idchambre: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      code: {
        type: Sequelize.STRING(45)
      },
      designation: {
        type: Sequelize.STRING(45)
      },
      description: {
        type: Sequelize.STRING(45)
      },
      numero_chambre: {
        type: Sequelize.STRING(45)
      },
      prix: {
        type: Sequelize.FLOAT
      },
      user_name: {
        type: Sequelize.STRING(45)
      }
      ,
      statut: {
        type: Sequelize.STRING(45),
        validate: {
          isIn: [['OCCUPEE', 'LIBRE','ACTIVE', 'INACTIVE']]
        }
      },
      residence_idresidence: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: Residence,
          key: 'idresidence'
        }
      }
    },
    {
        sequelize:db,
        modelName:'chambre',
        tableName:'chambre',
        timestamps:false
    }
);
Chambre.belongsTo(Residence);

module.exports=Chambre;
