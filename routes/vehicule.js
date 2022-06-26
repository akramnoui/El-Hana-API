var express = require('express');
var router = express.Router();
const {  getVehicules,  postVehicule,  updateVehicule, deleteVehicule, getVehiculeByID} = require('../queries/vehicule')


//create a todo

router.post("/", async (req, res) => {
   try {
      postVehicule(req, res)
   } catch (error) {

    console.error(error.message)
   }

});

//get all Vehicules*
router.get("/:id", async (req, res) => {

  getVehiculeByID(req, res)
});

router.get("/", async (req, res) => {

  getVehicules(req, res);
  
});

//get a todo



//update a todo

router.put("/:id", async (req, res) => {
  updateVehicule(req,res);

});

//delete a todo

router.delete("/:id", async (req, res) => {
  deleteVehicule(req,res)
 
});
module.exports = router;
