CREATE TABLE users (
	user_id SERIAL not null PRIMARY KEY,
	user_name varchar NOT NULL,
	user_password varchar NOT NULL,
	user_last_package TIMESTAMP DEFAULT NULL,
	user_token varchar,
	UNIQUE (user_name)
);

CREATE TABLE messier_objs (
	obj_id SERIAL not null PRIMARY KEY,
	obj_name varchar NOT NULL,
	obj_description varchar,
	obj_image_url varchar NOT NULL,
	obj_rarity SMALLINT not null
);

--tabela que relaciona as figurinhas aos usuarios
CREATE TABLE stickers (
	fk_user_id INTEGER REFERENCES users (user_id) ON DELETE CASCADE,
	fk_obj_id INTEGER REFERENCES messier_objs (obj_id) ON DELETE CASCADE,
	sticker_id SERIAL NOT NULL PRIMARY KEY,
	sticker_glued BOOLEAN DEFAULT FALSE
);

-- Comandos desnecessários se for usar o usuário padrão
ALTER TABLE IF EXISTS users
    OWNER to fig_user;

ALTER TABLE IF EXISTS messier_objs
    OWNER to fig_user;

ALTER TABLE IF EXISTS stickers
    OWNER to fig_user;