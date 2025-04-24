// public/js/login.js

document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("login-btn");
    const errorContainer = document.getElementById("login-error");

    loginBtn.addEventListener("click", async function () {
        const email = document.getElementById("login-email").value.trim();
        const password = document.getElementById("login-password").value.trim();

        if (!email || !password) {
            errorContainer.textContent = "Por favor, ingresa tu email y contraseña.";
            errorContainer.style.display = "block";
            return;
        }

        try {
            await loginUser(email, password);
        } catch (error) {
            errorContainer.textContent = error.message;
            errorContainer.style.display = "block";
        }
    });

    // 🔹 Inicializar Google Sign-In
    // 🔹 Esperar hasta que el script de Google esté listo antes de usarlo
    let checkGoogleInterval = setInterval(() => {
        if (typeof google !== "undefined" && google.accounts) {
            console.log("✅ Google API cargada correctamente.");
            clearInterval(checkGoogleInterval); // Detener la espera
            
            // ✅ Inicializar Google Sign-In una vez que Google esté disponible
            google.accounts.id.initialize({
                client_id: "540135471748-pk1f84d1kprok5hd9u163anqlqf949c5.apps.googleusercontent.com",
                callback: handleGoogleLogin
            });

            google.accounts.id.renderButton(
                document.getElementById("google-signin-button"),
                { theme: "outline", size: "large" }
            );
        }
    }, 100); // Revisamos cada 100ms hasta que Google se cargue

    // 🔹 Función de callback para Google Sign-In
    function handleGoogleLogin(response) {
        const credential = response.credential;
        loginWithGoogle(credential);
    }

    // 🔹 Cerrar modal
    document.getElementById("close-login").addEventListener("click", function () {
        document.getElementById("login-modal").style.display = "none";
    });
});
