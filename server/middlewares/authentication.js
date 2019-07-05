const jwt = require('jsonwebtoken');

// =====================
//   Verificar Token
// =====================

let verificarToken = (req, res, next) => {
    let token = req.get('Authorization');
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido',
                },
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
};

// =====================
//   Verificar Admin Rol
// =====================

let verificarAdminRol = (req, res, next) => {
    let usuario = req.usuario;
    if(!usuario) {
        return res.status(404).json({
            ok: false,
            err: {
                message: 'Error ingreso usuario',
            },
        });
    } else {
        if(usuario.role === 'ADMIN_ROLE') {
            next();
        } else {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'El usuario no es admnistrador',
                },
            });
        }
    }

};

// =====================
//   Verificar Token Imagen
// =====================


let verificarTokenImg = (req, res, next) => {
    let token = req.query.token;
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido',
                },
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
};

module.exports = {
    verificarToken,
    verificarAdminRol,
    verificarTokenImg,
};
