const pool = require('./config')
// operations sur transports


const postTransport = async (req, res) => {
  try {
    const { id_operateur , motif , categorie , id_assure , description , id_itineraire , date } = req.body
    const createdAt =  new Date();

    const newTransport = await pool.query("INSERT INTO transport values( nextval('serialtransport') , $1, $2, $3 , $4 , $5 , $6 , $7 ) RETURNING * " , 
    [id_operateur ,  motif , categorie , id_assure , description , id_itineraire , date ])

    res.json(newTransport.rows[0]);
   } catch (error) {
       console.error(error.message)
   }

}



const getTransports = async (req, res) => {
  try {
    
       const results =  await pool.query('SELECT * FROM transport ORDER BY id ASC');

      res.status(200).json(results.rows)

   } catch (error) {
       console.error(error.message)
   }

}

 const getTransportByID = async ( req , res) => {
  try {
    
    const id = parseInt(req.params.id)

    const results = await pool.query('SELECT * FROM transport , assure  WHERE  transport.id = $1 AND transport.id_assure = assure.id ' , [id])
    //transport.id_assure = assure.id AND
    res.status(200).json(results.rows)

  } catch (error) {
    res.send(error.message)
  }

 }

 const updateTransport = async ( req , res) => {
  try {
    
    const id = req.params.id
    const { id_operateur , motif , categorie , id_assure , description , id_itineraire , date } = req.body    
    
    const newTransport = await pool.query("UPDATE transport  SET  id_operateur = $1 , motif =$2 , categorie = $3 , id_assure = $4 , description = $5 , id_itineraire= $6 , date = $7 WHERE id = $8"  , 
    [ id_operateur , motif , categorie , id_assure , description , id_itineraire , date , id])
 

      res.status(200).send(`User modified with ID: ${id}`)

  } catch (error) {
    res.status(400)
    res.send(error.message)
  }

 }

 const deleteTransport = (req, res) => {
  const id = parseInt(req.params.id)

  pool.query('DELETE FROM transport WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`Transport deleted with ID: ${id}`)
  })
}




 //------------------------------------------------------------------

module.exports = {
  getTransports,
  getTransportByID ,
  postTransport, 
  updateTransport,
  deleteTransport,
}