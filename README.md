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

### 4. Ejecución de docker-compose para la base de datos en local(Opcional)
```bash
docker-compose up -d
```

### 5. 🧪 Ejecución
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

# Ejecutar contenedor de PostgreSQL
docker-compose up -d
```

## Despliegue

### Deployment en Heroku
URL: https://technical-test-api-e274a96f107d.herokuapp.com/

Auth Base path: /api/auth
- Registro: /register
- Login: /login

Types Base path: /api/types

Properties Base path: /api/properties

## Documentación 
### Documentación en Postman
https://documenter.getpostman.com/view/638778/2sAYkGKz6q

## 📖 Decisiones Técnicas y Justificación
1️⃣ Elección del Stack Tecnológico
1. Framework Backend: NestJS
	
	Justificación:
	- Framework de NodeJS con su base en ExpressJS
	- Arquitectura modular y escalable basada en principios SOLID.
	- Soporte nativo para TypeScript, lo que mejora la mantenibilidad del código.
	- Integración fluida con TypeORM, JWT, Guards y Middleware.
	- Compatible con WebSockets, GraphQL y Microservicios.

2. Base de Datos: PostgreSQL con TypeORM

	Justificación:
	-	PostgreSQL es robusto, escalable y compatible con ACID.
	-	Soporte para relaciones complejas (relación muchos a muchos entre Types y Properties).
	-	Integración con Heroku Postgres, que ofrece backups y escalabilidad.

3. Autenticación con JWT

	Justificación:
	-	JWT (JSON Web Token) permite autenticación sin estado, ideal para APIs REST.
	-	Seguridad mejorada con expiración de tokens y cifrado.
	-	Facilidad de integración con Guards y Passport.js en NestJS.

4. Protección con Rate Limiting

	Justificación:
	-	Implementado con @nestjs/throttler para evitar ataques de fuerza bruta.
	-	Límite de 10 peticiones por minuto para mejorar la seguridad de endpoints críticos.
	-	Configuración centralizada en AppModule para aplicar globalmente.

5. Gestión de Entidades con TypeORM

	Justificación:
	-	Uso de Repositories y Services para separar la lógica de negocio.
	-	Migraciones y sincronización automática en entornos de desarrollo.
	-	Validaciones a nivel de base de datos para unicidad de nombres (unique: true).

6. Seguridad con Helmet y HPP

	Justificación:
	-	Helmet protege contra ataques como XSS y Clickjacking.
	-	HPP (HTTP Parameter Pollution) evita ataques por sobrecarga de parámetros en URLs.

7. CORS y Configuración en main.ts

	Justificación:
	-	CORS habilitado para permitir acceso desde el frontend sin riesgos de seguridad.
	-	Configuración específica para restringir el acceso a dominios confiables.

8. Despliegue en Heroku con PostgreSQL

	Justificación:
	-	Plataforma PaaS que simplifica la gestión del backend sin preocuparnos por servidores.
	-	Heroku Postgres facilita la escalabilidad sin cambios de infraestructura.
	-	Uso de DATABASE_URL en vez de configurar host, user y password manualmente.

9. Variables de Entorno con ConfigModule

	Justificación:
	-	Mantiene credenciales y configuraciones fuera del código fuente.
	-	Permite manejar configuraciones diferentes en desarrollo y producción.
	-	Usa ConfigModule.forRoot({ isGlobal: true }) para acceso en toda la app.

10. Modularización del Código

	Justificación:
	-	Separación de funcionalidades en módulos (TypesModule, PropertiesModule).
	-	Facilita la escalabilidad y permite agregar nuevas características sin romper la aplicación.

### 🏗️ Arquitectura Implementada y Patrones de Diseño

1. Arquitectura: Modular y Basada en Capas

	Justificación:
	-	Se utilizó una arquitectura modular en NestJS, separando responsabilidades en módulos (TypesModule, PropertiesModule, AuthModule, etc.).
	-	Se sigue el principio de separación de capas, organizando el código en:
		-	Controladores (Controllers): Manejan las solicitudes HTTP y delegan la lógica.
		-	Servicios (Services): Contienen la lógica de negocio y se comunican con la base de datos.
		-	Repositorios (Repositories - TypeORM): Administran la persistencia y abstracción de consultas SQL.
		-	Entidades (Entities): Definen la estructura de los datos y sus relaciones en la base de datos.
		-	DTOs (Data Transfer Objects): Validan y estructuran los datos de entrada.
	
	Beneficios:
	-	Facilita la mantenibilidad y escalabilidad del proyecto.
	-	Promueve el principio Single Responsibility Principle (SRP).
	-	Permite la reutilización de lógica en diferentes partes del sistema.

2. Patrón Repository (TypeORM)

	Justificación:
	-	Se implementó el Patrón Repository de TypeORM para interactuar con la base de datos sin exponer consultas SQL directas.
	-	Cada entidad tiene su propio repositorio, lo que permite la encapsulación de consultas.

	Beneficios:
	-	Abstracción de la capa de datos.
	-	Evita la dependencia de una implementación específica de base de datos.
	-	Mejora la testabilidad y el mantenimiento.

3. Patrón Dependency Injection (DI)

	Justificación:
	-	Se usó el sistema de Inyección de Dependencias (DI) de NestJS para gestionar instancias de servicios y controladores.
	-	Permite desacoplar dependencias y facilita la prueba unitaria con mocks.

	Beneficios:
	-	Reducción del acoplamiento entre módulos.
	-	Mayor flexibilidad y facilidad para pruebas.

4. Patrón DTO (Data Transfer Object)

	Justificación:
	-	Se usaron DTOs (Data Transfer Objects) para validar los datos entrantes y definir la estructura esperada.

	Beneficios:
	-	Evita datos incorrectos antes de procesarlos.
	-	Mejora la seguridad al evitar datos malformados.
	-	Facilita la validación con class-validator.

5. Patrón Middleware y Guards (Seguridad)

	Justificación:
	-	Se implementó el patrón Guard de NestJS para controlar el acceso según roles.
	-	Se usó JwtAuthGuard para proteger rutas y validar JWTs.
	-	Se usó RolesGuard para restringir acceso según el rol (admin o user).

	Beneficios:
	-	Mejora la seguridad al evitar accesos no autorizados.
	-	Centraliza la gestión de permisos en un solo lugar.

### Conclusión

Estas decisiones técnicas garantizan una arquitectura limpia, segura y escalable.
Si en el futuro se quiere migrar a microservicios, la base ya está preparada para ello.

El backend sigue una arquitectura modular basada en capas, con los siguientes beneficios:
-	Código organizado y escalable.
-	Uso de principios SOLID para garantizar buenas prácticas.
-	Implementación de patrones de diseño que mejoran la seguridad, mantenibilidad y testabilidad.

Futuras mejoras posibles:
-	Implementar GraphQL para mayor flexibilidad en el frontend.
-	Separar la autenticación en un microservicio independiente.
-	Implementar WebSockets para actualizaciones en tiempo real.

## 📌 Notas
	•	La base de datos se sincroniza automáticamente (synchronize: true) en desarrollo.
	•	En producción, usa migraciones para mantener integridad.

## 👤 Autor
Desarrollado por Ludwing Rivera Amador
