--Ate aqui só cria o banco de dados
--Abaixo são comandos úteis.
--Para roda-los separadamente usando o PgAdmin4, selecione o comando
-- com o cursor e rode-o apertando F5, ou o simbolo de play no topo da tela.

SELECT * FROM public.user

SELECT * FROM public.messier_obj

SELECT * FROM public.sticker

INSERT INTO users (user_name,user_password,user_token) VALUES ('mario_01','12344iip','2hn3ejhQN');
INSERT INTO users (user_name,user_password,user_token) VALUES ('mario_07','12wlej3p','2hn38jkRt');

INSERT INTO stickers (fk_user_id,fk_obj_id) VALUES (1,1);
INSERT INTO stickers (fk_user_id,fk_obj_id) VALUES (1,2);
INSERT INTO stickers (fk_user_id,fk_obj_id) VALUES (2,1);
INSERT INTO stickers (fk_user_id,fk_obj_id) VALUES (2,1);
INSERT INTO stickers (fk_user_id,fk_obj_id) VALUES (2,2);

DROP TABLE messier_objs;
DROP TABLE users;
DROP TABLE stickers;



UPDATE stickers SET sticker_glued = true WHERE sticker_id = 4;

DELETE FROM users WHERE user_id = 1;

SELECT s.sticker_glued as colada,
	m.obj_id as id,
	m.obj_name as nome,
	m.obj_image_url as img_url
FROM 
	stickers s
	INNER JOIN users u ON u.user_id = s.fk_user_id
	INNER JOIN messier_objs m ON m.obj_id = s.fk_obj_id
WHERE
	u.user_name = 'MATHIAS';
