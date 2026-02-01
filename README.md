# students-api
project-students-api
Descripcion:
API para gestión de estudiantes universitarios con Node.js y Express.

Instalacion:

- Clonar el repositorio

- Instalar dependencias (body-parser, cors, express, sqlite y sqlite3)

- Instalar dependencias para desarrollador (jest, nodemon y supertest)

npm install (body-parser, cors, express, sqlite y sqlite3)

npm install (jest, nodemon y supertest) -D

3.Iniciar la base de datos: Ejecuta el script para crear la tabla de estudiantes y el archivo database.db

node src/database/init-db.js

4.Cómo ejecutar la API

npm run dev

5.Ejecutar pruebas

npm test

6. Ejemplos de uso de cada endpoints

GET      /students        
Descripcion: Obtiene la lista de todos los estudiantes.
{
  "success": true,
  "message": "Students retrieved",
  "data": 
    {
      "id": 1,
      "first_name": "Maria",
      "last_name": "García",
      "email": "m.garcia@universidad.edu",
      "major": "Software",
      "semester": 4,
      "gpa": 3.9,
      "is_active": 1,
      "created_at": "2024-05-20 10:00:00"
    }
}

GET     /students/:id   
Descripcion: Obtiene el detalle de un estudiante por su ID.
{
  "success": true,
  "message": "Student retrieved",
  "data": {
    "id": 1,
    "first_name": "Maria",
    "last_name": "García",
    "email": "m.garcia@universidad.edu",
    "major": "Software",
    "semester": 4,
    "gpa": 3.9,
    "is_active": 1
  }
}

POST  /students         
Descripción: Crea un nuevo estudiante.
{
  "first_name": "Maria",
  "last_name": "García",
  "email": "m.garcia@universidad.edu",
  "major": "Ingeniería de Software",
  "semester": 4,
  "gpa": 3.9,
  "enrollment_date": "2024-02-10"
}

PUT    /students/:id    
Descripcion: Actualización total de un estudiante.
{
  "first_name": "Maria",
  "last_name": "García Lopez",
  "email": "m.garcia.nueva@universidad.edu",
  "major": "Ingeniería de Sistemas",
  "semester": 5,
  "gpa": 4.0,
  "enrollment_date": "2024-02-10",
  "is_active": 1
}

PATCH  /students/:id  
Descripción: Actualización parcial 
{
  "major": "Ciberseguridad",
  "gpa": 3.5
}

DELETE  /students/:id  
Descripción: Desactivación

7. Uso de IA

Para el desarrollo del proyecto se utilizó la IA de Gemini en las siguientes tareas:

- Apoyo contra errores y bugs.

- Análisis de lógica del código.

- Consejos para mejorar el codigo.


8. Estándares de codificación utilizados

- Variables y funciones: CamelCase

- Clases: PascalCase

- Constantes: UPPER_SNAKE_CASE
  
- Archivos: kebab-case
