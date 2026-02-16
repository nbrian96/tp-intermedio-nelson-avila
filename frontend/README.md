# 🐾 Patitas Felices - Frontend

Este es el frontend de **Patitas Felices**, una aplicación integral para la gestión de clínicas veterinarias. Permite administrar veterinarios, dueños de mascotas y sus respectivos animales de compañía, facilitando el seguimiento de historias clínicas en una interfaz moderna y eficiente.

## 🚀 Instalación y Configuración

### Prerrequisitos

Asegúrate de tener instalado:
- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
- [npm](https://www.npmjs.com/)

### Pasos de Instalación

1.  **Clona el repositorio** (si aún no lo has hecho).
2.  **Instala las dependencias**:
    ```bash
    cd frontend
    npm install
    ```
3.  **Configura las variables de entorno**:
    Crea un archivo `.env` en la raíz de la carpeta `frontend` (si es necesario personalizar la URL del backend, aunque por defecto apunta a `http://localhost:3000/api`).
4.  **Inicia el servidor de desarrollo**:
    ```bash
    npm run dev
    ```
5.  **Abre tu navegador**:
    - Ve a `http://localhost:5173/`
    - ¡La aplicación debería estar funcionando!

## 🛠️ Tecnologías Utilizadas

- **React 19** - Biblioteca de UI principal.
- **TypeScript** - Tipado estático para un desarrollo robusto.
- **Vite** - Herramienta de construcción ultrarrápida.
- **Material UI (MUI) v7** - Sistema de diseño y componentes premium.
- **Redux Toolkit** - Gestión de estado global (Autenticación).
- **React Router 7** - Manejo de navegación y rutas protegidas.
- **Dayjs & @mui/x-date-pickers** - Gestión avanzada de fechas y calendarios.
- **CSS Vanilla** - Micro-animaciones y estilos personalizados.

## 📁 Estructura del Proyecto

```text
src/
├── assets/             # Recursos estáticos (imágenes, logos)
├── components/         # Componentes reutilizables (Navbar, Footer, ProtectedRoute)
├── constants/          # Constantes globales y configuración de API
├── hooks/              # Custom hooks (Validación de auth, etc.)
├── interfaces/         # Definiciones de tipos TypeScript
├── pages/              # Vistas principales de la aplicación
├── services/           # Servicios de comunicación con el Backend (API Fetch)
├── store/              # Configuración de Redux (Slices y Store)
└── App.tsx             # Componente raíz y configuración de rutas
```

## 🎯 Funcionalidades Principales

- **Gestión de Usuarios**: Registro e inicio de sesión seguro con validación de tokens JWT.
- **Panel de Control (Dashboard)**: Resumen visual y accesos rápidos.
- **Administración de Veterinarios**: CRUD completo para el personal médico.
- **Gestión de Dueños y Mascotas**:
  - Registro de propietarios.
  - Gestión de mascotas vinculadas a cada dueño de forma exclusiva.
  - Selectores de fecha intuitivos para el registro de nacimientos.
- **Seguridad**: Rutas protegidas que impiden el acceso a usuarios no autenticados.
- **Diseño Responsive**: Interfaz optimizada para equipos de escritorio y dispositivos móviles.

## 📜 Scripts Disponibles

```bash
npm run dev          # Inicia el servidor de desarrollo
npm run build        # Construye la aplicación para producción (Vite + TS)
npm run lint         # Ejecuta ESLint para verificar calidad de código
npm run preview      # Previsualiza la build de producción localmente
```

## 📝 Licencia

Este proyecto fue desarrollado como parte del **Trabajo Práctico Final Integrador** para la materia de Programación.

---

**Desarrollado por Nelson Avila** 🚀
