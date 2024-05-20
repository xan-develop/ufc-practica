# Use the official PostgreSQL image from Docker Hub
FROM postgres:latest

# Define las variables de entorno para el usuario, contraseña, base de datos y puerto
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=onmula
ENV POSTGRES_DB=ufc
ENV POSTGRES_PORT=5432

# Copia el SQL file into the Docker container
COPY ufcrole.sql /docker-entrypoint-initdb.d/

# Cambiar los permisos del archivo para asegurar la ejecución
RUN chown postgres:postgres /docker-entrypoint-initdb.d/ufcrole.sql
RUN chmod 755 /docker-entrypoint-initdb.d/ufcrole.sql

