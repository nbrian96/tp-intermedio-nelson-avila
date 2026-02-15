# Lineamientos de Trabajo

## 1. Tecnologías Base
- **Lenguaje:** TypeScript
- **Framework:** Express.js
- **Base de Datos:** MongoDB con Mongoose
- **Entorno:** Node.js

## 2. Arquitectura
Se sigue una arquitectura **MVC (Modelo-Vista-Controlador)** con una capa de **Servicios** para la lógica de negocio.

- `src/models`: Definiciones de esquemas de Mongoose.
- `src/controllers`: Manejo de peticiones HTTP (Request/Response). No debe contener lógica de negocio compleja.
- `src/services`: Lógica de negocio pura. Interacción con la base de datos.
- `src/routes`: Definición de endpoints y asociación con controladores.
- `src/middlewares`: Intermediarios para validación, autenticación, etc.
- `src/validator`: Lógica de validación de datos de entrada.
- `src/config`: Configuración de la aplicación (base de datos, variables de entorno).
- `src/utils`: Funciones utilitarias y helpers.
- `src/types`: Definiciones de tipos y extensiones de TypeScript.

## 3. Convenciones de Código
- **Idioma:** Variables, funciones, clases y métodos en **Inglés**.
- **Comentarios:** **ESTRICTAMENTE PROHIBIDO** dejar comentarios en el código. El código debe ser **autodocumentado**. Si un bloque de código requiere explicación, debe ser refactorizado para que sea legible por sí mismo.
- **Linting y Calidad de Código:**
    - **Evitar `any`:** Utilizar tipado estricto en variables, argumentos y retornos de funciones.
    - **Sin variables no usadas:** Eliminar imports, variables y funciones que no se utilicen.
    - **Manejo de promesas:** Utilizar `async/await` de forma correcta, evitando `.then().catch()` anidados.
    - **Casteo seguro:** Validar tipos antes de castear, o usar `as` con precaución (ej. `req.params.id as string`).
    - **Formato:** Respetar la indentación y estilo definido por la configuración del proyecto.
- **Nombrado:**
    - Archivos: `kebab-case.type.ts` (ej. `veterinarian.controller.ts`)
    - Clases: `PascalCase`
    - Variables/Funciones: `camelCase`

## 4. Patrones de Diseño
- **Inyección de Dependencias (Implícita):** Los controladores instancian los servicios.
- **Manejo de Errores:** `try/catch` en controladores. Servicios lanzan excepciones.
- **Respuestas:** Formato consistente (ej. `{ success: boolean, data?: any, message?: string }` o similar según el caso).

## 6. Validación
- **Regla:** Cada ruta debe tener su propio validador (middleware) antes de llegar al controlador.
- **Ubicación:** `src/validator/*.validator.ts`.
- **Librería:** `express-validator`.

## 5. Endpoints
- **Públicos:** Definidos en routes públicas (ej. `public.routes.ts` o agrupadores específicos).
- **Privados:** Protegidos por middleware de autenticación (`auth.middleware`).