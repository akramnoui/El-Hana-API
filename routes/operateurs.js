var express = require('express');
var router = express.Router();
const {  getOperateurs,  postOperateur,  updateOperateur, deleteOperateur, getOperateurByID} = require('../queries/operateur')


//create a todo

router.post("/", async (req, res) => {
   try {
      postOperateur(req, res)
   } catch (error) {

    console.error(error.message)
   }

});

//get all operateurs*
router.get("/:id", async (req, res) => {

  getOperateurByID(req, res)
});

router.get("/", async (req, res) => {

  getOperateurs(req, res);
  
});

//get a todo



//update a todo

router.put("/:id", async (req, res) => {
  updateOperateur(req,res);

});

//delete a todo

router.delete("/:id", async (req, res) => {
  deleteOperateur(req,res)
 
});
module.exports = router;
