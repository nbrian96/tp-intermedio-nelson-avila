# Consigna: Servidor con Express + MongoDB/MySQL + Autenticación (JWT) + Arquitectura MVC

## Descripción
Crear un servidor backend utilizando Express y MongoDB/MySQL que implemente autenticación con JWT y siga el patrón de arquitectura MVC (Modelo–Vista–Controlador).
El proyecto deberá incluir al menos una entidad protegida (por ejemplo, Producto, Evento o Tarea) asociada al usuario autenticado.

## Objetivos
- Comprender la integración entre Express y MongoDB/MySQL a través de Mongoose/mysql2.
- Aplicar buenas prácticas de arquitectura modular (MVC).
- Implementar autenticación segura con bcrypt y JWT.
- Desarrollar endpoints públicos y privados con control de acceso mediante middleware.
- Manejar errores de manera centralizada.

## Requisitos Técnicos
- **Servidor Express** con configuración base y middlewares (cors, express.json, etc.).
- **Conexión a Base de Datos**:
  - MongoDB (local o Atlas) usando Mongoose.
  - O MySQL con conexión a phpMyAdmin.
- **Autenticación JWT** con endpoints para registro y login de usuarios.
- **Rutas protegidas** que requieran token válido.
- **Arquitectura MVC** correctamente implementada: separación entre rutas, controladores, servicios/modelos.
- **Variables de entorno** gestionadas con .env.
- **Manejo de errores** mediante middleware global.
- **Documentación** en un archivo README.md con instrucciones para ejecutar el proyecto.

## Endpoints mínimos

### Autenticación (públicos)
- `POST /api/auth/register` → Crea un nuevo usuario y devuelve token.
- `POST /api/auth/login` → Valida credenciales y devuelve token.

### Entidad protegida (privados)
- `GET /api/[entidad]` → Lista elementos del usuario autenticado.
- `POST /api/[entidad]` → Crea un nuevo elemento asociado al usuario.
- `PATCH /api/[entidad]/:id` → Actualiza si pertenece al usuario.
- `DELETE /api/[entidad]/:id` → Elimina si pertenece al usuario.

## Entregables
1. **Repositorio en GitHub** con el proyecto PUBLICO, con el nombre `tp-intermedio-NOMBRE-APELLIDO`.
2. En caso de usar MySQL, también agregar un **DUMP de la base de datos**. (Archivo de importación con tablas y datos).
3. Archivo `.env.example` con variables de entorno necesarias.
4. Archivo `README.md` con:
   - Instrucciones de instalación y ejecución.
   - Ejemplos de requests.
   - Colección de pruebas (Postman o Thunder Client).

## Criterios de evaluación
- **Organización (25%)**: uso correcto de la arquitectura MVC.
- **Seguridad (25%)**: manejo de contraseñas y tokens JWT.
- **Funcionalidad (25%)**: endpoints operativos y protección por usuario.
- **Calidad del código (15%)**: claridad, validaciones y mensajes coherentes.
- **Documentación (10%)**: README completo, ejemplos y scripts.
