import { sequelize } from "../database/database.js";

export const getLuchadoresPeso = async (req, res) => {
    try {
        // Realizar consulta SQL a la vista 
        console.log('Estas llamando a vista luchadoresPeso')
        const luchadoresPorPeso = await sequelize.query(
            'SELECT * FROM luchadoresPeso',
            { type: sequelize.QueryTypes.SELECT }
        );

        
        res.json(luchadoresPorPeso);
    } catch (error) {
      
        res.status(500).json({ message: error.message });
    }
};