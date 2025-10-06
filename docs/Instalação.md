### Instruções de intalações



**1. Clone o Repositório**

```bash
git clone https://github.com/PedrFelip/oportune.git
```

**2. Navegue para a Pasta do Projeto**

```bash
cd oportune
```

**3. Configure as Variáveis de Ambiente**

O projeto utiliza três arquivos `.env` para gerenciar as variáveis de ambiente.

*   **Banco de Dados (`.env.db.local`)**
    *   Crie um arquivo chamado `.env.db.local` na raiz do projeto (`/oportune`).
    *   Adicione o seguinte conteúdo, substituindo pelos seus dados:

    ```env
    # /oportune/.env.db.local

    POSTGRES_USER=

    POSTGRES_PASSWORD=

    POSTGRES_DB=


    ```

*   **Backend A (`.env.docker`)**
    *   Crie um arquivo chamado `.env.docker` na pasta do backend (`/oportune/backend`).
    *   Adicione o conteúdo, garantindo que os dados do banco sejam os mesmos do arquivo anterior e definindo sua chave secreta para JWT:

    ```env
    # /oportune/backend/.env.docker


    # Nome de usuário do banco de dados.
    POSTGRES_USER=

    # Senha do usuário do banco de dados. Use uma senha forte.
    POSTGRES_PASSWORD=

    # Nome do banco de dados a ser criado.
    POSTGRES_DB=


    # String de Conexão para a Aplicação

    DATABASE_URL="postgresql://<user>:<password>@db:5432/<database>?schema=public"


    # Segredo para Autenticação (JWT)

    JWT_SECRET=


    # Variáveis Específicas do Prisma

    DATABASE_URL_prisma=

    ```

*   **Backend B (`.env`)**
    *   Caso queira rodar o `backend` separadamente existe um `.env` que ultilizando o `nmp run dev` irá estar iniciando o backend separado.
    ```env
    

   
    # Configuração do Banco de Dados (PostgreSQL)


    DATABASE_URL_prisma="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

    # Nome de usuário do banco de dados.
    POSTGRES_USER=


    # Senha do usuário do banco de dados. Use uma senha forte.
    POSTGRES_PASSWORD=


    # Nome do banco de dados a ser criado.
    POSTGRES_DB=


    # String de Conexão para a Aplicação
    DATABASE_URL=postgresql://<user>:<password>@LocalHost:5432/<database>?schema=public
    # Segurança e Autenticação

    JWT_SECRET=sua_chave_secreta_super_segura_aqui


    ```

*   **Serviço de E-mail (`.env.go`)**
    *   Crie um arquivo chamado `.env.go` na pasta do serviço de e-mail (`/oportune/email-service`).
    *   Adicione as variáveis necessárias para o serviço de e-mail (exemplo abaixo, ajuste conforme a necessidade do seu projeto):

    ```env
      
    # Configuração do Banco de Dados PostgreSQL (para Docker Compose)

    POSTGRES_USER=
    POSTGRES_PASSWORD=
    POSTGRES_DB=


    # String de Conexão para a Aplicação

    DATABASE_URL="postgresql://<user>:<password>@db:5432/<database>?schema=public"


    # Segredo para Autenticação (JWT)

    JWT_SECRET=


    # Configuração do Serviço de E-mail (SMTP)

    SMTP_HOST=smtp.gmail.com

    # Porta do servidor SMTP (587 é o padrão para TLS).
    SMTP_PORT=587

    # E-mail que será usado como remetente.
    SMTP_USER=

    # Senha para o e-mail. Se usar Gmail, esta deve ser uma "Senha de App".
    SMTP_PASS=


    # URLs da Aplicação

    FRONTEND_URL=http://localhost:5173

    ```

**4. Instale as Dependências do Frontend**

Abra o terminal ou navegue pela pasta para instalar as dependências `npm` .

*   **Para o Frontend:**
    ```bash
    # /oportune/frontend
    cd frontend
    npm install
    ```

*   

**5. Execute os Serviços com Docker Compose**

Este comando irá construir e iniciar os contêineres do banco de dados, do backend e do serviço de e-mail, conforme definido no arquivo `docker-compose.yml`.

```bash
docker compose up --build
```

**6. Execute o Frontend**

Em um novo terminal, navegue até a pasta do frontend e inicie o servidor de desenvolvimento.

```bash
cd frontend
npm run dev
```

Agora a aplicação deve estar rodando e acessível no seu navegador com o `http://localhost:5173` .


  
   

## Como Usar

1. Acesse a plataforma via navegador (ex: http://localhost:5173).
2. Cadastre-se selecionando o tipo de usuário (Aluno, Professor ou Empresa).
3. Faça login com email e senha.
4. Alunos: Busque oportunidades, aplique com one-click e gerencie candidaturas.
5. Professores/Empresas: Publique vagas/projetos, visualize candidaturas e atualize status.

Para mais detalhes, consulte as regras de negócio no documento de requisitos.
