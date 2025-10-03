# Oportune +
# Badges

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

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

O projeto ainda está sendo desenvolvido, estamos adicionando novas funcionalidades, em breve irá estar concluido  ![Progresso](https://img.shields.io/badge/progresso-50%25-blue)

## Funcionalidades e Demonstração

As principais funcionalidades do Oportune + foram definidas com base nos requisitos funcionais e não funcionais, regras de negócio e requisitos de domínio. Aqui está uma lista das funcionalidades chave:

### Requisitos Funcionais
| ID     | Requisito                                                                 | Prioridade |
|--------|---------------------------------------------------------------------------|------------|
| R01.1  | Permitir o cadastro de três tipos de usuários: Alunos, Empresas e Professores, com formulário específico. | Alta      |
| R01.2  | Interface de login para que usuários cadastrados acessem a plataforma usando email e senha. | Alta      |
| R01.3  | Mecanismo de recuperação de senha, validando a identidade do usuário antes da redefinição. | Média     |
| R01.4  | Perfis de usuário personalizados e distintos, contendo informações únicas por tipo (currículo, portfólio, projetos). | Alta      |
| R02.1  | Permitir que Empresas e Professores publiquem oportunidades de estágio e projetos, respectivamente. | Média     |
| R02.2  | Funcionalidade de busca avançada de vagas, com filtros por área, semestre e carga horária. | Baixa     |
| R02.3  | Processo de candidatura simplificado ("one-click application") usando dados do perfil do aluno. | Alta      |
| R03.1  | Enviar notificação por email para confirmar cadastro concluído com sucesso. | Alta      |
| R03.2  | Notificar alunos por email sobre mudanças no status de suas candidaturas (em análise, aprovado, rejeitado). | Baixa     |

### Requisitos Não Funcionais
| ID     | Requisito                                                                 | Métrica / Critério de Aceitação |
|--------|---------------------------------------------------------------------------|---------------------------------|
| RNF01  | Desempenho: tempo de resposta do servidor para carregamento de qualquer página. | ≤ 7 segundos em condições normais de tráfego |
| RNF02  | Escalabilidade: suportar múltiplas sessões simultâneas. | ≥ 1.000 sessões simultâneas sem queda perceptível de desempenho |
| RNF03  | Segurança: armazenamento de senhas de forma anonimizada. | Uso de algoritmos de hash (ex.: bcrypt, Argon2) |
| RNF04  | Disponibilidade: manter operação contínua do sistema. | Uptime mínimo de 99,5% |
| RNF05  | Usabilidade: interface responsiva e intuitiva em diferentes dispositivos. | Compatível com desktop, tablet e mobile, seguindo princípios de design responsivo |

### Demonstração
A plataforma é uma Single-Page Application (SPA) com interface intuitiva. Exemplos de fluxos:
- **Cadastro e Login**: Formulário multi-etapas adaptado ao tipo de usuário.
- **Busca e Candidatura**: Filtros avançados e aplicação one-click.
- **Notificações**: Emails para confirmações e atualizações de status.

Para demonstração visual, consulte os protótipos no Figma ou execute localmente para ver o dashboard do aluno, perfis e gerenciamento de vagas.

<!-- Inclua screenshots se disponíveis no repositório, ex: -->
<!-- ![Dashboard Aluno](path/to/screenshot.png) -->

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

Contribuições são bem-vindas! Siga estes passos:
1. Fork o repositório.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`).
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`).
4. Push para a branch (`git push origin feature/nova-funcionalidade`).
5. Abra um Pull Request.

Por favor, siga o código de conduta e teste suas mudanças.

## Autores e Contatos

- **Equipe de Desenvolvimento**: Responsável pela concepção, implementação e manutenção.
  - Contato: [oportunecontatos@gmail.com](oportunecontatos@gmail.com) 
  - GitHub: [Pedro Felipe](https://github.com/PedrFelip)  |  [Gabriel](https://github.com/gabbzin)  |  [Lucas Felipe](https://github.com/Lucasdx7)

Para mais informações, entre em contato via issues no GitHub.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.


