const pool = require('./config')
// operations sur assures


const postAssure = async (req, res) => {
  try {
    const {nomfr , prenomfr , nomarabe , prenomarabe , date_naissance , numero_ss , adresse ,
    adresse_mail , date_fin_droit } = req.body
    const createdAt =  new Date();

    const newAssure = await pool.query("INSERT INTO assure values( nextval('serialassure') , $1, $2, $3 , $4 , $5 , $6 , $7 , $8 , $9 , $10 ) RETURNING * " , 
    [nomfr , prenomfr , nomarabe , prenomarabe , date_naissance , numero_ss , adresse ,
        adresse_mail , createdAt , date_fin_droit])

    res.json(newAssure.rows[0]);
   } catch (error) {
       console.error(error.message)
   }

}



const getAssures = async (req, res) => {
  try {
    
       const results =  await pool.query('SELECT * FROM assure ORDER BY id ASC');

      res.status(200).json(results.rows)

   } catch (error) {
       console.error(error.message)
   }

}

 const getAssureByID = async ( req , res) => {
  try {
    
    const id = parseInt(req.params.id)

    const results = await pool.query('SELECT * FROM assure WHERE id = $1 ' , [id])
    res.status(200).json(results.rows)

  } catch (error) {
    res.sendStatus(400)
    res.send(error.message)
  }

 }

 const updateAssure = async ( req , res) => {
  try {
    
    const id = req.params.id
    const {nomfr , prenomfr , nomarabe , prenomarabe , date_naissance , numero_ss , adresse ,
        adresse_mail , date_fin_droit } = req.body
    
    const newAssure = await pool.query("UPDATE assure  SET nomfr = $1 , prenomfr = $2 ,nomarabe = $3 , prenomarabe = $4 , date_naissance = $5 , numero_ss = $6 , adresse = $7 , adresse_mail = $8  , date_fin_droit = $9 WHERE id = $10 " , 
    [nomfr , prenomfr , nomarabe , prenomarabe , date_naissance , numero_ss , adresse ,
     adresse_mail , date_fin_droit , id])
 

      res.status(200).send(`User modified with ID: ${id}`)

  } catch (error) {
    res.status(400)
    res.send(error.message)
  }

 }

 const deleteAssure = (req, res) => {
  const id = parseInt(req.params.id)

  pool.query('DELETE FROM assure WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`Assure deleted with ID: ${id}`)
  })
}




 //------------------------------------------------------------------

module.exports = {
  getAssures,
  getAssureByID ,
  postAssure, 
  updateAssure,
  deleteAssure,
}