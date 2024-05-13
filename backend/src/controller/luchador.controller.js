import {Luchador} from '../models/luchador.js'

// LISTA TODOS LOS LUCHADORES
export const getLuchadores = async (req, res) => {
    try {
        const luchadores = await Luchador.findAll({
            order: [['nombre', 'ASC']] 
        });
        console.log('Llamando a getLuchadores');
        res.json({ luchadores });
    } catch (error) {
        return res.status(500).json({ message: error.message });
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
// AGREGAR VARIOS LUCHADORES
export const createLuchadores = async (req, res) => {
    try {
      console.log('Estás llamando a crear varios luchadores');
      const luchadores = req.body; // Recibe un array de luchadores
  
      // Utiliza Promise.all para ejecutar varias operaciones de creación en paralelo
      const nuevosLuchadores = await Promise.all(
        luchadores.map(async (luchador) => {
          
          return await Luchador.create(luchador);
        })
      );
  
      res.json(nuevosLuchadores);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
// ACTUALIZAR UN LUCHADOR

export const updateLuchador = async (req, res) => {
    try {
        console.log('Estás llamando a updateLuchador');
        const { id } = req.params;
        const { nombre, edad, pesoid, especialidad, nacionalidad, victorias, derrotas, imagen } = req.body;
        const luchador = await Luchador.findByPk(id);
        if (!luchador) {
            return res.status(404).json({ message: 'Luchador no encontrado' });
        }
        await luchador.update({
            nombre: nombre,
            edad: edad,
            pesoid: pesoid,
            especialidad: especialidad,
            nacionalidad: nacionalidad,
            victorias: victorias,
            derrotas: derrotas,
            imagen: imagen
        });
        return res.json(luchador);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// ELIMINAR LUCHADOR
export const deleteLuchador = async (req, res) =>{
try {
        console.log('Estas llamando a deleteLuchador')
        const {id} = req.params
        
            await Luchador.destroy({
                where: {
                    id,
                }
            })
            if(!luchador){
                return res.status(404).json({message: 'Luchador no encontrado'})
            }
           
            
} catch (error) {
    return res.status(500).json({message: error.message});
}
}