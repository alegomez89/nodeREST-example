const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const path = require('path');
const fs = require('fs');
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');

// default optipons
app.use(fileUpload());

app.put('/upload/:tipo/:id', function (req, res) {

    let tipo = req.params.tipo;
    let id = req.params.id;

    if (!req.files) {
        return res.status(400)
            .json({
                ok: false,
                err: {
                    message: 'No se ha seleccionado ningun arrchivo',
                }
            });
    }

    // Valido tipo
    let tiposValidos = ['producto', 'usuario'];
    if (tiposValidos.indexOf((tipo)) < 0) {
        return res.status(400)
            .json({
                ok: false,
                err: {
                    mssage: 'Los tipos permitidos son: ' + tiposValidos.join(', '),
                }
            })
    }

    let archivo = req.files.archivo;

    // Extensiones permitidas
    let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];
    let nombreCortado = archivo.name.split('.');
    let extension = nombreCortado[nombreCortado.length - 1];

    if (extensionesValidas.indexOf(extension) < 0) {
        return res.status(400)
            .json({
                ok: false,
                err: {
                    mssage: 'Extension no valida. Las extensiones permitidas son ' + extensionesValidas.join(', '),
                    ext: extension,
                }
            })
    }

    // Cambiar nombre al archivo

    let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`;

    const directory = path.resolve(`uploads/${tipo}/${nombreArchivo}`);
    archivo.mv(directory, (err) => {
        if (err) {
            return res.status(500)
                .json({
                    ok: false,
                    err,
                });
        }
        if(tipo === 'usuario') {
            imagenUsuario(id, res, nombreArchivo);
        } else {
            imagenProducto(id, res, nombreArchivo);
        }
    });
});

function imagenUsuario(id, res, nombreArchivo) {
    Usuario.findById(id, (err, usuarioDB) => {
        if (err) {
            borraArchivo(nombreArchivo, 'usuario');
            return res.status(500).json({
                ok: false,
                err,
            });
        }

        if (!usuarioDB) {
            borraArchivo(nombreArchivo, 'usuario');
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El usuario no existe',
                },
            });
        }

        borraArchivo(usuarioDB.img, 'usuario');

        usuarioDB.img = nombreArchivo;
        usuarioDB.save((err, usuarioGuardado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err,
                });
            }
            res.json({
                ok: true,
                usuario: usuarioGuardado,
                img: nombreArchivo,
            })
        });
    });
}

function imagenProducto(id, res, nombreArchivo) {
    Producto.findById(id, (err, productoDB) => {
        if (err) {
            borraArchivo(nombreArchivo, 'producto');
            return res.status(500).json({
                ok: false,
                err,
            });
        }

        if (!productoDB) {
            borraArchivo(nombreArchivo, 'producto');
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El producto no existe',
                },
            });
        }

        borraArchivo(productoDB.img, 'producto');

        productoDB.img = nombreArchivo;
        productoDB.save((err, productoGuardado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err,
                });
            }
            res.json({
                ok: true,
                usuario: productoGuardado,
                img: nombreArchivo,
            })
        });
    });
}

function borraArchivo(nombreImagen, tipo) {
    let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`);

    if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
    }
}

module.exports = app;
