import { sequelize } from "../database/database.js";

export const getLuchadoresPeso = async (req, res) => {
    try {
        const { peso } = req.params;
        // Realizar consulta SQL a la vista 
        console.log('Estas llamando a vista luchadoresPeso')
        const luchadoresPorPeso = await sequelize.query(
            `SELECT * FROM luchadoresPeso WHERE peso = ${peso}`,
            { type: sequelize.QueryTypes.SELECT }
        );

        
        res.json(luchadoresPorPeso);
    } catch (error) {
      
        res.status(500).json({ message: error.message });
    }
};
export const getUltimosCombates = async (req, res) => {
    try {
        const { peso } = req.params;
        // Realizar consulta SQL a la vista 
        console.log('Estas llamando a vista UltimosCombates')
        const ultimocombate = await sequelize.query(
            `SELECT * FROM ultimoscombates order by peleaid`,
            { type: sequelize.QueryTypes.SELECT }
        );

        
        res.json(ultimocombate);
    } catch (error) {
      
        res.status(500).json({ message: error.message });
    }
};
export const getCombatesEvento = async (req, res) => {
    try {
        const { idevento } = req.params;
        console.log('Estás llamando a la vista getCombatesEvento');
        
        // Utiliza la vista definida en la base de datos
        const combateEvento = await sequelize.query(
            `SELECT Evento, nombre, especialidad, fecha
            FROM combatesEvento
            WHERE id = ${idevento}`,
            { type: sequelize.QueryTypes.SELECT }
        );

        res.json(combateEvento);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
export const getarbitrosAsignados = async (req, res) => {
    const {idarbitro} = req.params;
    console.log('Estas llamando a vista getArbitrosasignados')
    const arbitrosAsignados = await sequelize.query(
        `SELECT arbitro , num_evento , combate FROM arbitrosAsignados WHERE id = ${idarbitro}`,
        { type: sequelize.QueryTypes.SELECT }
    );
}
