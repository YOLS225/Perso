const { Sequelize} = require('sequelize');


// Configuration de la connexion à la base de données
const sequelize = new Sequelize({
  dialect: 'postgres', // Indiquez le type de base de données
  host: 'localhost', // Remplacez localhost par l'adresse de votre serveur PostgreSQL
  username: 'residb', // Remplacez par votre nom d'utilisateur PostgreSQL
  password: 'residb', // Remplacez par votre mot de passe PostgreSQL
  database: 'residb', // Remplacez par le nom de votre base de données PostgreSQL
});
try {
  sequelize.authenticate();
  console.log("Connecté à la base de données PostgreSQL!");
} catch (error) {
  console.error("Impossible de se connecter, erreur suivante :", error);
}

module.exports = sequelize ;
