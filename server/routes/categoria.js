const express = require('express');
let {verificarToken, verificarAdminRol} = require('../middlewares/authentication');
let app = express();
let Categoria = require('../models/categoria');

//Mostrar todas las categorias
app.get('/categoria', verificarToken, (req, res) => {
    Categoria.find({})
        .sort('desc')
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err,
                });
            }
            res.json({
                ok: true,
                categorias,
            });
        });
});

//Mostrar una categoria por id
app.get('/categoria/:id', verificarToken, (req, res) => {
    let id = req.params.id;
    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err,
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no es correcto',
                },
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB,
        })
    })

});

//Crear una nueva categoria
app.post('/categoria', verificarToken, (req, res) => {
    let body = req.body;
    let categoria = new Categoria({
        desc: body.desc,
        usuario: req.usuario._id,
    });
    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err,
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB,
        });
    });
});

//Actualizar categoria
app.put('/categoria/:id', verificarToken, (req, res) => {
    //actualizar nombre de la categoria

    let id = req.params.id;
    let body = req.body;
    let descCategoria = {
        desc: body.desc,
    };
    Categoria.findByIdAndUpdate(id, descCategoria, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    }, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err,
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB,
        });
    });
});

//Eliminar categoria
app.delete('/categoria/:id', [verificarToken, verificarAdminRol], (req, res) => {
    //solo un administrador puede borrar una categoria
    //Categoria.findByIdAndRemove

    let id = req.params.id;
    Categoria.findByIdAndRemove(id, {useFindAndModify: false}, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err,
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                },
            });
        }
        res.json({
            ok: true,
            message: 'Categoria borrada',
        })
    })
});

module.exports = app;
