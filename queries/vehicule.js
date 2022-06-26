const pool = require('./config')
// operations sur vehicules


const postVehicule = async (req, res) => {
  try {
    const {id_operateur , nom_chauffeur ,matricule, type_vehicule  } = req.body
    const createdAt =  new Date();

    const newVehicule = await pool.query("INSERT INTO vehicule values( nextval('serialvehicule') , $1, $2, $3 , $4 , $5 ) RETURNING * " , 
    [id_operateur , nom_chauffeur ,matricule,type_vehicule ,  createdAt   ])

    res.json(newVehicule.rows[0]);
   } catch (error) {
       console.error(error.message)
   }

}



const getVehicules = async (req, res) => {
  try {
    
       const results =  await pool.query('SELECT * FROM vehicule ORDER BY id ASC');

      res.status(200).json(results.rows)

   } catch (error) {
       console.error(error.message)
   }

}

 const getVehiculeByID = async ( req , res) => {
  try {
    
    const id = parseInt(req.params.id)

    const results = await pool.query('SELECT * FROM vehicule WHERE id = $1 ' , [id])
    res.status(200).json(results.rows)

  } catch (error) {
    res.sendStatus(400)
    res.send(error.message)
  }

 }

 const updateVehicule = async ( req , res) => {
  try {
    
    const id = req.params.id
    const {id_operateur , nom_chauffeur ,matricule, type_vehicule  } = req.body

    const newVehicule = await pool.query("UPDATE vehicule  SET id_operateur = $1 , nom_chauffeur = $2 ,matricule = $3 , type_vehicule = $4  WHERE id = $5 " , 
    [id_operateur , nom_chauffeur ,matricule, type_vehicule, id])
 

      res.status(200).send(`User modified with ID: ${id}`)

  } catch (error) {
    res.status(400)
    res.send(error.message)
  }

 }

 const deleteVehicule = (req, res) => {
  const id = parseInt(req.params.id)

  pool.query('DELETE FROM vehicule WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`Vehicule deleted with ID: ${id}`)
  })
}




 //------------------------------------------------------------------

module.exports = {
  getVehicules,
  getVehiculeByID ,
  postVehicule, 
  updateVehicule,
  deleteVehicule,
}