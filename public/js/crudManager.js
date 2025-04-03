// public/js/crudManager.js
// Este archivo contiene las funciones para realizar fetch a las rutas de usuarios y otras entidades de la aplicacion

// Obtener todas las categorías
async function fetchCategories() {
    const response = await fetch('/categories');
    return response.json();
}

// Crear una nueva categoría
async function createCategory(category) {
    const response = await fetch('/categories/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category)
    });
    return response.json();
}

// Actualizar una categoría existente
async function updateCategory(category) {
    const response = await fetch('/categories/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category)
    });
    return response.json();
}

// Eliminar una categoría
async function deleteCategory(categoryId) {
    const response = await fetch(`/categories/delete/${categoryId}`, {
        method: 'DELETE'
    });
    return response.json();
}

// ==============================
// Funciones para manejo de BRAND (Marcas)
// ==============================

// Obtener todas las marcas
async function fetchBrands() {
    const response = await fetch('/brands');
    return response.json();
}

// Crear una nueva marca
async function createBrand(brand) {
    const response = await fetch('/brands/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(brand)
    });
    return response.json();
}

// Actualizar una marca existente
async function updateBrand(brand) {
    const response = await fetch('/brands/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(brand)
    });
    return response.json();
}

// Eliminar una marca
async function deleteBrand(brandId) {
    const response = await fetch(`/brands/delete/${brandId}`, {
        method: 'DELETE'
    });
    return response.json();
}

// ==============================
// Funciones para manejo de PRODUCT (Productos)
// ==============================

// Obtener todos los productos con filtro opcional
async function fetchProducts(filter = {}) {
    const response = await fetch('/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filter)
    });
    return response.json();
}

// Crear un nuevo producto
async function createProduct(product) {
    const response = await fetch('/products/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    });
    return response.json();
}

// Actualizar un producto existente
async function updateProduct(product) {
    const response = await fetch('/products/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    });
    return response.json();
}

// Eliminar un producto y su imagen asociada
async function deleteProduct(productId, filename) {
    const response = await fetch(`/products/delete/${productId}/${filename}`, {
        method: 'DELETE'
    });
    return response.json();
}
