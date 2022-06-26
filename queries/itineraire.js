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
    const {nomfr , prenomfr , nomarabe , prenomarabe , date_naissance , numero_ss , adresse ,
        adresse_mail , date_fin_droit } = req.body
    
    const newItineraire = await pool.query("UPDATE itineraire  SET nomfr = $1 , prenomfr = $2 ,nomarabe = $3 , prenomarabe = $4 , date_naissance = $5 , numero_ss = $6 , adresse = $7 , adresse_mail = $8  , date_fin_droit = $9 WHERE id = $10 " , 
    [nomfr , prenomfr , nomarabe , prenomarabe , date_naissance , numero_ss , adresse ,
     adresse_mail , date_fin_droit , id])
 

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