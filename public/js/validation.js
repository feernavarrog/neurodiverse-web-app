// 📌 public/js/validation.js

// ✅ Verifica si un campo está vacío
function validateRequired(value) {
    return value !== null && value !== undefined && value.trim() !== "";
}

// ✅ Verifica si un campo de selección tiene una opción válida
function validateSelection(value) {
    return value !== "" && value !== null && value !== undefined;
}

// ✅ Verifica si el valor contiene solo números
function validateNumeric(value) {
    return /^\d+$/.test(value);
}

// ✅ Verifica que un campo no supere una cantidad máxima de caracteres
function validateMaxLength(value, length) {
    return value.length <= length;
}

function validateProductForm(product) {
    let errors = {};

    if (!validateRequired(product.code)) {
        errors["productCodeInput"] = "El código del producto es obligatorio.";
    }

    if (!validateRequired(product.product_name)) {
        errors["productNameInput"] = "El nombre del producto es obligatorio.";
    }

    if (!validateRequired(product.price) || isNaN(product.price)) {
        errors["productPriceInput"] = "El precio debe ser un número.";
    }

    if (!validateRequired(product.discount) || isNaN(product.discount)) {
        errors["productDiscountInput"] = "El descuento debe ser un número. (ingrese 0 si no tiene descuento)";
    }

    if (!validateRequired(product.stock) || isNaN(product.stock)) {
        errors["productStockInput"] = "El stock debe ser un número.";
    }

    if (!product.reference_photo || product.reference_photo === "undefined") {
        errors["productPhotoInput"] = "Debe seleccionar una foto.";
    }

    if (!validateSelection(product.brand_id)) {
        errors["productBrandIdInput"] = "Debe seleccionar una marca.";
    }

    if (!validateSelection(product.category_id)) {
        errors["productCategoryIdInput"] = "Debe seleccionar una categoría.";
    }

    return errors;
}

function validateDiscountForm() {
    const category = document.getElementById('discountCategorySelect').value;
    const discount = document.getElementById('discountValueInput').value.trim();
    let errors = {};

    // Validar categoría seleccionada
    if (!category) {
        errors['discountCategorySelect'] = "Debe seleccionar una categoría.";
    }

    // Validar descuento (número entre 0 y 100)
    if (discount === "" || isNaN(discount) || discount < 0 || discount > 100) {
        errors['discountValueInput'] = "Debe ingresar un descuento válido (0-100).";
    }

    return errors;
}
