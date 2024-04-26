import { Peso } from '../models/peso.js';

// Obtener todos los pesos
export const getPesos = async (req, res) => {
    console.log('Estás llamando a getPesos');
    try {
        const pesos = await Peso.findAll();
        res.json(pesos);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

// Obtener un peso por su ID
export const getPesoById = async (req, res) => {
    const id = req.params.id;
    console.log(`Estás llamando a getPesoById con el ID ${id}`);
    try {
        const peso = await Peso.findByPk(id);
        if (!peso) {
            return res.status(404).json({
                message: `No se encontró el peso con el ID ${id}`
            });
        }
        res.json(peso);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

// Crear un nuevo peso
export const createPeso = async (req, res) => {
    const { nombre } = req.body;
    console.log('Estás llamando a createPeso');
    try {
        const nuevoPeso = await Peso.create({ nombre });
        res.status(201).json(nuevoPeso);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

// Actualizar un peso existente
export const updatePeso = async (req, res) => {
    const id = req.params.id;
    const { nombre  } = req.body;
    console.log(`Estás llamando a updatePeso con el ID ${id}`);
    try {
        const peso = await Peso.findByPk(id);
        if (!peso) {
            return res.status(404).json({
                message: `No se encontró el peso con el ID ${id}`
            });
        }
        await peso.update({ nombre });
        res.json(peso);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

// Eliminar un peso por su ID
export const deletePeso = async (req, res) => {
    const id = req.params.id;
    console.log(`Estás llamando a deletePeso con el ID ${id}`);
    try {
        const peso = await Peso.findByPk(id);
        const pesoeliminado = peso
        await peso.destroy();
        res.json({pesoeliminado });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
