const Pool = require('pg').Pool
const pool = new Pool({
  user: 'fig_user',
  host: 'localhost',
  database: 'Figurinhas_BD',
  password: 'fig_user',
  port: 5432,
})

/* 
GET: / | displayHome()
GET: /users | getUsers()
GET: /users/:id | getUserById()
POST: /users | createUser()
PUT: /users/:id | updateUser()
DELETE: /users/:id | deleteUser()
*/

const getUsers = (request, response) => {
pool.query('SELECT * FROM users ORDER BY user_id ASC', (error,results) => {
  if(error){
    throw error;
  }
  response.status(200).json(results.rows);
})
};

const getUserById = (request, response) => {

  const id  = parseInt(request.params.id)

  pool.query(`SELECT * FROM users WHERE user_id = ${id}`, (error,results) => {
    if(error){
      throw error;
    }
    response.status(200).json(results.rows);
  })
};

const getOjects = (request, response) => {
  pool.query('SELECT * FROM messier_objs ORDER BY obj_id ASC', (error,results) => {
    if(error){
      throw error;
    }
    response.status(200).json(results.rows);
  })
};

const getObjectById = (request, response) => {

  const id  = parseInt(request.params.id)

  pool.query(`SELECT * FROM messier_objs WHERE obj_id = ${id}`, (error,results) => {
    if(error){
      throw error;
    }
    response.status(200).json(results.rows);
  })
};

const getStickers = (request, response) => {

  pool.query('SELECT * FROM stickers ORDER BY fk_user_id ASC', (error,results) => {
    if(error){
      throw error;
    }
    response.status(200).json(results.rows);
  })
};

const getStickersByUserId = (request, response) => {

  const id  = parseInt(request.params.id)

  pool.query(`SELECT * FROM stickers WHERE fk_user_id = ${id}`, (error,results) => {
    if(error){
      throw error;
    }
    response.status(200).json(results.rows);
  })
};

const getStickerById = (request, response) => {

  const id  = parseInt(request.params.id)

  pool.query(`SELECT * FROM stickers WHERE sticker_id = ${id}`, (error,results) => {
    if(error){
      throw error;
    }
    response.status(200).json(results.rows);
  })
};

const createUser = (request, response) => {

  const {name, password, token} = request.body

  pool.query(`INSERT INTO users (user_name,user_password,user_token) VALUES ( $1 , $2 , $3 ) RETURNING *`,[name,password,token], (error,results) => {
    if(error){
      throw error
    }
    response.status(201).send(`User added with ID: ${results.rows[0].user_id}`)
  })
};

const createObject = (request, response) => {

  const {name, description, image_url, rarity} = request.body

  pool.query(`INSERT INTO messier_objs (obj_name,obj_description,obj_image_url,obj_rarity) VALUES ( $1, $2 , $3 , $4 ) RETURNING *`,[name , description , image_url , rarity], (error,results) => {
    if(error){
      throw error;
    }
    response.status(201).send(`Messier Object added with ID: ${results.rows[0].obj_id}`)
  })
};

const createSticker = (request, response) => {

  const {user_id, obj_id} = request.body

  pool.query(`INSERT INTO stickers (fk_user_id,fk_obj_id) VALUES ( ${user_id} , ${obj_id} ) RETURNING *`, (error,results) => {
    if(error){
      throw error;
    }
    response.status(201).send(`Sticker added with ID: ${results.rows[0].id}`)
  })
};

const updateUser = (request,response) => {
  const id  = parseInt(request.params.id)
  const {name, password, token} = request.body

  pool.query(`UPDATE users SET user_name = ${name} user_password = ${password} user_token = ${token} WHERE user_id = ${id} `,
  (error, results) => {
    if(error){
      throw error
    }
    response.status(200).send(`User modified with user_id ${id}`)
  })
}

const updateObject = (request,response) => {
  const id  = parseInt(request.params.id)
  const {name, description, image_url, rarity} = request.body

  pool.query(`UPDATE messier_objs SET obj_name = ${name} obj_description = ${description} obj_image_url = ${image_url} obj_rarity = ${rarity} WHERE obj_id = ${id} `,
  (error, results) => {
    if(error){
      throw error
    }
    response.status(200).send(`Messier Object modified with obj_id ${id}`)
  })
}

const updateSticker = (request,response) => {
  const id  = parseInt(request.params.id)
  const {user_id, obj_id, glued} = request.body

  pool.query(`UPDATE stickers SET fk_user_id = ${user_id} fk_obj_id = ${obj_id} sticker_glued = ${glued} WHERE sticker_id = ${id} `,
  (error, results) => {
    if(error){
      throw error
    }
    response.status(200).send(`Sticker modified with sticker_id ${id}`)
  })
}

const deleteUser = (request, response) => {
  const id  =  parseInt(request.params.id)

  pool.query(`DELETE FROM users WHERE user_id = ${id}`,(error, results) => {
    if(error){
      throw error
    }

    response.status(200).send(`User deleted with user_id ${id}`)

  })
}

const deleteObject = (request, response) => {
  const id  =  parseInt(request.params.id)

  pool.query(`DELETE FROM messier_objs WHERE obj_id = ${id}`,(error, results) => {
    if(error){
      throw error
    }

    response.status(200).send(`Messier Object deleted with obj_id ${id}`)

  })
}

const deleteSticker = (request, response) => {
  const id  =  parseInt(request.params.id)

  pool.query(`DELETE FROM stickers WHERE sticker_id = ${id}`,(error, results) => {
    if(error){
      throw error
    }

    response.status(200).send(`Sticker deleted with sticker_id ${id}`)

  })
}

module.exports = {
  getUsers,
  getUserById,
  getOjects,
  getObjectById,
  getStickers,
  getStickersByUserId,
  getStickerById,
  createUser,
  createObject,
  createSticker,
  updateUser,
  updateObject,
  updateSticker,
  deleteUser,
  deleteObject,
  deleteSticker
}