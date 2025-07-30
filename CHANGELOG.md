# Changelog

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
