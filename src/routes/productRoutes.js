// src/routes/productRoutes.js

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const productController = require('../controllers/productController');

// ==============================
// Configurar `multer` para almacenar imágenes en la carpeta "public/product-images"
const storage = multer.diskStorage({
    destination: "public/product-images/", // Nueva carpeta exclusiva para imágenes de productos
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Renombrar archivo con timestamp
    }
});

const upload = multer({ storage });

// Ruta para subir la imagen del producto
router.post("/upload-image", upload.single("productImage"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No se seleccionó ninguna imagen." });
    }
    res.json({ imageUrl: `/product-images/${req.file.filename}` });
});

// Ruta para eliminar la imagen del producto
router.delete("/delete-image/:filename", (req, res) => {
    const filePath = path.join(__dirname, "../../public/product-images/", req.params.filename);
    
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error("Error eliminando la imagen:", err);
            return res.status(500).json({ message: "Error al eliminar la imagen." });
        }
        res.json({ message: "Imagen eliminada correctamente." });
    });
});

// ==============================
// Rutas para manejo de PRODUCT (Productos)
// ==============================

// Obtener todos los productos con filtro opcional
router.post('/', productController.getProducts);

// Crear un nuevo producto
router.post('/create', productController.createProduct);

// Actualizar un producto existente
router.put('/update', productController.updateProduct);

// Eliminar un producto y su imagen asociada
router.delete('/delete/:productId/:filename', async (req, res) => {
    try {
        const { productId, filename } = req.params;
        await productController.deleteProduct(req, res);
        
        // Eliminar la imagen después de la respuesta del producto
        const filePath = path.join(__dirname, "../../public/product-images/", filename);
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error("Error eliminando la imagen:", err);
            }
        });
    } catch (error) {
        console.error("Error en eliminación:", error);
        if (!res.headersSent) {
            res.status(500).json({ error: error.message });
        }
    }
});

// Nueva ruta para aplicar descuentos masivos por categoría
router.post('/apply-discount', productController.applyDiscountByCategory);

module.exports = router;
