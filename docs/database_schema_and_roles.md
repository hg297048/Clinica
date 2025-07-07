
# Documentación de la Base de Datos y Roles (Supabase)

Este documento describe la estructura de la base de datos utilizada por la aplicación "Clinica de Especialidades Psicologicas" y cómo se gestionan los roles de usuario. Toda esta configuración reside en su proyecto Supabase.

## 1. Conexión a Supabase

La conexión a la base de datos de Supabase se gestiona a través del cliente de Supabase inicializado en `src/lib/supabaseClient.js`. Utiliza las credenciales (URL y Clave Anónima) proporcionadas para su proyecto.

## 2. Tablas Principales

### a. `user_profiles`
Almacena información adicional de los usuarios registrados, incluyendo su rol.
- `id` (UUID, Primary Key): Referencia a `auth.users.id`.
- `email` (TEXT, Unique): Correo electrónico del usuario.
- `full_name` (TEXT): Nombre completo del usuario.
- `role` (TEXT, Not Null, Default: 'patient'): Rol del usuario. Puede ser 'patient' o 'psychologist'.
- `created_at` (TIMESTAMPTZ): Fecha de creación.
- `updated_at` (TIMESTAMPTZ): Fecha de última actualización.

**Trigger `handle_new_user`**:
Cuando un nuevo usuario se registra en `auth.users`, este trigger automáticamente crea una entrada en `user_profiles` con el rol por defecto 'patient'.

### b. `appointments`
Almacena la información de las citas agendadas.
- `id` (UUID, Primary Key): Identificador único de la cita.
- `name` (TEXT, Not Null): Nombre del paciente.
- `email` (TEXT, Not Null): Email del paciente.
- `phone` (TEXT, Not Null): Teléfono del paciente.
- `psychologist` (TEXT, Not Null): Nombre del psicólogo seleccionado.
- `date` (DATE, Not Null): Fecha de la cita.
- `time` (TIME, Not Null): Hora de la cita.
- `reason` (TEXT, Not Null): Motivo de la consulta.
- `status` (TEXT, Default: 'pendiente'): Estado de la cita ('pendiente', 'confirmada', 'cancelada').
- `created_at` (TIMESTAMPTZ): Fecha de creación de la cita.
- `psychologist_id` (UUID, Foreign Key to `auth.users.id`): ID del usuario psicólogo (si se vincula).
- `confirmed_by` (UUID, Foreign Key to `auth.users.id`): ID del psicólogo que confirmó la cita.

### c. `contact_messages`
Almacena los mensajes enviados a través del formulario de contacto.
- `id` (UUID, Primary Key): Identificador único del mensaje.
- `name` (TEXT, Not Null): Nombre del remitente.
- `email` (TEXT, Not Null): Email del remitente.
- `subject` (TEXT, Not Null): Asunto del mensaje.
- `message` (TEXT, Not Null): Contenido del mensaje.
- `created_at` (TIMESTAMPTZ): Fecha de envío.
- `responded_by` (UUID, Foreign Key to `auth.users.id`): ID del psicólogo que respondió.
- `response_message` (TEXT): Contenido de la respuesta.
- `responded_at` (TIMESTAMPTZ): Fecha de la respuesta.

### d. `psychologist_actions`
Registra acciones realizadas por los psicólogos (ej. confirmar citas, responder mensajes).
- `id` (UUID, Primary Key): Identificador único de la acción.
- `psychologist_id` (UUID, Not Null, Foreign Key to `auth.users.id`): ID del psicólogo que realizó la acción.
- `action_type` (TEXT, Not Null): Tipo de acción (ej. 'confirmed_appointment', 'responded_message').
- `target_id` (UUID, Not Null): ID del objeto relacionado (ej. ID de la cita o del mensaje).
- `details` (JSONB): Detalles adicionales sobre la acción.
- `created_at` (TIMESTAMPTZ): Fecha de la acción.

## 3. Roles de Usuario y Seguridad

Los roles principales son:
- **`patient`**: Usuario estándar que puede agendar y ver sus citas.
- **`psychologist`**: Usuario con permisos para gestionar citas y mensajes.

La seguridad se implementa mediante **Políticas de Seguridad a Nivel de Fila (RLS)** en Supabase. Estas políticas definen qué filas puede ver, insertar, actualizar o eliminar cada rol en cada tabla.

**Ejemplos de Políticas:**
- Los pacientes solo pueden ver sus propias citas.
- Los psicólogos pueden ver todas las citas y mensajes.
- Los psicólogos pueden actualizar el estado de las citas.

## 4. Correos de Psicólogos y Asignación de Rol

Los siguientes correos electrónicos están previstos para ser utilizados por los psicólogos. El sistema intenta asignarles el rol de `psychologist` si se registran o inician sesión con ellos. Sin embargo, la forma más segura de garantizar el rol correcto es que un administrador lo asigne manualmente en el panel de Supabase después del registro inicial.

- `mario.cordova@example.com` (Mario Antonio Córdova Ruvalcaba)
- `erick.altamirano@example.com` (Altamirano Ángeles Erick)
- `yolotli.flores@example.com` (Flores Ríos Yolotli Zacnite)
- `maria.ortega@example.com` (Ortega Marín María Eugenia)
- `iliana.ruvalcaba@example.com` (Ruvalcaba Gaona Iliana)

**Ubicación en el código**: La lógica que verifica estos correos al iniciar sesión se encuentra en `src/contexts/AuthContext.jsx`.

## 5. Gestión

Toda la gestión de la base de datos (creación/modificación de tablas, roles, políticas RLS, gestión de usuarios) se realiza a través del **panel de control de Supabase** (app.supabase.io) o mediante scripts SQL ejecutados a través de la interfaz SQL de Supabase.

**Este archivo es solo para fines informativos y de referencia.** No contiene código ejecutable que configure la base de datos directamente desde la aplicación cliente.
