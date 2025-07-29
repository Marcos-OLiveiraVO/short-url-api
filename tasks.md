# ✅ Checklist - Sistema de Encurtamento de URLs

## 🚀 **MVP (Entrega Básica)**

- [ ] **API REST** implementada com NodeJS (última versão estável).
- [ ] Cadastro de usuários.
- [ ] Autenticação via e-mail/senha retornando Bearer Token.
- [ ] Endpoint para **encurtar URL**:
  - [ ] Aceitar requisições autenticadas e não autenticadas.
  - [ ] Gerar URL encurtada com no máximo **6 caracteres**.
  - [ ] Associar URL ao usuário autenticado.
- [ ] Endpoint de **redirecionamento**:
  - [ ] Receber URL encurtada e redirecionar para original.
  - [ ] Contabilizar acesso ao ser utilizada.
- [ ] Endpoints autenticados:
  - [ ] Listar URLs encurtadas pelo usuário com contagem de cliques.
  - [ ] Atualizar URL de destino.
  - [ ] Deletar URL encurtada (deleção lógica).
- [ ] Garantir campo `updatedAt` em todos os registros.
- [ ] Implementar soft delete (`deletedAt`) impedindo operações em registros deletados.
- [ ] Estrutura de tabelas coerente com banco relacional.
- [ ] Contabilização de acessos armazenada corretamente.
- [ ] **README/CONTRIBUTING** explicando como rodar o projeto.
- [ ] Definir variáveis de ambiente necessárias.
- [ ] API atende **Maturidade 2 REST**.

---

## 🌟 **Diferenciais (Pontos Extras)**

### 🟢 **Infraestrutura e Deploy**

- [ ] **docker-compose** para subir ambiente localmente.
- [ ] Deploy em **cloud provider** com link exposto no README.
- [ ] Artefatos de deploy:
  - [ ] Kubernetes (manifests).
  - [ ] Terraform.
- [ ] Configurar API Gateway (ex.: KrankeD).

### 🟢 **Qualidade e Observabilidade**

- [ ] Implementar testes unitários.
- [ ] Documentar API com **OpenAPI/Swagger**.
- [ ] Validar entradas em todos os endpoints.
- [ ] Implementar observabilidade:
  - [ ] Logs
  - [ ] Métricas
  - [ ] Rastreamento
  - [ ] Variável de ambiente para ativar/desativar.

### 🟢 **Boas Práticas de DevOps**

- [ ] Utilizar changelog real do desenvolvimento.
- [ ] Criar Git tags de versões (ex.: 0.1.0, 0.2.0, etc.).
- [ ] Configurar GitHub Actions para lint e testes automatizados.
- [ ] Configurar hooks de pré-commit ou pré-push.
- [ ] Definir e assegurar versão suportada do NodeJS.
- [ ] Garantir código tolerante a falhas.

---

## 🏗️ **Avançado (Escalabilidade e Arquitetura)**

- [ ] Implementar **monorepo** separando serviços:
  - [ ] Serviço de gerenciamento de identidade e acesso.
  - [ ] Serviço de regra de negócio do encurtador.
  - [ ] Comunicação entre serviços configurada.
- [ ] Transformar o sistema em **multi-tenant**.
- [ ] Listar no README pontos de melhoria para escalabilidade horizontal e principais desafios.

---

## 🎯 **Extras**

- [ ] Construir funcionalidades adicionais relevantes ao negócio.
- [ ] Garantir repositório público (GitHub) com código funcional.
- [ ] Projeto deve rodar localmente sem erros de dependência.

---
