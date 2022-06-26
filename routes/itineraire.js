var express = require('express');
var router = express.Router();
const {  getItineraires,  postItineraire,  updateItineraire, deleteItineraire, getItineraireByID} = require('../queries/itineraire')


//create a todo

router.post("/", async (req, res) => {
   try {
      postItineraire(req, res)
   } catch (error) {

    console.error(error.message)
   }

});

//get all Itineraires*
router.get("/:id", async (req, res) => {

  getItineraireByID(req, res)
});

router.get("/", async (req, res) => {

  getItineraires(req, res);
  
});

//get a todo



//update a todo

router.put("/:id", async (req, res) => {
  updateItineraire(req,res);

});

//delete a todo

router.delete("/:id", async (req, res) => {
  deleteItineraire(req,res)
 
});
module.exports = router;
