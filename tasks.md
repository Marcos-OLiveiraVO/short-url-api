# ✅ Checklist - Sistema de Encurtamento de URLs

## 🚀 **MVP (Entrega Básica)**

- [x] **API REST** implementada com NodeJS (última versão estável).
- [x] Cadastro de usuários.
- [x] Autenticação via e-mail/senha retornando Bearer Token.
- [x] Endpoint para **encurtar URL**:
  - [x] Aceitar requisições autenticadas e não autenticadas.
  - [x] Gerar URL encurtada com no máximo **6 caracteres**.
  - [x] Associar URL ao usuário autenticado.
- [x] Endpoint de **redirecionamento**:
  - [x] Receber URL encurtada e redirecionar para original.
  - [x] Contabilizar acesso ao ser utilizada.
- [x] Endpoints autenticados:
  - [x] Listar URLs encurtadas pelo usuário com contagem de cliques.
  - [x] Atualizar URL de destino.
  - [x] Deletar URL encurtada (deleção lógica).
- [x] Garantir campo `updatedAt` em todos os registros.
- [x] Implementar soft delete (`deletedAt`) impedindo operações em registros deletados.
- [x] Estrutura de tabelas coerente com banco relacional.
- [x] Contabilização de acessos armazenada corretamente.
- [ ] **README/CONTRIBUTING** explicando como rodar o projeto.
- [x] Definir variáveis de ambiente necessárias.
- [x] API atende **Maturidade 2 REST**.

---

## 🌟 **Diferenciais (Pontos Extras)**

### 🟢 **Infraestrutura e Deploy**

- [x] **docker-compose** para subir ambiente localmente.
- [ ] Deploy em **cloud provider** com link exposto no README.
- [ ] Artefatos de deploy:
  - [ ] Kubernetes (manifests).
  - [ ] Terraform.
- [ ] Configurar API Gateway (ex.: KrankeD).

### 🟢 **Qualidade e Observabilidade**

- [ ] Implementar testes unitários.
- [x] Documentar API com **OpenAPI/Swagger**.
- [x] Validar entradas em todos os endpoints.
- [x] Implementar observabilidade:
  - [x] Logs
  - [x] Métricas
  - [x] Rastreamento
  - [x] Variável de ambiente para ativar/desativar.

### 🟢 **Boas Práticas de DevOps**

- [x] Utilizar changelog real do desenvolvimento.
- [x] Criar Git tags de versões (ex.: 0.1.0, 0.2.0, etc.).
- [ ] Configurar GitHub Actions para lint e testes automatizados.
- [ ] Configurar hooks de pré-commit ou pré-push.
- [x] Definir e assegurar versão suportada do NodeJS.
- [x] Garantir código tolerante a falhas.

---

## 🏗️ **Avançado (Escalabilidade e Arquitetura)**

- [x] Implementar **monorepo** separando serviços:
  - [x] Serviço de gerenciamento de identidade e acesso.
  - [x] Serviço de regra de negócio do encurtador.
  - [x] Comunicação entre serviços configurada.
- [ ] Transformar o sistema em **multi-tenant**.
- [ ] Listar no README pontos de melhoria para escalabilidade horizontal e principais desafios.

---

## 🎯 **Extras**

- [ ] Construir funcionalidades adicionais relevantes ao negócio.
- [ ] Garantir repositório público (GitHub) com código funcional.
- [ ] Projeto deve rodar localmente sem erros de dependência.

---
