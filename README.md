# WebYugi Frontend

Frontend SPA em React + TypeScript, com Vite para desenvolvimento e build e React Router para navegação. A API permanece em ASP.NET Core; este projeto contém apenas a interface e a camada cliente.

## Executar localmente

1. Inicie o backend dentro de `WebYugi/WebYugi` com `dotnet run --launch-profile https` (endereço: `https://localhost:7146`). O proxy local aponta diretamente para esse endereço e aceita o certificado de desenvolvimento do ASP.NET.
2. Na pasta `WebYugi_front`, instale as dependências com `npm install`.
3. Inicie a interface com `npm run dev` e abra o endereço apresentado pelo Vite (por padrão `http://localhost:5173`).

O Vite encaminha `/api/*` e `/uploads/*` ao backend durante o desenvolvimento para manter as chamadas e o cookie de sessão na mesma origem do navegador; as imagens retornadas em `CardDto.ImageUrl` são mostradas no catálogo. Se a API estiver em outro endereço, defina `WEBYUGI_API_TARGET` antes de iniciar o Vite (ou em `.env.local`). O proxy está disponível no servidor de desenvolvimento e no preview local. Em produção, configure o servidor de hospedagem para encaminhar `/api` ao backend na mesma origem, ou configure CORS e cookies no backend; o build estático sozinho não fornece um proxy.

## Rotas

- `/`: apresentação pública do WebYugi.
- `/login`: autenticação com e-mail ou nome de usuário.
- `/cadastro`: cadastro e autenticação automática após a criação da conta.
- `/dashboard`: área autenticada; valida a sessão em `/users/me` antes de mostrar dados e encaminha visitantes ao login.

## Integração atual

O módulo `src/lib/api` centraliza as chamadas. São usados `POST /users`, `POST /users/login`, `GET /users/me`, `POST /users/logout` e `GET /cards`. A interface não consulta `/decks`: o endpoint atual retorna decks sem filtrar pelo usuário autenticado. Também não há endpoint de duelos ou resumo agregado do dashboard no backend.

## Organização

```text
src/
  app/                 rotas e composição da aplicação
  components/          componentes visuais compartilhados
  features/
    auth/              autenticação, cadastro e layout das telas
    dashboard/         área autenticada e apresentação do catálogo
    landing/           página pública de apresentação
  lib/api/             cliente HTTP e endpoints tipados
  types/               contratos de API
  main.tsx             inicialização do React
  styles.css           estilos globais e responsivos
index.html             entrada do Vite
vite.config.ts         servidor de desenvolvimento e proxy local
```

Comandos disponíveis: `npm run dev`, `npm run build` e `npm run preview`.
