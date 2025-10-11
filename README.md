## Oportune +


<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Desenvolvimento](https://img.shields.io/badge/status-%20Desenvolvimento-yellow)

</div>

## Índice

- [Descrição do Projeto](#descrição-do-projeto)
- [Status do Projeto](#status-do-projeto)
- [Funcionalidades e Demonstração](#funcionalidades-e-demonstração)
- [Requisitos Funcionais](#Requisitos-Funcionais)
- [Instalações](#Instalações)
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
   - [x]  Permitir o cadastro de três tipos de usuários: Alunos, Empresas e Professores, com formulário específico.
   
   - [x]  Interface de login para que usuários cadastrados acessem a plataforma usando email e senha.

   - [x]  Enviar notificação por email para confirmar cadastro concluído com sucesso.
      
   - [x]  Mecanismo de recuperação de senha, validando a identidade do usuário antes da redefinição.
   
   - [ ]  Perfis de usuário personalizados e distintos, contendo informações únicas por tipo (currículo, portfólio, projetos).
   
   - [ ]  Permitir que Empresas e Professores publiquem oportunidades de estágio e projetos, respectivamente.

   - [ ]  Processo de candidatura simplificado ("one-click application") usando dados do perfil do aluno.
  
   - [ ]  Notificar alunos por email sobre mudanças no status de suas candidaturas (em análise, aprovado, rejeitado).
   
   - [ ]  Funcionalidade de busca avançada de vagas, com filtros por área, semestre e carga horária.


## Instalações
Para intalar e rodar siga o passo a passo da [instalação](https://github.com/PedrFelip/oportune/blob/main/docs/Instalação.md)

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
