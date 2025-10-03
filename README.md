# Oportune +

![Oportune + Logo](https://github.com/PedrFelip/oportune/blob/main/Logo.png)

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Desenvolvimento](https://img.shields.io/badge/progresso-50%25-blue)

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

O Oportune + é um sistema web desenvolvido para facilitar a conexão entre alunos, professores e vagas externas, com foco em oportunidades de trabalho e aprendizado. A plataforma visa superar o desafio da primeira experiência profissional dos alunos, centralizando informações sobre estágios, projetos de pesquisa e iniciativas de extensão da Faculdade.

Nos últimos anos, o mercado de trabalho tem apresentado desafios significativos para estudantes em busca de sua primeira experiência profissional. Um dos grandes obstáculos é a exigência de experiência prévia, conhecido como "paradoxo da experiência": como adquirir experiência sem ter um emprego? Uma pesquisa da Trendsity em parceria com o McDonald's (2018) revelou que 77% dos jovens brasileiros consideram a falta de experiência o maior obstáculo para entrada no mercado de trabalho, além de falta de oportunidades (69%) e falta de confiança nas novas gerações (68%).

Este paradoxo é agravado pela desorganização das informações sobre oportunidades disponíveis. Estudantes enfrentam dificuldades para localizar vagas de estágio e projetos de pesquisa ou extensão alinhados com seu perfil, enquanto empresas e professores não conseguem alcançar esses alunos. Projetos de extensão são reconhecidos pelo mercado como experiência prática, proporcionando aos estudantes habilidades técnicas e comportamentais essenciais para sua formação profissional.

O Oportune + conecta alunos, empresas e professores de forma centralizada, facilitando o acesso à primeira experiência profissional através de estágios, projetos de pesquisa e iniciativas de extensão. Com funcionalidades como perfis personalizados, busca avançada e candidaturas simplificadas, a plataforma promove a transição suave entre a vida acadêmica e profissional.

Stakeholders principais incluem:
- Universitários: Buscando oportunidades de desenvolvimento profissional e acadêmico.
- Professores: Recrutando estudantes para projetos de extensão e pesquisa.
- Equipe de Desenvolvimento: Responsável pela implementação e manutenção.
- Empresas: Utilizando a plataforma para recrutar estagiários qualificados.

## Status do Projeto

Em desenvolvimento 

## Funcionalidades e Demonstração

As principais funcionalidades do Oportune + foram definidas com base nos requisitos funcionais e não funcionais, regras de negócio e requisitos de domínio.


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
