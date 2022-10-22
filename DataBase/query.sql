CREATE TABLE users (
	user_id SERIAL not null PRIMARY KEY,
	user_name varchar NOT NULL,
	user_password varchar NOT NULL,
	user_last_package TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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

ALTER TABLE IF EXISTS users
    OWNER to fig_user;

ALTER TABLE IF EXISTS messier_objs
    OWNER to fig_user;

ALTER TABLE IF EXISTS stickers
    OWNER to fig_user;

--Ate aqui só cria o banco de dados
--Abaixo são comandos úteis.
--Para roda-los separadamente usando o PgAdmin4, selecione o comando
-- com o cursor e rode-o apertando F5, ou o simbolo de play no topo da tela.

SELECT * FROM public.user

SELECT * FROM public.messier_obj

SELECT * FROM public.sticker

INSERT INTO users (user_name,user_password,user_token) VALUES ('mario_01','12344iip','2hn3ejhQN');
INSERT INTO users (user_name,user_password,user_token) VALUES ('mario_07','12wlej3p','2hn38jkRt');

INSERT INTO messier_objs (obj_name,obj_image_url,obj_rarity) VALUES ('Nebulosa do Caranguejo','http://none',2);
INSERT INTO messier_objs (obj_name,obj_image_url,obj_rarity,obj_description) VALUES ('Aglomerado da Borboleta','http://none',6,'Aglomerado aberto');

INSERT INTO stickers (user_id,obj_id) VALUES (1,1);
INSERT INTO stickers (user_id,obj_id) VALUES (1,2);
INSERT INTO stickers (user_id,obj_id) VALUES (2,1);
INSERT INTO stickers (user_id,obj_id) VALUES (2,1);
INSERT INTO stickers (user_id,obj_id) VALUES (2,2);

DROP TABLE messier_objs;
DROP TABLE users;
DROP TABLE stickers;



UPDATE stickers SET sticker_glued = true WHERE sticker_id = 4;

DELETE FROM users WHERE user_id = 1;