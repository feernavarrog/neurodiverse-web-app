-- ==========================================
-- CODIGO (EJECUTADO POR USUARIO ADMIN) 
-- PARA CREACION DE USUARIO CONEXION DE APLICACION
-- ==========================================

-- Crear el usuario del sistema
CREATE USER neurodiverse_user IDENTIFIED BY NeuroDiverse2025
DEFAULT TABLESPACE users
TEMPORARY TABLESPACE temp
QUOTA UNLIMITED ON users;

-- Otorgar privilegios al usuario del sistema
GRANT CONNECT, RESOURCE TO neurodiverse_user;
-- Asignar permisos para administrar sus propias tablas
GRANT CREATE TABLE, CREATE VIEW, CREATE SEQUENCE, CREATE PROCEDURE, CREATE TRIGGER TO neurodiverse_user;

-- ==========================================
-- CODIGO (EJECUTADO POR USUARIO neurodiverse_user DUE�O DE TABLAS)
-- PARA CREACION Y POBLADO INICIAL DEL SISTEMA
-- ==========================================

-- Eliminar las tablas en orden (para proposito de testeo)
DROP TABLE order_product CASCADE CONSTRAINTS;
DROP TABLE app_order CASCADE CONSTRAINTS;
DROP TABLE product CASCADE CONSTRAINTS;
DROP TABLE app_category CASCADE CONSTRAINTS;
DROP TABLE brand CASCADE CONSTRAINTS;
DROP TABLE user_condition CASCADE CONSTRAINTS;
DROP TABLE condition CASCADE CONSTRAINTS;
DROP TABLE app_user CASCADE CONSTRAINTS;

-- Tabla de marcas
CREATE TABLE brand (
    brand_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    brand_name VARCHAR2(255) NOT NULL UNIQUE
);

-- Tabla de categor�as
CREATE TABLE app_category (
    category_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    category_name        VARCHAR2(255) NOT NULL UNIQUE,
    category_description VARCHAR2(1000)
);

-- Tabla de condiciones (patolog�as)
CREATE TABLE condition (
    condition_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    condition_name         VARCHAR2(255) NOT NULL UNIQUE
);

-- Tabla de usuarios
CREATE TABLE app_user (
    user_id                 NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    rut                     VARCHAR2(15) NOT NULL UNIQUE,
    email                   VARCHAR2(255) NOT NULL UNIQUE,
    user_password                VARCHAR2(255),
    first_name              VARCHAR2(100) NOT NULL,
    last_name               VARCHAR2(100) NOT NULL,
    birth_date              DATE NOT NULL,
    city                    VARCHAR2(100) NOT NULL,
    district                VARCHAR2(100) NOT NULL,
    street                  VARCHAR2(255) NOT NULL,
    street_number                  VARCHAR2(10) NOT NULL,
    mobile_phone            VARCHAR2(20) NOT NULL,
    additional_address_info VARCHAR2(255),
    active                  NUMBER(1) DEFAULT 1 CHECK (active IN (0,1)), -- 1 = activo, 0 = inactivo
    user_role                    VARCHAR2(20) NOT NULL CHECK (user_role IN ('admin', 'customer')) -- Define el tipo de usuario
);

-- Tabla de productos
CREATE TABLE product (
    product_id      NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    code            VARCHAR2(50) NOT NULL UNIQUE,
    product_name            VARCHAR2(255) NOT NULL,
    product_description     VARCHAR2(1000) NOT NULL,
    price           NUMBER(10) NOT NULL,
    discount        NUMBER(5,2) DEFAULT 0 CHECK (discount BETWEEN 0 AND 100), -- Descuento en porcentaje
    stock           NUMBER NOT NULL,
    reference_photo VARCHAR2(255),
    brand_id        NUMBER NOT NULL,
    category_id     NUMBER NOT NULL,
    active          NUMBER(1) DEFAULT 1 CHECK (active IN (0,1)), -- 1 = activo, 0 = inactivo
    FOREIGN KEY (brand_id) REFERENCES brand(brand_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES app_category(category_id) ON DELETE CASCADE
);

-- Tabla de pedidos
CREATE TABLE app_order (
    order_id         NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    subtotal         NUMBER(10) NOT NULL,
    shipping_address VARCHAR2(255) NOT NULL,
    total            NUMBER(10) NOT NULL,
    status           VARCHAR2(50) NOT NULL CHECK (status IN ('pendiente', 'enviado', 'entregado', 'cancelado')),
    card_last_four   VARCHAR2(4) NOT NULL,
    user_id          NUMBER NOT NULL,
    order_date DATE DEFAULT SYSDATE,
    active          NUMBER(1) DEFAULT 1 CHECK (active IN (0,1)), -- 1 = activo, 0 = cancelado
    FOREIGN KEY (user_id) REFERENCES app_user(user_id) ON DELETE CASCADE
);

-- Tabla intermedia para pedidos y productos
CREATE TABLE order_product (
    order_id   NUMBER NOT NULL,
    product_id NUMBER,
    quantity   NUMBER(10) NOT NULL,
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES app_order(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE SET NULL
);

-- Tabla intermedia para usuarios y condiciones (patolog�as)
CREATE TABLE user_condition (
    user_id      NUMBER NOT NULL,
    condition_id NUMBER,
    PRIMARY KEY (user_id, condition_id),
    FOREIGN KEY (user_id) REFERENCES app_user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (condition_id) REFERENCES condition(condition_id) ON DELETE SET NULL
);

-- ==========================================
-- INSERCI�N DEL USUARIO ADMINISTRADOR DEL SISTEMA (CARLA NUESTRA CLIENTE)
-- ==========================================
INSERT INTO app_user (rut, email, user_password, first_name, last_name, birth_date, city, district, street, street_number, mobile_phone, additional_address_info, active, user_role)
VALUES ('00000000-0', 'carla@neurodiverse.cl', 'Neurodiverse2025', 'Carla', 'Lopez', TO_DATE('20-05-1990', 'DD-MM-YYYY'), 'Santiago', 'Providencia', 'Francisco Bilbao', '1233', '987654321', NULL, 1, 'admin');

-- ==========================================
-- DATOS OFICIALES INICIALES DEFINIDOS POR EL EQUIPO
-- ==========================================

-- Insertar marcas de productos
INSERT INTO brand (brand_name) VALUES ('NeuroTech Solutions');
INSERT INTO brand (brand_name) VALUES ('MindEase Products');
INSERT INTO brand (brand_name) VALUES ('CalmLife Gear');
INSERT INTO brand (brand_name) VALUES ('FocusTools');

-- Insertar categor�as oficiales precargadas
INSERT INTO app_category (category_name, category_description) VALUES ('Sin categor�a', '');
INSERT INTO app_category (category_name, category_description) VALUES ('Aislamiento Auditivo', 'Productos dise�ados para reducir el ruido externo y mejorar la concentraci�n.');
INSERT INTO app_category (category_name, category_description) VALUES ('Entorno Suave', 'Productos dise�ados para mejorar la comodidad sensorial en el hogar.');
INSERT INTO app_category (category_name, category_description) VALUES ('Gadgets', 'Herramientas y accesorios dise�ados para facilitar el d�a a d�a.');
INSERT INTO app_category (category_name, category_description) VALUES ('Producto Futuro', 'Productos que estar�n disponibles en el futuro.');

-- Insertar condiciones neurodivergentes asociadas a los clientes
INSERT INTO condition (condition_name) VALUES ('Trastorno del Espectro Autista (TEA)');
INSERT INTO condition (condition_name) VALUES ('TDAH');
INSERT INTO condition (condition_name) VALUES ('Dislexia');
INSERT INTO condition (condition_name) VALUES ('Dispraxia');
INSERT INTO condition (condition_name) VALUES ('Otra');

-- Insertar productos oficiales precargados en la base
INSERT INTO product (code, product_name, product_description, price, discount, stock, reference_photo, brand_id, category_id, active)
VALUES ('PROD001', 'Aud�fonos para dormir', 
'Estos aud�fonos de silicona flexible son ideales para dormir. Su dise�o permite comodidad incluso para quienes duermen de lado y su cable largo brinda libertad de movimiento. No dependen de bater�a, asegurando noches sin interrupciones.', 
15990, 25, 100, 'audifonos_dormir.jpeg', 1, 2, 1);

INSERT INTO product (code, product_name, product_description, price, discount, stock, reference_photo, brand_id, category_id, active)
VALUES ('PROD002', 'Aud�fonos con cancelaci�n de ruido', 
'Aud�fonos de alta fidelidad con almohadillas suaves y cancelaci�n de ruido externa, ideales para personas neurodivergentes. Conexi�n Bluetooth 5.1 y opci�n de cable. Bater�a de 28 horas de reproducci�n.', 
54990, 25, 75, 'audifonos_cancelacion.jpeg', 1, 2, 1);

INSERT INTO product (code, product_name, product_description, price, discount, stock, reference_photo, brand_id, category_id, active)
VALUES ('PROD003', 'Lentes Oscuros Polarizados', 
'Lentes polarizados dise�ados para reducir la sensibilidad a la luz. Dise�o adaptable y ligero, con protecci�n contra reflejos. Incluye bolsita, pa�o de microfibra y colgador.', 
19990, 0, 120, 'lentes_polarizados.jpeg', 3, 3, 1);

INSERT INTO product (code, product_name, product_description, price, discount, stock, reference_photo, brand_id, category_id, active)
VALUES ('PROD004', 'M�scara tapa ojos', 
'M�scara ultra suave, ideal para bloqueos sensoriales en ambientes iluminados. Perfecta para dormir, aliviar migra�as y reducir la sobrecarga lum�nica.', 
12990, 0, 90, 'mascara_tapa_ojos.jpeg', 3, 3, 1);

INSERT INTO product (code, product_name, product_description, price, discount, stock, reference_photo, brand_id, category_id, active)
VALUES ('PROD005', 'Slug Fidget', 
'Juguete sensorial articulado en forma de babosa. Suave y flexible, perfecto para aliviar el estr�s y mejorar la concentraci�n.', 
9990, 0, 50, 'slug_fidget.jpeg', 2, 5, 1);

INSERT INTO product (code, product_name, product_description, price, discount, stock, reference_photo, brand_id, category_id, active)
VALUES ('PROD006', 'Patita Antiestr�s', 
'Objeto antiestr�s con forma de pata de gato, con textura suave y botones t�ctiles para estimulaci�n sensorial.', 
7990, 0, 60, 'patita_antiestres.jpeg', 2, 5, 1);

INSERT INTO product (code, product_name, product_description, price, discount, stock, reference_photo, brand_id, category_id, active)
VALUES ('PROD007', 'Fidget Cube', 
'Cubo antiestr�s con m�ltiples botones y mecanismos dise�ados para mantener las manos ocupadas y mejorar la concentraci�n.', 
11990, 0, 70, 'fidget_cube.jpeg', 2, 5, 1);

INSERT INTO product (code, product_name, product_description, price, discount, stock, reference_photo, brand_id, category_id, active)
VALUES ('PROD008', 'Fidget Spinner Azul', 
'Dispositivo giratorio dise�ado para aliviar el estr�s y mejorar la concentraci�n. Ideal para personas con TDAH, ansiedad o necesidades sensoriales espec�ficas.', 
4990, 0, 50, 'spinner.png', 4, 4, 1);

INSERT INTO product (code, product_name, product_description, price, discount, stock, reference_photo, brand_id, category_id, active)
VALUES ('PROD009', 'Pop It Arco�ris Alfabeto', 
'Juguete sensorial de silicona con letras del abecedario. Estimula el tacto y la motricidad fina, ideal para momentos de relajaci�n o aprendizaje l�dico.', 
5990, 0, 50, 'fidgetoy.png', 4, 4, 1);

-- Insertar 2 usuarios (clientes) de testeo
INSERT INTO app_user (rut, email, user_password, first_name, last_name, birth_date, city, district, street, street_number, mobile_phone, additional_address_info, active, user_role)
VALUES ('23456789-0', 'test1@neurodiverse.cl', 'passw0rd', 'Mar�a', 'L�pez', TO_DATE('15-08-1995', 'DD-MM-YYYY'), 'Santiago', 'Providencia', 'Calle Falsa', '123', '912345678', NULL, 1, 'customer');

INSERT INTO app_user (rut, email, user_password, first_name, last_name, birth_date, city, district, street, street_number, mobile_phone, additional_address_info, active, user_role)
VALUES ('34567890-1', 'test2@neurodiverse.cl', 'passw0rd', 'Carlos', 'Gonz�lez', TO_DATE('10-03-1988', 'DD-MM-YYYY'), 'Valpara�so', 'Vi�a del Mar', 'Paseo Mar�timo', '456', '923456789', NULL, 1, 'customer');

-- Asignar condiciones a los clientes test
INSERT INTO user_condition (user_id, condition_id) VALUES (2, 1); -- Mar�a tiene Trastorno del Espectro Autista
INSERT INTO user_condition (user_id, condition_id) VALUES (3, 2); -- Carlos tiene TDAH

-- Insertar �rdenes de pedido asociadas a los clientes test
INSERT INTO app_order (subtotal, shipping_address, total, status, card_last_four, user_id, order_date, active)
VALUES (54990, 'Calle Falsa 123, Providencia, Santiago', 49491, 'pendiente', '1234', 2, SYSDATE, 1);

INSERT INTO app_order (subtotal, shipping_address, total, status, card_last_four, user_id, order_date, active)
VALUES (19990, 'Paseo Mar�timo 456, Vi�a del Mar, Valpara�so', 18990, 'pendiente', '5678', 3, SYSDATE, 1);

-- Asociar productos a las �rdenes con cantidad
INSERT INTO order_product (order_id, product_id, quantity) VALUES (1, 2, 1);
INSERT INTO order_product (order_id, product_id, quantity) VALUES (2, 3, 2);

COMMIT;

-- PROCEDIMIENTO DE DESCUENTO MASIVO (funcion y procedimiento)
--FUNCION ALMACENADA PARA APLICAR DESCUENTO A UNA ID DE PRODUCTO
CREATE OR REPLACE FUNCTION apply_discount_to_product(
    p_product_id NUMBER,
    p_discount NUMBER
) RETURN NUMBER IS
BEGIN
    -- Actualizar el descuento del producto
    UPDATE product
    SET discount = p_discount
    WHERE product_id = p_product_id
    AND active = 1;
    
    -- Devolver el nuevo descuento aplicado
    RETURN p_discount;
END;
/

--PROCEDIMIENTO QUE EJECUTA LA FUNCION PARA APLICAR EL DESCUENTO POR CATEGORIA
CREATE OR REPLACE PROCEDURE apply_discount_by_category(
    p_category_id NUMBER,
    p_discount NUMBER
) AS
    v_new_discount NUMBER;
BEGIN
    -- Recorrer todos los productos activos de la categor�a seleccionada
    FOR prod IN (
        SELECT product_id 
        FROM product
        WHERE category_id = p_category_id
        AND active = 1
    ) LOOP
        -- Aplicar el descuento usando la funci�n y almacenarlo en una variable
        v_new_discount := apply_discount_to_product(prod.product_id, p_discount);
        
        -- Actualizar manualmente el producto (por si la funci�n no lo hace bien)
        UPDATE product
        SET discount = v_new_discount
        WHERE product_id = prod.product_id;
    END LOOP;
END;
/

-- CONSULTA PARA GENERAR INFORME DE PORCENTAJE DE USUARIOS CON CONDICIONES CLINICAS SELECCIONADAS
SELECT 
    c.condition_name AS "Condici�n",
    COALESCE(
        (SELECT COUNT(DISTINCT uc.user_id)
         FROM user_condition uc
         JOIN app_user u ON uc.user_id = u.user_id
         WHERE uc.condition_id = c.condition_id
         AND u.active = 1) 
        / NULLIF((SELECT COUNT(*) FROM app_user WHERE user_role = 'customer' AND active = 1), 0), 0
    ) AS "Porcentaje"
FROM condition c;
