import { Evento } from '../models/evento.js';

// LISTAR EVENTOS
export const getEventos = async (req, res) => {
    try {
        console.log('Estás llamando a getEventos');
        const eventos = await Evento.findAll({
            order: [
                ['id', 'DESC'] // Ordena por el campo 'id' de forma ascendente
            ]
        });
        res.json(eventos);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// LISTAR 1 EVENTO
export const getEvento = async (req, res) => {
    try {
        console.log('Estás llamando a getEvento');
        const { id } = req.params;
        const evento = await Evento.findByPk(id);
        if (!evento) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.json(evento);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// CREAR UN EVENTO
export const createEvento = async (req, res) => {
    try {
        console.log('Estás llamando a createEvento');
        const nuevoEvento = await Evento.create(req.body);
        res.json(nuevoEvento);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// CREAR VARIOS EVENTOS
export const createEventos = async (req, res) => {
    try {
        console.log('Estás llamando a createEventos');
        const eventos = req.body; // Recibe un array de eventos

        // Utiliza Promise.all para ejecutar varias operaciones de creación en paralelo
        const nuevosEventos = await Promise.all(
            eventos.map(async (evento) => {
                return await Evento.create(evento);
            })
        );

        res.json(nuevosEventos);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// ACTUALIZAR EVENTO
export const updateEvento = async (req, res) => {
    try {
        console.log('Estás llamando a updateEvento');
        const { id } = req.params;
        const evento = await Evento.findByPk(id);
        if (!evento) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        await evento.update(req.body);
        res.json(evento);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// ELIMINAR EVENTO
export const deleteEvento = async (req, res) => {
    try {
        console.log('Estás llamando a deleteEvento');
        const { id } = req.params;
        const evento = await Evento.findByPk(id);
        if (!evento) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        await evento.destroy();
        res.json({ message: 'Evento eliminado correctamente' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


