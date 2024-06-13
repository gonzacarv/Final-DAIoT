-- Configuración inicial de la base de datos y ajustes de zona horaria
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";
SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Creación de la base de datos DAM si no existe
CREATE DATABASE IF NOT EXISTS `DAM` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `DAM`;

-- Creación de la tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Creación de la tabla de consumos
CREATE TABLE IF NOT EXISTS consumos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    descripcion VARCHAR(255),
    estado BOOLEAN,
    intensidad INT CHECK (intensidad BETWEEN 0 AND 100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Creación de la tabla de grupos
CREATE TABLE IF NOT EXISTS grupos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    descripcion VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Creación de la tabla de relaciones entre grupos y consumos
CREATE TABLE IF NOT EXISTS grupos_consumos (
    grupo_id INT,
    consumo_id INT,
    PRIMARY KEY (grupo_id, consumo_id),
    FOREIGN KEY (grupo_id) REFERENCES grupos(id),
    FOREIGN KEY (consumo_id) REFERENCES consumos(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Creación de la tabla de programación horaria para consumos
CREATE TABLE IF NOT EXISTS programacion_horaria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    consumo_id INT,
    inicio TIME,
    fin TIME,
    FOREIGN KEY (consumo_id) REFERENCES consumos(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Creación de la tabla de programación para grupos
CREATE TABLE IF NOT EXISTS programacion_grupos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    grupo_id INT,
    inicio TIME,
    fin TIME,
    FOREIGN KEY (grupo_id) REFERENCES grupos(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Inserción de usuarios
INSERT INTO usuarios (nombre, email, password) VALUES
('gonza', 'gonzalo@ubaiot.com', '1234'),
('pedro', 'pedro@ubaiot.com', '1234');

-- Inserción de consumos
INSERT INTO consumos (nombre, descripcion, estado, intensidad) VALUES
('Lámpara de sala', 'Iluminación en la sala', TRUE, 80),
('Luz de cocina', 'Iluminación en la cocina', TRUE, 70),
('Lámpara de estudio', 'Iluminación en el estudio', TRUE, 75),
('Luz de baño', 'Iluminación en el baño', TRUE, 60),
('Luz de dormitorio 1', 'Iluminación en el dormitorio principal', TRUE, 85),
('Luz de dormitorio 2', 'Iluminación en el segundo dormitorio', TRUE, 65),
('Lámpara de pasillo', 'Iluminación en el pasillo', TRUE, 50),
('Foco exterior', 'Iluminación exterior del hogar', TRUE, 90),
('Lámpara de comedor', 'Iluminación en el comedor', TRUE, 80),
('Luz de patio', 'Iluminación en el patio', TRUE, 95),
('Luz de garaje', 'Iluminación en el garaje', TRUE, 70),
('Luz de porche', 'Iluminación en el porche', TRUE, 85),
('Foco del jardín', 'Iluminación en el jardín', TRUE, 80),
('Lámpara de sótano', 'Iluminación en el sótano', TRUE, 75),
('Lámpara de entrada', 'Iluminación en la entrada', TRUE, 65),
('Lámpara de oficina', 'Iluminación en la oficina', TRUE, 90),
('Luz de vestíbulo', 'Iluminación en el vestíbulo', TRUE, 55),
('Foco de escalera', 'Iluminación en la escalera', TRUE, 60),
('Calefactor sala', 'Calefacción para la sala', TRUE, 100),
('Calefactor dormitorio', 'Calefacción para el dormitorio', TRUE, 100),
('Calefactor comedor', 'Calefacción para el comedor', TRUE, 100),
('Calefactor estudio', 'Calefacción para el estudio', TRUE, 100),
('Ventilador de techo sala', 'Ventilación para la sala', TRUE, 50),
('Ventilador de pie comedor', 'Ventilación para el comedor', TRUE, 45),
('Ventilador de pared cocina', 'Ventilación para la cocina', TRUE, 40);

-- Inserción de grupos
INSERT INTO grupos (nombre, descripcion) VALUES
('Zona Común', 'Incluye sala, comedor, cocina'),
('Zona Privada', 'Incluye dormitorios y baños'),
('Zona de Trabajo', 'Incluye oficina y estudio'),
('Zona Exterior', 'Incluye jardín, porche y patio'),
('Zona de Servicios', 'Incluye garaje y sótano');

-- Relacionar consumos con grupos
INSERT INTO grupos_consumos (grupo_id, consumo_id) VALUES
(1, 1), (1, 2), (1, 3),
(2, 4), (2, 5), (2, 6), 
(3, 7), (3, 8), (3, 19), 
(4, 9), (4, 10), (4, 17), 
(5, 11), (5, 12), (5, 18); 

-- Programación horaria para algunos consumos
INSERT INTO programacion_horaria (consumo_id, inicio, fin) VALUES
(1, '06:00:00', '23:00:00'), 
(2, '06:30:00', '22:00:00'), 
(3, '07:00:00', '22:30:00'),  
(4, '18:00:00', '23:59:00'), 
(5, '18:00:00', '23:59:00'),  
(6, '05:00:00', '23:30:00'), 
(7, '16:00:00', '23:00:00'), 
(8, '08:00:00', '18:00:00'),  
(9, '19:00:00', '23:00:00'),  
(10, '20:00:00', '01:00:00'); 

-- Programación de algunos grupos
INSERT INTO programacion_grupos (grupo_id, inicio, fin) VALUES
(1, '06:00:00', '22:00:00'), (2, '07:00:00', '23:00:00'),
(3, '09:00:00', '19:00:00');

COMMIT;


ALTER TABLE programacion_horaria
ADD UNIQUE (consumo_id);


