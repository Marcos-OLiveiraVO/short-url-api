# Changelog

## [0.2.0] - 2025-08-01

### Added

- ✅ **Tests**

  - Added unit test for create shortener use-case using in-memory repository (Map).
  - Added unit test for delete shortener use-case.
  - Added unit test for get shortener URL use-case.
  - Added unit test for update shortener use-case.
  - Added unit test for list all shortener URLs use-case.

- ✅ **Features**
  - Added centralized logging with **Pino** and **nestjs-pino**, controlled via environment variable.
  - Added observability stack with **Grafana**, **Prometheus**, and **Jaeger**, integrated via `@nestjs/otel`, fully toggleable by environment variable.

### Fixed

- 🛠️ Ensured immutability in all unit tests and in-memory repository implementation.

---

## [0.1.0] - 2025-07-29

### Added

- Added Docker setup with Docker Compose and Dockerfile.
- Added Auth module with decorators and unit tests, using JWT/NestJS.
- Project initialized with Node.js, TypeScript, and NestJS.
- Implemented CLI to automate and standardize module creation.
- Added Prisma ORM integration.
- System designed and planned in Excalidraw.
- Profile module:
  - Created user profile.
  - Implemented profile login with email and password.
- Integrated Swagger (OpenAPI) documentation for all routes.
- Added soft delete middleware for Prisma ORM.
- Shortener module:
  - Created use case for URL shortening.
  - Used nanoid for slug generation.
  - Created Prisma migrations.
  - Created use case for redirecting to original URL by slug.
  - Created use case to list all URLs and their hits, with pagination (limit and page).
  - Created use case to delete shortened URLs.
  - Created use case to update shortened URLs.
