var express = require('express');
var router = express.Router();
const {  getTransports,  postTransport,  updateTransport, deleteTransport, getTransportByID} = require('../queries/transport')


//create a todo

router.post("/", async (req, res) => {
   try {
      postTransport(req, res)
   } catch (error) {

    console.error(error.message)
   }

});

//get all Transports*
router.get("/:id", async (req, res) => {

  getTransportByID(req, res)
});

router.get("/", async (req, res) => {

  getTransports(req, res);
  
});

//get a todo



//update a todo

router.put("/:id", async (req, res) => {
  updateTransport(req,res);

});

//delete a todo

router.delete("/:id", async (req, res) => {
  deleteTransport(req,res)
 
});
module.exports = router;
