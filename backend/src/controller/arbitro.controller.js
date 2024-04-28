import { Arbitro  } from "../models/arbitro.js";

// LISTAR ARBITROS
export const getArbitros = async (req, res) => {
    try {
        console.log('Estás llamando a getArbitros');
        const arbitros = await Arbitro.findAll();
        res.json(arbitros);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// LISTAR 1 ARBITRO
export const getArbitro = async (req, res) => {
    try {
        console.log('Estás llamando a getArbitro');
        const { id } = req.params;
        const arbitro = await Arbitro.findByPk(id);
        if (!arbitro) {
            return res.status(404).json({ message: 'Árbitro no encontrado' });
        }
        res.json(arbitro);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// CREAR ARBITRO
export const createArbitro = async (req, res) => {
    try {
        console.log('Estás llamando a createArbitro');
        const { nombre } = req.body;
        const arbitro = await Arbitro.create({ nombre });
        res.status(201).json(arbitro);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ACTUALIZAR ARBITRO
export const updateArbitro = async (req, res) => {
    try {
        console.log('Estás llamando a updateArbitro');
        const { id } = req.params;
        const { nombre } = req.body;
        const arbitro = await Arbitro.findByPk(id);
        if (!arbitro) {
            return res.status(404).json({ message: 'Árbitro no encontrado' });
        }
        await arbitro.update({ nombre });
        res.json(arbitro);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ELIMINAR ARBITRO
export const deleteArbitro = async (req, res) => {
    try {
        console.log('Estás llamando a deleteArbitro');
        const { id } = req.params;
        const arbitro = await Arbitro.findByPk(id);
        if (!arbitro) {
            return res.status(404).json({ message: 'Árbitro no encontrado' });
        }
        await arbitro.destroy();
        res.json({ message: 'Árbitro eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// AGREGAR VARIOS ÁRBITROS
export const createArbitros = async (req, res) => {
    try {
        console.log('Estás llamando a crear varios árbitros');
        const arbitros = req.body; // Recibe un array de árbitros

        // Utiliza Promise.all para ejecutar varias operaciones de creación en paralelo
        const nuevosArbitros = await Promise.all(
            arbitros.map(async (arbitro) => {
                return await Arbitro.create(arbitro);
            })
        );

        res.json(nuevosArbitros);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

