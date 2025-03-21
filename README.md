<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# 🧠 API de Tipos y Propiedades – NestJS

Este proyecto es una API REST desarrollada con **NodeJS**, **ExpressJS** **NestJS**, **PostgreSQL** y **TypeORM**. Permite:

- Registro y login con autenticación JWT.
- Control de acceso basado en roles (`admin` y `user`).
- Gestión de entidades `Tipos` y `Propiedades` con relación muchos a muchos.
- Validaciones de unicidad.
- Seguridad mejorada: CORS, Helmet, Rate Limiting, HPP.

---

## 🛠️ Tecnologías

- NestJS
- TypeORM
- PostgreSQL
- JWT (Json Web Token)
- Bcrypt
- Helmet
- Throttler (Rate Limiting)
- HPP (HTTP Parameter Pollution)

---

## ⚙️ Instalación

### 1. Clona el repositorio

```bash
https://github.com/ludwingra/api-types-properties.git
cd technical-test-api
```

### 2. Instala dependencias
```bash
npm install
```

### 3. Crea el archivo .env
```bash
cp .env.template .env
```

### 4. 🧪 Ejecución
```bash
npm run start:dev
```
Accede en: http://localhost:3000


## Generalidades

### 🔐 Seguridad

	•	✅ Rate limiting: máximo 10 solicitudes por IP cada 60 segundos.
	•	✅ CORS activado para http://localhost:3000.
	•	✅ Helmet: seguridad en cabeceras HTTP.
	•	✅ HPP: prevención de inyecciones por parámetros duplicados.
	•	✅ Rutas protegidas con JWT + control por roles (admin, user).

### 🧾 Autenticación
Registro
```http
POST /auth/register
```

Login
```http
POST /auth/login
```
```json
{
  "access_token": "..."
}
```

### Roles disponibles:

Roles disponibles:
	•	admin: Puede crear, editar y eliminar.
	•	user: Solo puede consultar.

## 🧪 Pruebas con Postman
	1.	Autenticarse en /auth/login
	2.	Copiar el token y usar en las rutas protegidas como Bearer Token en los headers.

## 🗃️ Scripts útiles
```bash
# Compilar
npm run build

# Ejecutar en modo desarrollo
npm run start:dev

# Ejecutar con nodemon
npm run start:debug

# Formatear con Prettier
npm run format
```

## Despliegue

### URL
https://technical-test-api-e274a96f107d.herokuapp.com/ | https://git.heroku.com/technical-test-api.git

## 📌 Notas
	•	La base de datos se sincroniza automáticamente (synchronize: true) en desarrollo.
	•	En producción, usa migraciones para mantener integridad.

## 👤 Autor
Desarrollado por Ludwing Rivera Amador