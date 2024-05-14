import {Sugerencia} from "../models/sugerencias.js";

// Obtener todos los pesos
export const getSuggets = async (req, res) => {
    console.log('Estás llamando a Sugerencias');
    try {
        const sug = await Sugerencia.findAll();
        res.json(sug);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

// Obtener un peso por su ID
export const getSuggetsId = async (req, res) => {
    const id = req.params.id;
    console.log(`Estás llamando a getSuggets con el ID ${id}`);
    try {
        const sug = await Sugerencia.findByPk(id);
        if (!sug) {
            return res.status(404).json({
                message: `No se encontró el peso con el ID ${id}`
            });
        }
        res.json(sug);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

// Crear un nuevo peso
export const createSuggets = async (req, res) => {
    try {
        console.log('Estas llamando a crear sugerencia')
        const {usuario, correo, luchador1 , luchador2, descripcion} = req.body
        const newSuggest = await Sugerencia.create({
            usuario,
            correo,
            luchador1,
            luchador2,
            descripcion,
        })
        res.json(newSuggest)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

// Actualizar un peso existente
export const updateSuggest = async (req, res) => {
    try {
        console.log('Estás llamando a updateLuchador');
        const { id } = req.params;
        const {usuario, correo, luchador1 , luchador2, descripcion} = req.body
        const sug = await Sugerencia.findByPk(id);
        if (!sug) {
            return res.status(404).json({ message: 'Luchador no encontrado' });
        }
        await sug.update({
            usuario: usuario,
            correo: correo,
            luchador1: luchador1,
            luchador2: luchador2,
            descripcion: descripcion,
        });
        return res.json(sug);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Eliminar un peso por su ID
export const deleteSuggest = async (req, res) => {
    const id = req.params.id;
    console.log(`Estás llamando a deleteSuggest con el ID ${id}`);
    try {
        const sug = await Sugerencia.findByPk(id);
        const sugeliminada = sug
        await sug.destroy();
        res.json({sugeliminada });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
