var express = require('express');
var router = express.Router();
const pool = require('../queries/queries')


//create a todo

router.post("/", async (req, res) => {
   try {
    const {id , description} = req.body
    console.log(id);
    const newOperateur = await pool.query('INSERT INTO operateur(id , NumeroTelephone) values($1 , $2) RETURNING * ' , 
    [id, description])

    res.json(newOperateur.rows[0]);
   } catch (error) {
    console.error(error.message)
   }

});

//get all operateurs

router.get("/", async (req, res) => {
   
    pool.query('SELECT * FROM operateur ORDER BY id ASC', (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json(results.rows)
      })
});

//get a todo

router.get("/:id", async (req, res) => {
    res.send('this is a post request for operateurs/:id');
});

//update a todo

router.put("/:id", async (req, res) => {

});

//delete a todo

router.delete("/:id", async (req, res) => {
 
});
module.exports = router;
