const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '',
  port: 5432,
})

// /* 
// GET: / | displayHome()
// GET: /users | getUsers()
// GET: /users/:id | getUserById()
// POST: /users | createUser()
// PUT: /users/:id | updateUser()
// DELETE: /users/:id | deleteUser()
// */

// const getUsers = (request, response) => {
// pool.query('SELECT * FROM users ORDER BY user_id ASC', (error,results) => {
//   if(error){
//     throw error;
//   }
//   response.status(200).json(results.rows);
// })
// };

const getUserByUsername = async (username) => {

  return pool.query(`SELECT * FROM users WHERE user_name = $1;`, [username])

}

// const getUserById = (id) => {

//   // const id  = parseInt(request.params.id)

//   // pool.query é uma chamada assíncrona
//   pool.query(`SELECT * FROM users WHERE user_id = ${id}`, (error,results) => {
//     if(error){
//       throw error;
//     }
//     response.status(200).json(results.rows[0]);
//   })
// };

const getObjects = () => {
  return pool.query('SELECT obj_id as id, obj_name as name, obj_image_url as img_url FROM messier_objs ORDER BY obj_id ASC')
};

// const getObjectById = (request, response) => {

//   const id  = parseInt(request.params.id)

//   pool.query(`SELECT * FROM messier_objs WHERE obj_id = ${id}`, (error,results) => {
//     if(error){
//       throw error;
//     }
//     response.status(200).json(results.rows[0]);
//   })
// };

// const getStickers = (request, response) => {

//   pool.query('SELECT * FROM stickers ORDER BY fk_user_id ASC', (error,results) => {
//     if(error){
//       throw error;
//     }
//     response.status(200).json(results.rows);
//   })
// };

// const getStickersByUser = (request, response) => {

//   const id  = parseInt(request.params.id)

//   pool.query(`SELECT * FROM stickers WHERE fk_user_id = ${id}`, (error,results) => {
//     if(error){
//       throw error;
//     }
//     response.status(200).json(results.rows);
//   })
// };

const getStickersByUsername = async (username) => {


  return pool.query(`SELECT s.sticker_glued as colada,	m.obj_id as id,	m.obj_name as nome,	m.obj_image_url as img_url FROM stickers s INNER JOIN users u ON u.user_id = s.fk_user_id	INNER JOIN messier_objs m ON m.obj_id = s.fk_obj_id WHERE u.user_name = $1 ORDER BY id ASC;`,
  [username])
};

// const getStickerById = (request, response) => {

//   const id  = parseInt(request.params.id)

//   pool.query(`SELECT * FROM stickers WHERE sticker_id = ${id}`, (error,results) => {
//     if(error){
//       throw error;
//     }
//     response.status(200).json(results.rows[0]);
//   })
// };

const createUser = async (name, password, token) => {

  return pool.query(`INSERT INTO users (user_name,user_password,user_token) VALUES ( $1 , $2 , $3 ) RETURNING *`,[name,password,token]);
};

// const createObject = (request, response) => {

//   const {name, description, image_url, rarity} = request.body

//   pool.query(`INSERT INTO messier_objs (obj_name,obj_description,obj_image_url,obj_rarity) VALUES ( $1, $2 , $3 , $4 ) RETURNING *`,[name , description , image_url , rarity], (error,results) => {
//     if(error){
//       throw error;
//     }
//     response.status(201).send(`Messier Object added with ID: ${results.rows[0].obj_id}`)
//   })
// };

const createSticker = (user_id, obj_id) => {

  return pool.query(`INSERT INTO stickers (fk_user_id,fk_obj_id) VALUES ( $1 , $2 ) RETURNING *`,
  [user_id,obj_id])
};

const updateUserTokenById = (id, token) => {
  return pool.query(
    `UPDATE users SET user_token = $1 WHERE user_id = $2 RETURNING *`,
  [token,id])
}

const updateUserLastPackage = async (id) => {
  return pool.query(`UPDATE users SET user_last_package = CURRENT_TIMESTAMP WHERE user_id = $1 RETURNING *`,
  [id])
}


// const updateObject = (request,response) => {
//   const id  = parseInt(request.params.id)
//   const {name, description, image_url, rarity} = request.body

//   pool.query(`UPDATE messier_objs SET obj_name = $1 , obj_description = $2 , obj_image_url = $3 , obj_rarity = $4 WHERE obj_id = $5 `,[name,description,image_url,rarity,id],
//   (error, results) => {
//     if(error){
//       throw error
//     }
//     response.status(200).send(`Messier Object modified with obj_id ${results.rows[0].object_id}`)
//   })
// }

const glueSticker = async (user_id, sticker_id) => {
  return pool.query(`UPDATE stickers SET sticker_glued = TRUE WHERE fk_user_id = $1 AND fk_obj_id = $2 RETURNING *`,
  [user_id, sticker_id])
}


// const deleteUserById = (request, response) => {
//   const id  =  parseInt(request.params.id)

//   pool.query(`DELETE FROM users WHERE user_id = $1`,[id],(error, results) => {
//     if(error){
//       throw error
//     }

//     response.status(200).send(`User deleted with user_id ${id}`)

//   })
// }

// const deleteUserByUsername = (request, response) => {
//   const username  =  request.params.username

//   pool.query(`DELETE FROM users WHERE user_name = $1`,[username],(error, results) => {
//     if(error){
//       throw error
//     }

//     response.status(200).send(`User deleted with user_name ${username}`)

//   })
// }

// const deleteObject = (request, response) => {
//   const id  =  parseInt(request.params.id)

//   pool.query(`DELETE FROM messier_objs WHERE obj_id = $1`,[id],(error, results) => {
//     if(error){
//       throw error
//     }

//     response.status(200).send(`Messier Object deleted with obj_id ${id}`)

//   })
// }

// const deleteSticker = (request, response) => {
//   const id  =  parseInt(request.params.id)

//   pool.query(`DELETE FROM stickers WHERE sticker_id = $1`,[id],(error, results) => {
//     if(error){
//       throw error
//     }

//     response.status(200).send(`Sticker deleted with sticker_id ${id}`)

//   })
// }

module.exports = {
//   getUsers,
//   getUserById,
  getUserByUsername,
  getObjects,
//   getObjectById,
//   getStickers,
//   getStickersByUser,
  getStickersByUsername,
//   getStickerById,

  createUser,
//   createObject,
  createSticker,

  updateUserTokenById,
  updateUserLastPackage,
//   updateObject,
  glueSticker,

//   deleteUserById,
//   deleteUserByUsername,
//   deleteObject,
//   deleteSticker
}