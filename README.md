## Oportune +


<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Desenvolvimento](https://img.shields.io/badge/status-%20Desenvolvimento-yellow)

</div>

## Índice

- [Descrição do Projeto](#descrição-do-projeto)
- [Status do Projeto](#status-do-projeto)
- [Funcionalidades e Demonstração](#funcionalidades-e-demonstração)
- [Instruções de Instalação](#instruções-de-instalação)
- [Como Usar](#como-usar)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Contribuição](#contribuição)
- [Autores e Contatos](#autores-e-contatos)
- [Licença](#licença)

## Descrição do Projeto


O Oportune+ é uma plataforma web que conecta alunos, professores e empresas, centralizando a divulgação de oportunidades para quem está no início da carreira.

Muitos alunos enfrentam um dilema clássico: precisam de experiência para conseguir um emprego, mas não conseguem um emprego para ganhar experiência. 
Encontrar as oportunidades certas, como estágios e projetos acadêmicos, é um desafio.

O Oportune+ resolve esse problema ao criar um ecossistema onde:
* Empresas e professores podem divulgar vagas de estágio, projetos e outras oportunidades de forma simples e direta.
* Alunos encontram em um só lugar as chances que precisam para começar sua trajetória profissional.
Nosso objetivo é ser a ponte que transforma potencial em experiência.

## Status do Projeto

Em desenvolvimento 

## Funcionalidades e Demonstração

As principais funcionalidades do Oportune + foram definidas com base nos requisitos funcionais e não funcionais, regras de negócio e requisitos de domínio.

### Demonstração
A plataforma é uma Single-Page Application (SPA) com interface intuitiva. Exemplos de fluxos:
- **Cadastro e Login**: Formulário multi-etapas adaptado ao tipo de usuário.
- **Busca e Candidatura**: Filtros avançados e aplicação one-click.
- **Notificações**: Emails para confirmações e atualizações de status.

### Requisitos Funcionais
| ID     | Requisito                                                                 | Prioridade | Status |
|--------|---------------------------------------------------------------------------|------------|--------|
| R01.1  | Permitir o cadastro de três tipos de usuários: Alunos, Empresas e Professores, com formulário específico. | Alta       | []     |
| R01.2  | Interface de login para que usuários cadastrados acessem a plataforma usando email e senha. | Alta       | []     |
| R01.3  | Mecanismo de recuperação de senha, validando a identidade do usuário antes da redefinição. | Média      | [ ]     |
| R01.4  | Perfis de usuário personalizados e distintos, contendo informações únicas por tipo (currículo, portfólio, projetos). | Alta       | []     |
| R02.1  | Permitir que Empresas e Professores publiquem oportunidades de estágio e projetos, respectivamente. | Média      | [ ]     |
| R02.2  | Funcionalidade de busca avançada de vagas, com filtros por área, semestre e carga horária. | Baixa      | [ ]     |
| R02.3  | Processo de candidatura simplificado ("one-click application") usando dados do perfil do aluno. | Alta       | [ ]     |
| R03.1  | Enviar notificação por email para confirmar cadastro concluído com sucesso. | Alta       | []     |
| R03.2  | Notificar alunos por email sobre mudanças no status de suas candidaturas (em análise, aprovado, rejeitado). | Baixa      | [ ]     |

### Requisitos Não Funcionais
| ID     | Requisito                                                                 | Métrica / Critério de Aceitação | Status |
|--------|---------------------------------------------------------------------------|---------------------------------|--------|
| RNF01  | Desempenho: tempo de resposta do servidor para carregamento de qualquer página. | ≤ 7 segundos em condições normais de tráfego | [ ]     |
| RNF02  | Escalabilidade: suportar múltiplas sessões simultâneas. | ≥ 1.000 sessões simultâneas sem queda perceptível de desempenho | [ ]     |
| RNF03  | Segurança: armazenamento de senhas de forma anonimizada. | Uso de algoritmos de hash (ex.: bcrypt, Argon2) | [ ]     |
| RNF04  | Disponibilidade: manter operação contínua do sistema. | Uptime mínimo de 99,5% | [ ]     |
| RNF05  | Usabilidade: interface responsiva e intuitiva em diferentes dispositivos. | Compatível com desktop, tablet e mobile, seguindo princípios de design responsivo | [ ]     |


### Demonstração
A plataforma é uma Single-Page Application (SPA) com interface intuitiva. Exemplos de fluxos:
- **Cadastro e Login**: Formulário multi-etapas adaptado ao tipo de usuário.
- **Busca e Candidatura**: Filtros avançados e aplicação one-click.
- **Notificações**: Emails para confirmações e atualizações de status.


## Instruções de Instalação

1. Clone o repositório:
   ```
   git clone https://github.com/PedrFelip/oportune.git
   ```
2. Navegue para a pasta do projeto:
   ```
   cd oportune
   ```
3. Instale as dependências do backend (Node.js requerido):
   ```
   cd backend
   npm install
   ```
4. Instale as dependências do frontend:
   ```
   cd ../frontend
   npm install
   ```
5. Configure o banco de dados PostgreSQL e atualize o arquivo `.env` com credenciais (ex: DATABASE_URL).
6. Rode as migrações com Prisma:
   ```
   npx prisma migrate dev
   ```
7. Inicie o servidor backend:
   ```
   npm run start
   ```
8. Inicie o frontend:
   ```
   npm run start
   ```
9. Use Docker para ambiente containerizado (se aplicável):
   ```
   docker-compose up
   ```

Certifique-se de ter Node.js v14+, PostgreSQL e Docker instalados.

## Como Usar

1. Acesse a plataforma via navegador (ex: http://localhost:3000).
2. Cadastre-se selecionando o tipo de usuário (Aluno, Professor ou Empresa).
3. Faça login com email e senha.
4. Alunos: Busque oportunidades, aplique com one-click e gerencie candidaturas.
5. Professores/Empresas: Publique vagas/projetos, visualize candidaturas e atualize status.

Para mais detalhes, consulte as regras de negócio no documento de requisitos.

## Tecnologias Utilizadas

- **Frontend**: React, Tailwind CSS, JavaScript, JSX
- **Backend**: Node.js, Fastify (para APIs REST), TypeScript
- **Banco de Dados**: PostgreSQL, Prisma (ORM)
- **Outras**: Docker (containerização), Go (microsserviços), Python (validações específicas), Figma (prototipagem)
- **Gerenciamento**: Scrum, Trello, Discord, Google Drive

## Contribuição

O Oportune + é um projeto open source e contribuições são bem-vindas! Se você quiser ajudar a melhorar a plataforma, siga as diretrizes abaixo para contribuir de forma eficaz. Nós valorizamos contribuições de todos os níveis, desde correções de bugs até novas funcionalidades.

### Como Contribuir

1. **Reporte Bugs ou Sugira Funcionalidades**:
   - Abra uma [issue](https://github.com/PedrFelip/oportune/issues) no repositório.
   - Descreva o problema ou ideia com o máximo de detalhes possível, incluindo passos para reproduzir (para bugs) ou justificativa para a funcionalidade.
   - Use labels como "bug", "enhancement" ou "question" para categorizar.

2. **Faça um Fork e Crie uma Pull Request**:
   - Fork o repositório para sua conta no GitHub.
   - Crie uma branch para sua contribuição: `git checkout -b feature/nova-funcionalidade` ou `git checkout -b fix/correcao-bug`.
   - Faça as mudanças no código, seguindo o estilo de código existente (use ESLint/Prettier se configurado).
   - Commit suas alterações com mensagens claras: `git commit -m 'Adiciona nova funcionalidade de busca avançada'`.
   - Push para sua branch: `git push origin feature/nova-funcionalidade`.
   - Abra uma Pull Request (PR) comparando sua branch com a main do repositório original.
   - Na descrição da PR, explique o que foi alterado, por quê, e referencie issues relacionadas (ex: "Fecha #123").

3. **Ambiente de Desenvolvimento**:
   - Siga as [Instruções de Instalação](#instruções-de-instalação) para configurar localmente.
   - Rode testes (se disponíveis): `npm test` no frontend e backend.
   - Certifique-se de que suas mudanças não quebram funcionalidades existentes.

4. **Estilo de Código e Boas Práticas**:
   - Mantenha o código limpo, comentado e modular.
   - Use convenções de nomenclatura consistentes (ex: camelCase para variáveis).
   - Adicione testes unitários para novas funcionalidades.
   - Respeite as regras de negócio e requisitos descritos no PDF de documentação.

5. **Código de Conduta**:
   - Seja respeitoso e inclusivo em todas as interações.
   - Contribuições que violem o código de conduta serão rejeitadas.

Se você é novo no open source, confira guias como [First Contributions](https://github.com/firstcontributions/first-contributions). Estamos animados para ver sua contribuição!

## Autores e Contatos

- **Equipe de Desenvolvimento**: Responsável pela concepção, implementação e manutenção.
  - Contato: [oportunecontatos@gmail.com](oportunecontatos@gmail.com) 
  - GitHub: [Pedro Felipe](https://github.com/PedrFelip)  |  [Gabriel](https://github.com/gabbzin)  |  [Lucas Felipe](https://github.com/Lucasdx7)

Para mais informações, entre em contato via issues no GitHub.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](https://github.com/PedrFelip/oportune/blob/main/LICENSE) para detalhes.
