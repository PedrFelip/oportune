# Oportune+ 

Plataforma completa que conecta talentos a oportunidades em faculdades, com landing page moderna e sistema backend integrado.

## 🚀 Estrutura do Projeto

```
oportune/
├── backend/           # API e servidor backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   └── package.json
├── frontend/          # Landing page React
│   ├── src/
│   │   ├── components/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── App.css
│   └── package.json
└── README.md
```

## 🎨 Frontend - Landing Page

A landing page foi desenvolvida em React seguindo fielmente o design da Oportune+, incluindo:

### ✅ Funcionalidades Implementadas:

- **Header responsivo** com logo, navegação e botão CTA
- **Seção hero** com título em gradiente e descrição
- **Botões de seleção** de perfil (Aluno, Empresa, Professor)
- **Cards interativos** do processo em 3 etapas
- **Sidebar** com vagas recentes
- **Seção de benefícios** com ícones estilizados
- **Depoimentos** de usuários com avatares
- **Call-to-action** final
- **Rodapé** com informações de contato

### 🎨 Design Features:

- Gradiente de fundo dark theme
- Botões com gradiente azul e efeitos hover
- Cards com backdrop blur e transparência
- Animações suaves e micro-interações
- Design totalmente responsivo
- Ícones com gradiente azul personalizado

### 🛠️ Tecnologias Frontend:

- **React 19** - Biblioteca JavaScript
- **Vite** - Build tool e servidor de desenvolvimento
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Componentes de UI reutilizáveis
- **Lucide React** - Ícones modernos
- **Framer Motion** - Animações
- **pnpm** - Gerenciador de pacotes

## 🔧 Backend

Sistema backend para gerenciar a plataforma Oportune+.

### Estrutura:
- **Controllers** - Lógica de controle das rotas
- **Middlewares** - Middleware de autenticação e validação
- **Repositories** - Camada de acesso a dados
- **Routes** - Definição das rotas da API
- **Services** - Lógica de negócio
- **Utils** - Utilitários e helpers

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 18 ou superior)
- pnpm (recomendado) ou npm

### Frontend

1. **Navegue para o diretório frontend**
   ```bash
   cd frontend
   ```

2. **Instale as dependências**
   ```bash
   pnpm install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   pnpm run dev
   ```

4. **Acesse no navegador**
   ```
   http://localhost:5173
   ```

### Backend

1. **Navegue para o diretório backend**
   ```bash
   cd backend
   ```

2. **Instale as dependências**
   ```bash
   pnpm install
   ```

3. **Inicie o servidor**
   ```bash
   pnpm run dev
   ```

## 📱 Responsividade

A landing page é totalmente responsiva:

- **Desktop** (1024px+): Layout completo com sidebar
- **Tablet** (768px-1024px): Grid adaptado
- **Mobile** (<768px): Layout em coluna única

## 🎯 Componentes Principais

### Header
- Logo da Oportune+
- Menu de navegação responsivo
- Botão de CTA "Criar conta"

### Hero Section
- Título principal com gradiente
- Descrição da plataforma
- Botões de seleção de perfil
- Cards com processo em 3 passos
- Sidebar com vagas recentes

### Benefits Section
- Cards com ícones e descrições
- Layout responsivo em grid
- Efeitos hover suaves

### Testimonials Section
- Cards de depoimentos
- Avatares com iniciais
- Layout em duas fileiras

### CTA Section
- Call-to-action final
- Botões de ação primária e secundária

### Footer
- Informações de copyright
- Links de contato e políticas

## 🎨 Customizações CSS

Classes customizadas no `App.css`:

- `.oportune-gradient` - Gradiente de fundo principal
- `.oportune-card` - Cards com backdrop blur
- `.oportune-button-primary` - Botão primário com gradiente
- `.testimonial-card` - Cards de depoimentos
- `.hero-text` - Texto do hero com gradiente
- `.feature-icon` - Ícones com fundo gradiente

## 🚀 Deploy

### Frontend
```bash
cd frontend
pnpm run build
# Os arquivos estarão na pasta dist/
```

### Backend
```bash
cd backend
pnpm run build
# Configure seu servidor de produção
```

## 📄 Licença

Este projeto foi desenvolvido como implementação da plataforma Oportune+.

## 🤝 Contribuições

Sugestões e melhorias são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

---

**Desenvolvido com ❤️ usando React, Node.js e tecnologias modernas**

