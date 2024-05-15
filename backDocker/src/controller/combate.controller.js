import {Combate} from '../models/combate.js'

export const createCombate = async (req, res) =>{
    const {idarbitro, idevento} = req.body
    try {
        const nuevoCombate = await Combate.create({
            idarbitro,
            idevento
        })
        res.json(nuevoCombate)
    } catch (error) {
        res.status(409).json({message: error.message})
    }

    
}

export const getCombates = async (req, res) => {
    try {
        const combates = await Combate.findAll();
        res.json(combates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCombate = async (req, res) => {
    const { id } = req.params;
    try {
        const combate = await Combate.findByPk(id);
        if (!combate) {
            return res.status(404).json({ message: 'Combate no encontrado' });
        }
        res.json(combate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCombate = async (req, res) => {
    const { id } = req.params;
    const { idarbitro, idevento } = req.body;
    try {
        const combate = await Combate.findByPk(id);
        if (!combate) {
            return res.status(404).json({ message: 'Combate no encontrado' });
        }
        await combate.update({
            idarbitro,
            idevento
        });
        res.json(combate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteCombate = async (req, res) => {
    const { id } = req.params;
    try {
        const combate = await Combate.findByPk(id);
        if (!combate) {
            return res.status(404).json({ message: 'Combate no encontrado' });
        }
        await combate.destroy();
        res.json({ message: 'Combate eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};