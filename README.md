# Desafío de Aplicación de Gestión de Calendario

## Descripción General
Este proyecto es una aplicación de gestión de calendario full-stack que permite a los usuarios crear, actualizar y eliminar citas. La aplicación cuenta con un frontend moderno en React y un backend en .NET utilizando un enfoque de arquitectura limpia.

## Descripción del Sistema
El sistema actual implementa una aplicación de calendario con las siguientes características:

1. **Autenticación de Usuarios**: Los usuarios pueden registrarse e iniciar sesión para acceder a su calendario personal.
2. **Gestión de Citas**: 
   - Crear citas con título, descripción, hora de inicio, hora de finalización y ubicación
   - Ver citas en formato de calendario (vistas de día, semana y mes)
   - Editar detalles de las citas
   - Eliminar citas
   - Arrastrar y soltar citas para reprogramarlas
3. **Vistas de Calendario**: 
   - Vista de cuadrícula mensual
   - Vista semanal 
   - Vista diaria
4. **Experiencia de Usuario**:
   - Diseño responsivo que funciona en diferentes dispositivos
   - Notificaciones toast para acciones del usuario
   - Diálogos modales para crear/editar citas

## Stack Tecnológico

### Frontend
- React con TypeScript
- Librería de calendario Schedule-X con funcionalidad de "Drag & Drop"
- Vite para construcción y desarrollo
- Tailwind CSS para estilos
- Notificaciones toast para feedback al usuario
- Zustand para el manejo de estados

### Backend
- ASP.NET Core Web API
- Patrón de Arquitectura Limpia con:
  - Capa de Dominio (entidades, enumeraciones, interfaces)
  - Capa de Aplicación (CQRS con MediatR)
  - Capa de Infraestructura (implementaciones)
  - Capa de Web API (controladores, servicios)
- Entity Framework Core para acceso a datos
- Autenticación JWT
- Funcionalidad de registro de actividad

## Requisitos funcionales

### Gestión de Usuarios
- Registro de nuevos usuarios con información básica
- Inicio y cierre de sesión de usuarios

### Gestión de Citas
- **Creación de citas** con:
  - Título (obligatorio, máximo 200 caracteres)
  - Descripción (obligatorio, máximo 2000 caracteres)
  - Hora de inicio y fin (obligatorios)
  - Ubicación (opcional, máximo 500 caracteres)

- **Validaciones de citas**:
  - Máximo 5 eventos por día por usuario
  - Máximo 6 horas de eventos acumulados por día
  - No puede haber superposición horaria con otros eventos del mismo usuario
  - Validación de fechas y formatos de campos obligatorios

- **Edición de citas**:
  - Modificación de todos los campos de la cita
  - Reprogramación mediante funcionalidad de "Drag & Drop"

- **Vistas de calendario**:
  - Vista mensual en formato de cuadrícula
  - Vista semanal con horas del día
  - Vista diaria detallada
  - Navegación entre diferentes períodos de tiempo

### Usabilidad
- Interfaz responsiva adaptable a dispositivos móviles y escritorio
- Notificaciones toast para informar sobre el resultado de las operaciones
- Modales para creación y edición de citas
- Interacciones intuitivas con elementos del calendario

### Seguridad y Auditoría
- Registro de actividad en el sistema
- Almacenamiento de información de auditoría (creación y modificación)
- Acceso restringido a las citas (solo propietario o administrador)
- Validación de permisos para modificar o eliminar citas

## Criterios de Evaluación
- Calidad y organización del código
- Implementación adecuada de las características solicitadas
- Experiencia de usuario y diseño de interfaz
- Optimizaciones de rendimiento
- Pruebas unitarias y de integración

## Primeros Pasos
1. Clonar el repositorio
2. Configurar el backend:
   - Navegar al directorio raíz del proyecto
   - Construir la solución con `dotnet build`
   - Ejecutar el backend con `dotnet run --project ReactNet.Server`
   
3. Configurar el frontend:
   - Navegar al directorio `reactnet.client`
   - Instalar dependencias con `npm install`
   - Ejecutar el frontend con `npm run dev`

4. Acceder a la aplicación en `http://localhost:5173` (o el puerto especificado en tu entorno)

## Credenciales de Acceso
Para acceder a la aplicación, utilizar las siguientes credenciales:
- **Usuario**: candidato@suriscode.com
- **Contraseña**: Suris-challenge-2025
