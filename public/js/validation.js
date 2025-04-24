// 📌 public/js/validation.js
//let originalPasswordHash = null; // Esta se sincroniza con la del perfil

// ✅ Validación asincrónica para verificar si el email ya está registrado
async function validateEmailExists(email) {
    const response = await fetchUsers({ column: "email", value: email });
    return response.rows && response.rows.length > 0;
}

// ✅ Validación asincrónica para verificar si el RUT ya está registrado
async function validateRutExists(rut) {
    const response = await fetchUsers({ column: "rut", value: rut });
    return response.rows && response.rows.length > 0;
}

// ✅ Verifica si un campo está vacío
function validateRequired(value) {
    return value !== null && value !== undefined && value.trim() !== "";
}

// ✅ Verifica si un campo de selección tiene una opción válida
function validateSelection(value) {
    return value !== "" && value !== null && value !== undefined;
}

// ✅ Verifica si el email tiene un formato válido
function validateEmail(email) {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
}

// ✅ Verifica si la contraseña cumple los requisitos
function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.@$!%*?&#])[A-Za-z\d.@$!%*?&#]{12,}$/;
    return passwordRegex.test(password);
}

// ✅ Verifica si el RUT tiene el formato correcto (sin puntos, con guion)
function validateRut(rut) {
    const rutRegex = /^\d{7,8}-[kK0-9]$/; // Acepta 7 u 8 dígitos seguidos de un guion y un número/K
    return rutRegex.test(rut);
}

// ✅ Verifica si el valor contiene solo números
function validateNumeric(value) {
    return /^\d+$/.test(value);
}

// ✅ Verifica que un campo no supere una cantidad máxima de caracteres
function validateMaxLength(value, length) {
    return value.length <= length;
}

// ✅ Función principal para validar el formulario de registro
function validateUserForm(user) {
    let errors = {};

    // 📌 Validaciones corregidas

    if (!validateRequired(user.email) || !validateEmail(user.email)) {
        errors["email"] = "El correo electrónico es inválido.";
    }

    // 🔹 Solo validar contraseña si no es null (cuando el usuario no usa Google y el hash es el mismo)
    if (user.password !== null) {
        const passwordModified = user.password !== originalPasswordHash;

        if (passwordModified && !validateRequired(user.password)) {
            errors["password"] = "La contraseña debe tener al menos 12 caracteres, una mayúscula, una minúscula, un número y un símbolo.";
        } else if (passwordModified && !validatePassword(user.password)) {
            errors["password"] = "La contraseña debe cumplir con los requisitos de seguridad.";
        }
    }

    if (!validateRequired(user["first_name"])) {
        errors["first-name"] = "El nombre es obligatorio.";
    }

    if (!validateRequired(user["last_name"])) {
        errors["last-name"] = "El apellido es obligatorio.";
    }

    if (!validateRequired(user["birth_date"])) {
        errors["birth-date"] = "Debe ingresar su fecha de nacimiento.";
    }

    if (!validateRequired(user["mobile_phone"])) {
        errors["mobile-phone"] = "Debe ingresar un número de teléfono.";
    }

    if (!validateRequired(user.rut) || !validateRut(user.rut)) {
        errors["rut"] = "El RUT debe tener el formato correcto (Ej: 12345678-9).";
    }

    if (!validateSelection(user.district)) {
        errors["comuna"] = "Debe seleccionar una comuna.";
    }

    if (!validateRequired(user["street"])) {
        errors["street"] = "Debe ingresar una calle.";
    }

    if (!validateRequired(user["street_number"])) {
        errors["street-number"] = "El número de calle es obligatorio.";
    } else if (!validateNumeric(user["street_number"])) {
        errors["street-number"] = "El número de calle debe contener solo números.";
    } else if (!validateMaxLength(user["street_number"], 10)) {
        errors["street-number"] = "El número de calle no debe superar los 10 dígitos.";
    }

    return errors;
}

async function validateUserFormAsync(user, isUpdate = false) {
    const errors = validateUserForm(user); // Primero aplica validaciones sincrónicas básicas

    // Validar email duplicado solo si no estamos en modo edición o si cambió el email
    if (!isUpdate || (isUpdate && user.original_email !== user.email)) {
        if (await validateEmailExists(user.email)) {
            errors["email"] = "Este correo ya está registrado.";
        }
    }

    if (!isUpdate || (isUpdate && user.original_rut !== user.rut)) {
        if (await validateRutExists(user.rut)) {
            errors["rut"] = "Este RUT ya está registrado.";
        }
    }

    return errors;
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

function validateCheckoutForm(user) {
    let errors = {};

    if (!validateRequired(user["first-name"])) {
        errors["first-name"] = "El nombre es obligatorio.";
    }

    if (!validateRequired(user["last-name"])) {
        errors["last-name"] = "El apellido es obligatorio.";
    }

    if (!validateRequired(user.email) || !validateEmail(user.email)) {
        errors["email"] = "El correo electrónico es inválido.";
    }

    /*if (!validateRequired(user.city)) {
        errors["city"] = "Debe ingresar una comuna.";
    }*/

    if (!validateSelection(user.city)) {
        errors["city"] = "Debe seleccionar una comuna.";
    }

    if (!validateRequired(user.street)) {
        errors["street"] = "Debe ingresar una calle.";
    }

    if (!validateRequired(user["street-number"])) {
        errors["street-number"] = "El número de calle es obligatorio.";
    } else if (!validateNumeric(user["street-number"])) {
        errors["street-number"] = "El número de calle debe contener solo números.";
    } else if (!validateMaxLength(user["street-number"], 10)) {
        errors["street-number"] = "El número de calle no debe superar los 10 dígitos.";
    }

    if (!validateRequired(user["mobile-phone"])) {
        errors["mobile-phone"] = "Debe ingresar un número de teléfono.";
    }

    return errors;
}

function validateWebpayForm(data) {
    let errors = {};

    // Validar número de tarjeta: solo números, entre 13 y 19 dígitos
    if (!validateRequired(data["card-number"]) || !/^\d{13,19}$/.test(data["card-number"])) {
        errors["card-number"] = "El número de tarjeta debe tener entre 13 y 19 dígitos.";
    }

    // Validar código de seguridad: solo números, 3 o 4 dígitos
    if (!validateRequired(data["card-code"]) || !/^\d{3,4}$/.test(data["card-code"])) {
        errors["card-code"] = "El código de seguridad debe tener 3 o 4 dígitos.";
    }

    // Validar expiración: formato MM/AA (mes 01-12 y año 2 dígitos)
    if (!validateRequired(data["card-expiry"]) || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(data["card-expiry"])) {
        errors["card-expiry"] = "La fecha de expiración debe tener formato MM/AA.";
    }

    return errors;
}

