## Datos de comprension
![diagrama de datos](./basedatos/diagrama-ufc.png)
### Relaciones
#### Peso
```javaScript
// One to many : peso -> luchador
Peso.hasMany(luchador , {
    foreingKey: 'idpeso',
    sourceKey: 'id'
})
luchador.belongsTo(Peso,{
    foreingKey: 'idpeso',
    targetId: 'id'
})
```
#### Evento
```javaScript
//One to many evento -> combate
Evento.hasMany(combate, {
    foreignKey: 'idevento',
    sourceKey: 'id'
})

combate.belongsTo(Evento, {
    foreignKey: 'idevento',
    targetId: 'id'
})
```
#### Arbitro
```javaScript
// One to many arbitro -> combate
Arbitro.hasMany(combate, {
    foreignKey: 'idarbitro',
    sourceKey: 'id'
})

combate.belongsTo(Arbitro, {
    foreignKey: 'idarbitro',
    targetId: 'id'
})
```
#### Luchadores - Combates 
Se genera una tabla intermedia automaticamente con el nombre de la relación.
- En luchador
```javaScript
Luchador.belongsToMany(combate, {
    through: 'ParticipacionEnCombate',
    foreignKey: 'idLuchador'
  });
```
- En combate 
```javaScript

Combate.belongsToMany(luchador, {
    through: 'ParticipacionEnCombate',
    foreignKey: 'idCombate'
  });
  
```


## Consultas a realizar por modelo

### Luchador



### Combate
