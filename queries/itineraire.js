const pool = require('./config')
// operations sur itineraires


const postItineraire = async (req, res) => {
  try {
    const { id_operateur , id_assure ,adresse_malade , adresse_operateur , adresse_soin , distance , duree_moyenne ,
      id_facture} = req.body
    const createdAt =  new Date();

    const newItineraire = await pool.query("INSERT INTO itineraire values( nextval('serialitineraire') , $1, $2, $3 , $4 , $5 , $6 , $7 , $8 , $9 ) RETURNING * " , 
    [id_operateur , id_assure , adresse_malade , adresse_operateur , adresse_soin , distance , duree_moyenne ,
     createdAt , id_facture ])

    res.json(newItineraire.rows[0]);
   } catch (error) {
       console.error(error.message)
   }

}



const getItineraires = async (req, res) => {
  try {
    
       const results =  await pool.query('SELECT * FROM itineraire ORDER BY id ASC');

      res.status(200).json(results.rows)

   } catch (error) {
       console.error(error.message)
   }

}

 const getItineraireByID = async ( req , res) => {
  try {
    
    const id = parseInt(req.params.id)

    const results = await pool.query('SELECT * FROM itineraire , assure  WHERE  itineraire.id = $1 AND itineraire.id_assure = assure.id ' , [id])
    //itineraire.id_assure = assure.id AND
    res.status(200).json(results.rows)

  } catch (error) {
    res.send(error.message)
  }

 }

 const updateItineraire = async ( req , res) => {
  try {
    
    const id = req.params.id
    const { id_operateur , id_assure ,adresse_malade , adresse_operateur , adresse_soin , distance , duree_moyenne ,
        id_facture} = req.body
    
    const newItineraire = await pool.query("UPDATE itineraire  SET id_operateur = $1 , id_assure = $2 ,adresse_malade = $3 , adresse_operateur = $4 , adresse_soin = $5 , distance = $6 , duree_moyenne = $7 , id_facture = $8  WHERE id = $9 " , 
    [id_operateur , id_assure ,adresse_malade , adresse_operateur , adresse_soin , distance , duree_moyenne ,
        id_facture , id])
 

      res.status(200).send(`User modified with ID: ${id}`)

  } catch (error) {
    res.status(400)
    res.send(error.message)
  }

 }

 const deleteItineraire = (req, res) => {
  const id = parseInt(req.params.id)

  pool.query('DELETE FROM itineraire WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`Itineraire deleted with ID: ${id}`)
  })
}




 //------------------------------------------------------------------

module.exports = {
  getItineraires,
  getItineraireByID ,
  postItineraire, 
  updateItineraire,
  deleteItineraire,
}