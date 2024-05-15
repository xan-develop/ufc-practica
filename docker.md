# Dockerizar Backend
## 1º Creamos el archivo Dockerfile
### Hemos de tener descargada la imagen node:18.20.2 previamente , ya que esta sera la imagen que usara para crear el contenedor
La version usada es la 18.20.2 para que las dependencias dentro del proyecto funcionen de manera estable en el contenedor
```Dockerfile
FROM node:18.20.2

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

``` 
## 2º Creamos el archivo docker-compose.yml
### Esto lo hacemos para dockerizar tanto el backend como la base de datos (postgres)
**Como paso previo he exportado la base de datos para incluirla en la raiz del proyecto y pueda ser importada al correr el docker-componse**  
### Adjunto guia de los pasos para exportar una base de datos de un contenedor a maquina local e importarla en otro
### Exportar Base de datos

```sql
pg_dump -U usuario -d basededatos > basededatos.sql
```

### Copiarla del docker a la maquina y viceversa 

```sql
docker cp nombre_del_contenedor:/ruta/en/el/contenedor/basededatos.sql /ruta/en/la/maquina/anfitriona

docker cp basededatos.sql nombre_del_contenedor:/ruta/en/el/contenedor
```

### Importar base de datos

```sql
# psql -U postgres -d ufc -f /basedatosufc.sql
```
### Archivo docker-compose.yml
**Hemos de crear un archivo .env donde se guardaran las variables de entorno**  
- Archivo .env
```env
PORT=3000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=onmula
DB_NAME=ufc
DB_PORT=5432
```
- Archivo docker-compose.yml
```Docker
services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      NODE_DOCKER_PORT: 3000
      DB_HOST: db
      DB_USER: postgres
      DB_PASSWORD: onmula
      DB_NAME: ufc
      DB_PORT: 5432
    depends_on:
      - db

  db:
    image: postgres:latest
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: onmula
      POSTGRES_DB: ufc
    volumes:
      - ./ufcfin.sql:/docker-entrypoint-initdb.d/ufcfin.sql

volumes:
  ufcvolume:

```
## 3º Ejecutar Contenedor
### Comandos

```bash
docker-compose up -d
```
**Comprobar que ambos contenedores estan corriendo antes de lanzar el front**