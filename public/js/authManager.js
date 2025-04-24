// public/js/authManager.js

// 🔹 Función para manejar el login normal
async function loginUser(email, password) {
    try {
        const response = await fetch('/users/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Error en la autenticación.");
        }

        // Guardar datos en sessionStorage
        sessionStorage.setItem('user', JSON.stringify(result));

        // Redirigir al home
        window.location.href = "/";

    } catch (error) {
        console.error("Error en el login:", error);
        throw error;
    }
}

// 🔹 Función para manejar el login con Google
async function loginWithGoogle(credential) {
    try {
        const response = await fetch('/users/auth/callback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ credential })
        });

        const result = await response.json();

        // 🔹 Si la respuesta no es OK, verificar si el error es un email o un mensaje
        if (!response.ok) {
            if (result.error && result.error.includes("@")) {
                // 🔹 Si el error es un email, redirigir al registro
                window.location.href = `/register?email=${result.error}`;
            } else {
                // 🔹 Si el error es otro mensaje, mostrarlo en pantalla
                throw new Error(result.error || "Error en la autenticación con Google.");
            }
            return;
        }

        // Guardar datos del usuario en sessionStorage
        sessionStorage.setItem('user', JSON.stringify(result));

        // Redirigir al home
        window.location.href = "/";

    } catch (error) {
        console.error("Error en la autenticación con Google:", error);
        document.getElementById("login-error").textContent = error.message;
        document.getElementById("login-error").style.display = "block";
    }
}

// 🔹 Función para iniciar sesión automáticamente después del registro
async function autoLogin(email) {
    try {
        const response = await fetch('/users/auth/auto-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Error al iniciar sesión automáticamente.");
        }

        return result; // Devuelve los datos del usuario si todo salió bien
    } catch (error) {
        console.error("Error en el auto-login:", error);
        throw error;
    }
}

// 🔹 Función para cerrar sesión
async function logoutUser() {
    try {
        await fetch('/users/auth/logout', { method: 'POST' }); // 🔹 Llamar al backend para cerrar sesión
        sessionStorage.removeItem('user'); // 🔹 Eliminar usuario del frontend
        window.location.href = "/"; // 🔹 Redirigir al home
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
    }
}

// 🔹 Función para verificar si un usuario está logeado
function isUserLoggedIn() {
    return sessionStorage.getItem('user') !== null;
}
