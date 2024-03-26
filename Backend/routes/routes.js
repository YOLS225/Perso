const express = require('express');
const router = express.Router();

const chambreController=require('../controller/chambre');
const clientController=require('../controller/client');
const compteController=require('../controller/compte');
const reservationController=require('../controller/reservation');
const residenceController=require('../controller/residence');
const roleController=require('../controller/role');
const userController=require('../controller/user');


router.use(chambreController);
router.use(clientController);
router.use(compteController);
router.use(reservationController);
router.use(residenceController);
router.use(roleController);
router.use(userController);

module.exports = router;



