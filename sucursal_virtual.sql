/* tabla usuarios
id: Identificador único del usuario (se asume que es autoincremental).
email: Dirección de correo electrónico del usuario.
password: Contraseña del usuario.
rol: Rol del usuario (puede ser un administrador, miembro, etc.).
created: Fecha y hora de creación del usuario.
updated: Fecha y hora de la última actualización del usuario.
En la tabla "Usuario_Suministro", se definen las siguientes columnas:
*/

/* tabla suministros
id: Identificador único del suministro (se asume que es autoincremental).
id_usuario: ID del usuario al que pertenece el suministro.
is_envio: Indicador booleano que indica si se debe enviar el suministro al usuario o no.
suministro: Descripción o nombre del suministro.
created: Fecha y hora de creación del suministro.
updated: Fecha y hora de la última actualización del suministro.
Se agrega una restricción de clave externa (FOREIGN KEY) para relacionar la columna id_usuario con la columna id de la tabla "Usuario". 
*/
CREATE TABLE users_role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    rol VARCHAR(50) NOT NULL,
    created DATETIME NOT NULL default CURRENT_TIMESTAMP,
    updated DATETIME NOT NULL default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    id_role INT NOT NULL default 1,
    created DATETIME NOT NULL default CURRENT_TIMESTAMP,
    updated DATETIME NOT NULL default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_role) REFERENCES users_role(id)
);

CREATE TABLE users_supplies (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    is_envio BOOLEAN NOT NULL default TRUE,
    suministro VARCHAR(100) NOT NULL,
    created DATETIME NOT NULL default CURRENT_TIMESTAMP,
    updated DATETIME NOT NULL default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES users(id)
);
