// Función para mostrar el popup con un mensaje dinámico
function showPopup(message) {
    // Asignamos el mensaje dinámico al contenido del popup
    document.getElementById('popupMessageContent').innerHTML = `<p>${message}</p>`;

    // Mostramos el popup
    document.getElementById('globalPopup').style.display = 'block';
}

// Función para cerrar el popup
function closePopup() {
    document.getElementById('globalPopup').style.display = 'none';
}
