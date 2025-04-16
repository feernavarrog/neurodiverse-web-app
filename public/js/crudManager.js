// public/js/crudManager.js
// Este archivo contiene las funciones para realizar fetch a las rutas de usuarios y otras entidades de la aplicacion

// ==============================
// Funciones para manejo de APP_USER
// ==============================

async function fetchUsers(filter = {}) {
    const response = await fetch('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filter)
    });
    return response.json();
}

async function createUser(userData) {
    const response = await fetch('/users/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });
    return response.json();
}

async function updateUser(userData) {
    const response = await fetch('/users/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });
    return response.json();
}

async function deleteUser(userId) {
    const response = await fetch(`/users/delete/${userId}`, {
        method: 'DELETE'
    });
    return response.json();
}

// ==============================
// Funciones para manejo de USER_CONDITION
// ==============================

// Obtener todas las condiciones asociadas a un usuario
async function fetchUserConditions(userId) {
    const response = await fetch(`/users/conditions/${userId}`);
    return response.json();
}

// Asignar una condición a un usuario
async function assignUserCondition(userId, conditionId) {
    const response = await fetch('/users/conditions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, conditionId })
    });
    return response.json();
}

// Eliminar una condición de un usuario
async function removeUserCondition(userId, conditionId) {
    const response = await fetch('/users/conditions', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, conditionId })
    });
    return response.json();
}

// ==============================
// Funciones para manejo de APP_CATEGORY
// ==============================

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
// Funciones para manejo de CONDITION (Patologías)
// ==============================

// Obtener todas las patologías
async function fetchConditions() {
    const response = await fetch('/conditions');
    return response.json();
}

// Crear una nueva patología
async function createCondition(condition) {
    const response = await fetch('/conditions/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(condition)
    });
    return response.json();
}

// Actualizar una patología existente
async function updateCondition(condition) {
    const response = await fetch('/conditions/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(condition)
    });
    return response.json();
}

// Eliminar una patología
async function deleteCondition(conditionId) {
    const response = await fetch(`/conditions/delete/${conditionId}`, {
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
