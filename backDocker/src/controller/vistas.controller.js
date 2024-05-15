import { sequelize } from "../database/database.js";

export const getLuchadoresPeso = async (req, res) => {
    const pesoId = "pesoId";
    try {
        const { peso } = req.params;
        // Realizar consulta SQL a la vista 
        console.log('Estas llamando a vista luchadoresPeso')
        const luchadoresPorPeso = await sequelize.query(
            `SELECT * FROM porpesorango WHERE ${pesoId} = ${peso}`,
            { type: sequelize.QueryTypes.SELECT }
        );

        
        res.json(luchadoresPorPeso);
    } catch (error) {
      
        res.status(500).json({ message: error.message });
    }
};
export const getLuchadoresPesoAll = async (req, res) => {
    try {
        
        // Realizar consulta SQL a la vista 
        console.log('Estas llamando a vista luchadoresPeso')
        const luchadoresPorPeso = await sequelize.query(
            `SELECT * FROM porpesorango`,
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
export const getCampeones = async (req, res) => {
    try {
        
        // Realizar consulta SQL a la vista 
        console.log('Estas llamando a vista Campeones')
        const ultimocombate = await sequelize.query(
            `SELECT * FROM campeonesrango`,
            { type: sequelize.QueryTypes.SELECT }
        );

        
        res.json(ultimocombate);
    } catch (error) {
      
        res.status(500).json({ message: error.message });
    }
};
export const getRanking = async (req, res) => {
    try {
        const { peso } = req.params;
        // Realizar consulta SQL a la vista 
        console.log('Estas llamando a vista Ranking')
        const ultimocombate = await sequelize.query(
            `SELECT * FROM ranking where pesoid = ${peso}`,
            { type: sequelize.QueryTypes.SELECT }
        );

        
        res.json(ultimocombate);
    } catch (error) {
      
        res.status(500).json({ message: error.message });
    }
};
export const getAllcombates = async (req, res) => {
    try {
        const { idevento } = req.params;
        // Realizar consulta SQL a la vista 
        console.log('Estas llamando a vista Todos los combates')
        const todoscombates = await sequelize.query(
            `SELECT * FROM allcombates WHERE evento = ${idevento}`,
            { type: sequelize.QueryTypes.SELECT }
        );

        
        res.json(todoscombates);
    } catch (error) {
      
        res.status(500).json({ message: error.message });
    }
};
export const getidPelea = async (req, res) => {
    try {
        const { luchador } = req.params;
        console.log('Estás llamando a la vista getIDcombate');
        
        // Utiliza la vista definida en la base de datos
        const idpelea = await sequelize.query(
            `SELECT pelea FROM idpeleas WHERE luchador = ${luchador} ORDER BY pelea desc LIMIT 1`,
            { type: sequelize.QueryTypes.SELECT }
        );

        res.json(idpelea);
        console.log(idpelea)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
export const getlastFight = async (req, res) => {
    try {
        const { pelea } = req.params;
        console.log('Estás llamando a la vista getIDcombate');
        
        // Utiliza la vista definida en la base de datos
        const ultima = await sequelize.query(
            `SELECT * FROM lastFight WHERE pelea = ${pelea}`,
            { type: sequelize.QueryTypes.SELECT }
        );
        res.json(ultima);
    } catch (error) {
        return res.status(500).json({ message: error.message });
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
