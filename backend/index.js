const express = require('express');
const router = express.Router()
const { Producto } = require('./Modelos/Productos')
const app = express()

app.use(express.json());

router.get('/productos', async (req, res) => {
    try {
        const productos = await Producto.findAll()
        res.status(200).json(productos);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ mensaje: "Error del servidor al obtener productos." });
    }
});

router.post('/productos', async (req, res)=>{
    try {
        const { nombre, descripcion, precio, estado, categoria, url_fotografia } = req.body

        if (!nombre || !precio || !estado || !categoria) {
            return res.status(400).json({ mensaje: "Faltan campos requeridos" })
        }

        const nuevoProducto = await Producto.create({
            nombre,
            descripcion,
            precio,
            estado,
            categoria,
            url_fotografia,
        });

        res.status(201).json(nuevoProducto)
    } catch (error) {
        console.error("Error al crear el producto:", error)
        res.status(500).json({ mensaje: "Error del servidor al crear el producto" });
    }
});

router.delete('/items/:id', async (req, res)=>{
    const { id } = req.params;
    try {
        const productoEliminado = await Producto.destroy({
            where: { id: id }
        });

        if (productoEliminado === 0){
            return res.status(404).json({ mensaje: "Producto no encontrado." });
        }

        res.status(200).json({ mensaje: "Producto eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).json({ mensaje: "Error del servidor al eliminar el producto" });
    }
});


app.listen(5000, () => {
    console.log('Aplicacion ejecutando en puerto 5000')
})