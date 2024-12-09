// Middleware pour vérifier si l'utilisateur est connecté
exports.isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    return res.status(401).json({ error: 'Accès non autorisé. Veuillez vous connecter.' });
};

// Middleware pour vérifier si l'utilisateur a un rôle administrateur
exports.isAdmin = (req, res, next) => {
    if (req.session && req.session.user && req.session.user.role === 'admin') {
        return next();
    }
    return res.status(403).json({ error: 'Accès interdit. Droits administrateur requis.' });
};

// Middleware pour vérifier si l'utilisateur est simple (non-admin)
exports.isSimpleUser = (req, res, next) => {
    if (req.session && req.session.user && req.session.user.role === 'user') {
        return next();
    }
    return res.status(403).json({ error: 'Accès interdit. Rôle utilisateur simple requis.' });
};
