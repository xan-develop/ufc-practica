## Exportar Base de datos

```sql
pg_dump -U usuario -d basededatos > basededatos.sql
```

## Copiarla del docker a la maquina y viceversa con la nueva

```sql
docker cp nombre_del_contenedor:/ruta/en/el/contenedor/basededatos.sql /ruta/en/la/maquina/anfitriona

docker cp basededatos.sql nombre_del_contenedor:/ruta/en/el/contenedor
```

### Importar base de datos

```sql
# psql -U postgres -d ufc -f /basedatosufc.sql
```

