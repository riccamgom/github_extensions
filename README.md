# github_extensions

Github Extensions

# INIT

Lanzar: docker compose up

# Abrir web inicio

http://localhost:3127

- Desde la web se puede usar el formulario y llamar a cualquier repo de la API de github
- Con el token basico hay un rate limit bastante bajo, por lo que se ha incluido un delay, asi que en repositorios muy grandes tardará mucho.

# Coleccion de Postman

Hay una coleccion de postman en el repositorio para importarla y tener los endpoints utilizados

# Base de datos de mongo

El docker levanta una base de datos de mongo donde hace un log de las peticiones,
se puede acceder con la url: mongodb://ricardo:testpass@localhost:27017/admin

- Para docker la url es: mongodb://ricardo:testpass@mongo:27017/

# Estilo aplicado al codigo

Lanzar: npm run format

# TESTS

Ejecutar: npm run test
