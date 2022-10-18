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

// const getUserByUsername = ( request, response) => {

//   const username = request.params.username

//   pool.query(`SELECT * FROM users WHERE user_name = $1`, [username] ,(error,results) => {
//     if(error){
//       throw error
//     }
//     response.status(200).json(results.rows[0])
//   })

// }

// const getUserById = (request, response) => {

//   const id  = parseInt(request.params.id)

//   pool.query(`SELECT * FROM users WHERE user_id = ${id}`, (error,results) => {
//     if(error){
//       throw error;
//     }
//     response.status(200).json(results.rows[0]);
//   })
// };

// const getOjects = (request, response) => {
//   pool.query('SELECT * FROM messier_objs ORDER BY obj_id ASC', (error,results) => {
//     if(error){
//       throw error;
//     }
//     response.status(200).json(results.rows);
//   })
// };

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

// const getStickersByUserId = (request, response) => {

//   const id  = parseInt(request.params.id)

//   pool.query(`SELECT * FROM stickers WHERE fk_user_id = ${id}`, (error,results) => {
//     if(error){
//       throw error;
//     }
//     response.status(200).json(results.rows);
//   })
// };

// const getStickersByUsername = (request, response) => {

//   const username  = request.params.username

//   var user_id = 0

//   pool.query(`SELECT * FROM users WHERE user_name = $1`,[username], (error,results) => {
//     if(error){
//       throw error;
//     }
//     if(results.rows.length > 0){
//       user_id = results.rows[0].user_id

//       pool.query(`SELECT * FROM stickers WHERE fk_user_id = $1`,[user_id], (error,results) => {
//         if(error){
//           throw error;
//         }
//         response.status(200).json(results.rows);
//       })
//     }
//     else{
//       response.status(200).json([]);
//     }
    
//   })
// };

// const getStickerById = (request, response) => {

//   const id  = parseInt(request.params.id)

//   pool.query(`SELECT * FROM stickers WHERE sticker_id = ${id}`, (error,results) => {
//     if(error){
//       throw error;
//     }
//     response.status(200).json(results.rows[0]);
//   })
// };

// Retorna o ID do usuário criado, ou levanta uma exceção
const createUser = (name, password, token) => {

    return pool.query(`INSERT INTO users (user_name,user_password,user_token) VALUES ( $1 , $2 , $3 ) RETURNING *`,[name,password,token])
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

// const createSticker = (request, response) => {

//   const {user_id, obj_id} = request.body

//   pool.query(`INSERT INTO stickers (fk_user_id,fk_obj_id) VALUES ( $1 , $2 ) RETURNING *`,[user_id,obj_id],
//    (error,results) => {
//     if(error){
//       throw error;
//     }
//     response.status(201).send(`Sticker added with ID: ${results.rows[0].sticker_id}`)
//   })
// };

// const updateUserById = (request,response) => {
//   const id  = parseInt(request.params.id)
//   const {name, password, token} = request.body

//   pool.query(`UPDATE users SET user_name = $1 , user_password = $2 , user_token = $3 WHERE user_id = $4 RETURNING *`,[name,password,token,id],
//   (error, results) => {
//     if(error){
//       throw error
//     }
//     response.status(200).send(`User modified with user_id ${results.rows[0].user_id}`)
//   })
// }

// const updateUserLastPackage = (request,response) => {
//   const id  = parseInt(request.params.id)

//   pool.query(`UPDATE users SET user_last_package = CURRENT_TIMESTAMP WHERE user_id = $1 RETURNING *`,[id],
//   (error, results) => {
//     if(error){
//       throw error
//     }
//     response.status(200).send(`User modified with user_id ${results.rows[0].user_id}`)
//   })
// }


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

// const updateSticker = (request,response) => {
//   const id  = parseInt(request.params.id)
//   const {user_id, obj_id, glued} = request.body

//   pool.query(`UPDATE stickers SET fk_user_id = $1 , fk_obj_id = $2 , sticker_glued = $3 WHERE sticker_id = $4 RETURNING *`,[user_id,obj_id,glued,id],
//   (error, results) => {
//     if(error){
//       throw error
//     }
//     response.status(200).send(`Sticker modified with sticker_id ${results.rows[0].sticker_id} to glued = ${results.rows[0].sticker_glued}`)
//   })
// }


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
//   getUserByUsername,
//   getOjects,
//   getObjectById,
//   getStickers,
//   getStickersByUserId,
//   getStickersByUsername,
//   getStickerById,

  createUser,
//   createObject,
//   createSticker,

//   updateUserById,
//   updateUserLastPackage,
//   updateObject,
//   updateSticker,

//   deleteUserById,
//   deleteUserByUsername,
//   deleteObject,
//   deleteSticker
}