const pool = require('./config')
// operations sur operateurs


const postOperateur = async (req, res) => {
  try {
    const {nomfr , prenomfr , nomarabe , prenomarabe , password, adresse ,
    adresse_mail , numero_telephone , nb_vehicules , nom_organisme} = req.body
    const dateAffiliation = new Date();
    const createdAt =  new Date();

    const newOperateur = await pool.query("INSERT INTO operateur values( nextval('serialoperateur') , $1, $2, $3 , $4 , $5 , $6 , $7 , $8 , $9 , $10 , $11 , $12 ) RETURNING * " , 
    [nomfr , prenomfr , nomarabe , prenomarabe , password,createdAt ,adresse ,
      adresse_mail , numero_telephone , dateAffiliation , nb_vehicules , nom_organisme])

    res.json(newOperateur.rows[0]);
   } catch (error) {
       console.error(error.message)
   }

}



const getOperateurs = async (req, res) => {
  try {
    
       const results =  await pool.query('SELECT * FROM operateur ORDER BY id ASC');

      res.status(200).json(results.rows)

   } catch (error) {
       console.error(error.message)
   }

}

 const getOperateurByID = async ( req , res) => {
  try {
    
    const id = parseInt(req.params.id)

    const results = await pool.query('SELECT * FROM operateur WHERE id = $1 ' , [id])
    res.status(200).json(results.rows)

  } catch (error) {
    res.sendStatus(400)
    res.send(error.message)
  }

 }

 const updateOperateur = async ( req , res) => {
  try {
    
    const id = req.params.id
    const {nomfr , prenomfr , nomarabe , prenomarabe , password, created_at, adresse ,
      adresse_mail , numero_telephone ,date_affiliation,  nb_vehicules , nom_organisme} = req.body

    
      const newOperateur = await pool.query("UPDATE operateur  SET nomfr = $1 , prenomfr = $2 ,nomarabe = $3 , prenomarabe = $4 , password = $5 , created_at = $6 , adresse = $7 , adresse_mail = $8 ,   numero_telephone = $9 , date_affiliation = $10 , nb_vehicules = $11 , nom_organisme = $12 WHERE id = $13" , 
      [nomfr , prenomfr , nomarabe , prenomarabe , password,created_at ,adresse ,
        adresse_mail , numero_telephone , date_affiliation , nb_vehicules ,nom_organisme, id])

      res.status(200).send(`User modified with ID: ${id}`)

  } catch (error) {
    res.status(400)
    res.send(error.message)
  }

 }

 const deleteOperateur = (req, res) => {
  const id = parseInt(req.params.id)

  pool.query('DELETE FROM operateur WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`Operateur deleted with ID: ${id}`)
  })
}




 //------------------------------------------------------------------

module.exports = {
  getOperateurs,
  getOperateurByID ,
  postOperateur, 
  updateOperateur,
  deleteOperateur,
}