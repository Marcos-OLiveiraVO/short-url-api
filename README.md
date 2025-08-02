# 🔗 URL Shortener API

## 📘 Description

Repository that refers to the **URL Shortener Challenge** for the company **Teddy Open Finance**.

This application is a **RESTful API** built with **Node.js + TypeScript + NestJS**, focusing on URL shortening, user authentication, and modular architecture.  
The system can be run locally using **Docker + Docker Compose** and follows clean architecture principles.  
All business rules are validated through **unit tests** with 100% coverage.

---

## ✅ Implemented Features

### 🔹 URL Shortener Module

- `POST /shortener` – Create a shortened URL (supports both authenticated and anonymous users).
- `GET /shortener/:slug` – Redirect to the original URL.
- `GET /shorteners` – List all user URLs with click count (paginated).
- `PUT /shortener/:slug` – Update target URL.
- `DELETE /shortener/:slug` – Logical (soft) delete.

### 🔹 Profile Module

- `POST /profile` – Create profile.
- `POST /login` – Login (email/password) returning JWT.
- `DELETE /profile/:profileId` – Delete profile with nested URL deletion.
- `GET /profile/:profileId` – Retrieve profile by ID.

### 🔹 Auth Module

- Authentication Service.
- Auth guards.
- Decorators.

### 🔹 Logger Module

- Logger Repository with pino.
- Logger function with fallback (console.log)
- Enable or desable by env flag (ENABLE_LOGGER)

### 🔹 Observability Module

- Using **prometheus** as metrics exporter.
- Using **jaeger** as tracing exporter.
- Using **nestjs-otel** with several libs tryed to minimalist observability setup.
- Enable or desable by **env flag** (ENABLE_OBSERVABILITY)

---

## 🌟 Version History

### **v0.1.0 - Initial Release**

- ✅ Initial setup with **Node.js + TypeScript + NestJS**.
- ✅ CLI implemented to automate module creation.
- ✅ Prisma ORM integration.
- ✅ Profile and URL Shortener modules implemented.
- ✅ Swagger (OpenAPI) documentation.
- ✅ Soft delete middleware for Prisma.
- ✅ Each feature has his own branch (for easily tracking).

### **v0.2.0 - Observability & Tests**

**Added:**

- ✅ Unit tests for all Shortener use cases using an in-memory repository.
- ✅ Logger with Pino + NestJS wrapper (environment-controlled).
- ✅ Observability stack with Grafana + Jaeger + Prometheus via `@nestjs/otel`.

**Fixed:**

- ✅ Ensured immutability in unit tests and in-memory repository.

### [0.3.0] - Tests coverage and CI pipeline

**Added:**

  - ✅ Feat - added delete profile use-case with nested delete.
  - ✅ Feat - added get profile by id use-case.
  - ✅ Added profile InMemory-Repository.
  - ✅ Added create profile use-case unit test.
  - ✅ Added create profile login unit test.
  - ✅ Added delete profile use-case unit test.
  - ✅ Added get profile unit test.
  - ✅ Added private helper function to get profile used in delete profile use-case tests.
  - ✅ Added Github pipeline that runs **lint** and **unit tests**.

**Fixed:**

- ✅ adjusted ESLint rules.

**Changed:**

- ✅ modified login response to return `profileId` along with the token.

---



## 🚀 Features Checklist

### ✅ **MVP Delivered**

- REST API with authentication (JWT).
- URL shortening with `nanoid` (6-char slugs).
- Redirect with click counting.
- CRUD operations for URLs (with soft delete).
- Pagination for URL listing.
- Proper timestamps (`updatedAt`, `deletedAt`).
- Environment variables for configuration.
- REST Maturity Level 2 compliance.

### 🌟 **Extra Features**

- ✅ Docker & Docker Compose support.
- ✅ Custom CLI for module creation.
- ✅ Prisma middleware for soft delete.
- ✅ Logs (Pino), Metrics (Prometheus), Tracing (Jaeger).
- ✅ Grafana dashboards for observability.
- ✅ CHANGELOD.MD and Git tags for tracking api development.
- ✅ Swagger for documentation.
- ✅ Profile Manager (Module).
- ✅ Github pipeline that runs **lint** and **unit tests**.
- ✅ Each feature has his own branch (for easily tracking).


---

## 🧱 Architecture

The project follows **Clean Architecture + DDD**:

```
└── module
    └── application
        └── entities
        └── use-cases
        └── interfaces
    └── infra
        └── database
            └── repositories
        └── http
            └── controllers
            └── viewModels
        └── adapters
            └── dtos
            └── mappers
    └── tests
        └── inMemoryRepository
        └── unit
        └── mockData
```

This separation allows easy testing, scalability, and future migrations.

---

## 🐳 Project Setup

### Prerequisites

- **Node.js** (v22.17.0)
- **Yarn** (v1.22.22)
- **Docker & Docker Compose**

### 1️⃣ Install dependencies

```bash
yarn
```

### 2️⃣ Configure environment variables

Create `.env` and `.env.dev`.
For easyble our lifes i commited the **.env.dev** (Not recomended on real-project) files:

```env

##DB
DATABASE_URL="postgresql://admin:root@db:5432/short-url-db-dev"

##JWT
JWT_EXPIRATION_TIME=77d
JWT_SECRET='super_secret'

##Observability
ENABLE_LOGGER=true
ENABLE_OBSERVABILITY=true
LOG_LEVEL=error
JAEGER_ENDPOINT=http://jaeger:4318/v1/traces

```

### 3️⃣ Run containers

```bash
yarn dev
```

[Screencast from 2025-08-01 18-27-23.webm](https://github.com/user-attachments/assets/ce5a39e6-6149-4787-97c9-e1d5d4523fa2)

---

## 📂 Swagger Documentation

Once running, visit:  
👉 `http://localhost:3000/api`

[swagger.webm](https://github.com/user-attachments/assets/b724758e-62b0-4add-9f10-0f3a813682f8)

---

## 🔍 Observability

- **Logs:** Pino + NestJS wrapper
- **Metrics:** Prometheus via `@nestjs/otel`
- **Tracing:** Jaeger integration
- **Grafana:** Centralized monitoring

You cold go for ''http://localhost:3001/dashboards'' and acces both dashboards metrics and tracing.

[Screencast from 2025-08-01 19-16-48.webm](https://github.com/user-attachments/assets/7774caa4-6acd-4fee-b53d-7805d6116b20)

---

## 🧪 Testing

Unit tests cover **100% of business rules**.  
Run tests:

```bash
yarn test:unit
```

[Screencast from 2025-08-01 18-30-21.webm](https://github.com/user-attachments/assets/2f562b3b-b63c-470e-8e57-5040e24e0541)

---

## ⚙️ CLI for Module Creation

Speed up new module generation:

```bash
yarn module
```

[Screencast from 2025-08-01 18-33-37.webm](https://github.com/user-attachments/assets/6152497c-585b-4a8f-9406-15dbbaa203bf)

---

## 📝 Technical Decisions

- **Prisma Soft Delete Middleware** to prevent physical deletions.
- **Clean Architecture + DDD** for maintainability.
- **Repository Pattern** for cache and logger abstraction.
- **Environment-driven observability** (can be toggled).
- **Focus on Unit Tests** (critical business logic first).

---

## 📚 Future Improvements

- [ ] Cloud deployment (AWS/Render).
- [ ] Pre-commit hooks.
- [ ] API Gateway integration.
- [ ] Multi-tenant architecture.

---

## 📩 Notes

- 🗓️ **Development Timeline**:

  I started development on **Monday (28-07-2025)** and finished on **Friday (01-08-2025)**, completing everything in just **5 days**.

- 🚀 **Deployment Decision**:

  I decided **not to deploy on AWS** due to time constraints and AWS is not cheap.  
  However, if implemented, the deployment flow would be:

```
  **ECR → ECS → Task Definition (ports, containers, envs) → Cluster → Service → DNS → GitHub Actions pipeline → IAM & Security Group/VPC setup**.
```

- 🛠️ **Terraform & Infrastructure**:

  I haven’t had the chance to use **Terraform** in this project, but I know everything could be managed through `.yml` definitions.

  Additionally, **Kubernetes** and **API Gateway** are not required here unless we migrate to a **microservice** or **serverless (Lambda)** architecture.

---

✨ That’s all, folks!  
I hope you enjoy exploring this project, see you on the next step(i hope).

## 📩 Contact

**Author:** [Marcos Oliveira](https://www.linkedin.com/in/marcos-oliveiraaa/)  
**Email:** [marcosoliveira.rd@gmail.com](mailto:marcosoliveira.rd@gmail.com)
