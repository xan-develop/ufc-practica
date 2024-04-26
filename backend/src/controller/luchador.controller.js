import {Luchador} from '../models/luchador.js'

// LISTA TODOS LOS LUCHADORES
export const getLuchadores = async (req, res) =>{

    try {
        const luchadores = await Luchador.findAll();
        console.log('Llamando a getLuchadores')
        res.json({luchadores});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

// LISTA UN SOLO LUCHADOR
export const getLuchador = async (req, res) =>{
    try {
        const {id} = req.params;
        const luchador = await Luchador.findByPk(id);
        res.json(luchador);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

// AGREGAR UN LUCHADOR
export const createLuchador = async (req, res) =>{
try {
        console.log('Estas llamando a crear luchador')
        const {nombre, edad, pesoid , especialidad, nacionalidad, victorias, derrotas, imagen} = req.body
        const newLuchador = await Luchador.create({
            nombre,
            edad,
            pesoid,
            especialidad,
            nacionalidad,
            victorias,
            derrotas,
            imagen
        })
        res.json(newLuchador)
        
} catch (error) {
    return res.status(500).json({message: error.message});
}
}
// ACTUALIZAR UN LUCHADOR

export const updateLuchador = async (req, res) =>{
try {
        console.log('Estas llamando a updateLuchador')
        const {id} = req.params
        const {nombre, edad, pesoid , especialidad, nacionalidad, victorias, derrotas, imagen} = req.body
        const luchador = Luchador.findByPk(id)
        if(!luchador){
            return res.status(404).json({message: 'Luchador no encontrado'})
        }
        luchador.nombre = nombre;
        luchador.edad = edad;
        luchador.pesoid = pesoid;
        luchador.especialidad = especialidad;
        luchador.nacionalidad = nacionalidad;
        luchador.victorias = victorias;
        luchador.derrotas = derrotas;
        luchador.imagen = imagen;
        await luchador.save()
        res.json(luchador)
} catch (error) {
    return res.status(500).json({message: error.message});
}
}

// ELIMINAR LUCHADOR
export const deleteLuchador = async (req, res) =>{
try {
        console.log('Estas llamando a deleteLuchador')
        const {id} = req.params
        const luchadoreliminado = Luchador.findByPk(id)
            await Luchador.destroy({
                where: {
                    id,
                }
            })
            if(!luchador){
                return res.status(404).json({message: 'Luchador no encontrado'})
            }
            res.json(luchadoreliminado);
            
} catch (error) {
    return res.status(500).json({message: error.message});
}
}