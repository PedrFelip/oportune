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
    POSTGRES_USER=seu_usuario
    POSTGRES_PASSWORD=sua_senha
    POSTGRES_DB=seu_banco_de_dados
    ```

*   **Backend (`.env.docker`)**
    *   Crie um arquivo chamado `.env.docker` na pasta do backend (`/oportune/backend`).
    *   Adicione o conteúdo, garantindo que os dados do banco sejam os mesmos do arquivo anterior e definindo sua chave secreta para JWT:

    ```env
    # /oportune/backend/.env.docker
    DATABASE_URL="postgresql://seu_usuario:sua_senha@db:5432/seu_banco_de_dados?schema=public"
    JWT_SECRET=sua_chave_secreta_super_segura
    ```

*   **Serviço de E-mail (`.env`)**
    *   Crie um arquivo chamado `.env` na pasta do serviço de e-mail (`/oportune/email-service`).
    *   Adicione as variáveis necessárias para o serviço de e-mail (exemplo abaixo, ajuste conforme a necessidade do seu projeto):

    ```env
      ....
    ```

**4. Instale as Dependências do Frontend e Backend**

Abra dois terminais ou navegue pelas pastas para instalar as dependências `npm` em ambos os serviços.

*   **Para o Frontend:**
    ```bash
    cd frontend
    npm install
    ```

*   **Para o Backend:**
    ```bash
    cd backend
    npm install
    ```

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
