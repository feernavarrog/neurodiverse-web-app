// middlewares/authMiddleware.js

// Middleware para verificar si el usuario está autenticado
function requireAuth(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/'); // Redirigir si no está autenticado
    }
    next(); // Continuar con la solicitud si está autenticado
}

// Middleware para verificar si el usuario es administrador
function requireAdmin(req, res, next) {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.redirect('/'); // 🔹 Redirigir al home si no es admin
    }
    next(); // Continuar con la solicitud si es admin
}

module.exports = { requireAuth, requireAdmin };
