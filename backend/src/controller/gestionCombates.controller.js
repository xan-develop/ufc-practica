import {ParticipacionEnCombate} from '../models/ParticipacionEnCombate.js';
import {Luchador} from '../models/luchador.js'

export const createParticipacion = async (req, res) => {
    const { idCombate } = req.params; // Obtén el ID del combate de los parámetros de la URL
    const { luchador1, luchador2 } = req.body; // Obtén los IDs de los luchadores del cuerpo de la solicitud
    console.log(idCombate, luchador1, luchador2);
    try {
        // Comprueba si los IDs de los luchadores son válidos
        const luchador1Instance = await Luchador.findByPk(luchador1);
        const luchador2Instance = await Luchador.findByPk(luchador2);

        if (!luchador1Instance || !luchador2Instance) {
            return res.status(404).json({ ok: false, msg: 'Uno o ambos luchadores no encontrados' });
        }

        // Comprueba si los luchadores tienen el mismo peso
        if (luchador1Instance.pesoId !== luchador2Instance.pesoId) {
            return res.status(400).json({ ok: false, msg: 'Los luchadores no tienen el mismo peso' });
        }

        // Crea las participaciones en el combate
        const participacion1 = await ParticipacionEnCombate.create({
            idLuchador: luchador1Instance.id,
            idCombate: idCombate
        });

        const participacion2 = await ParticipacionEnCombate.create({
            idLuchador: luchador2Instance.id,
            idCombate: idCombate
        });

        res.json({ ok: true, participacion1, participacion2 });
    } catch (error) {
        res.status(500).json({ ok: false, msg: error.message });
    }
};
