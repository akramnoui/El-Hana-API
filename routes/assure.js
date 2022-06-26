var express = require('express');
var router = express.Router();
const {  getAssures,  postAssure,  updateAssure, deleteAssure, getAssureByID} = require('../queries/assure')


//create a todo

router.post("/", async (req, res) => {
   try {
      postAssure(req, res)
   } catch (error) {

    console.error(error.message)
   }

});

//get all Assures*
router.get("/:id", async (req, res) => {

  getAssureByID(req, res)
});

router.get("/", async (req, res) => {

  getAssures(req, res);
  
});

//get a todo



//update a todo

router.put("/:id", async (req, res) => {
  updateAssure(req,res);

});

//delete a todo

router.delete("/:id", async (req, res) => {
  deleteAssure(req,res)
 
});
module.exports = router;
