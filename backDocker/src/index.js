import app from './app.js';
import { sequelize } from './database/database.js';



// Definimos en el index estas relaciones para que no haya conflicto en el orden de importacion
import Combate from './models/combate.js';
import Luchador from './models/luchador.js';
import Peso from './models/peso.js';
import Sugerencia from './models/sugerencias.js';
import Users from './models/user.js';

Luchador.belongsToMany(Combate, {
   through: 'ParticipacionEnCombates',
   foreignKey: 'idLuchador'
});

Combate.belongsToMany(Luchador, {
   through: 'ParticipacionEnCombates',
   foreignKey: 'idCombate'
});


Peso.belongsToMany(Luchador, {
   through: 'campeones',
   foreignKey: 'idPeso'
} );
Luchador.belongsToMany(Peso, {
   through: 'campeones',
   foreignKey: 'idLuchador'
} );

// Many to one combate -> luchador
Combate.belongsTo(Luchador, {
   foreignKey: 'victoria',
   targetKey: 'id'
});

Luchador.hasMany(Combate, {
   foreignKey: 'victoria',
   sourceKey: 'id'
});

async function main(){
   try {
    await sequelize.sync({})
     app.listen(3000);
     console.log('Server on port 3000');
   } catch (error) {
    console.error('Unable to connect to the database:', error);
   }
}
main();

