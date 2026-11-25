# DevLink

Projeto pessoal de estudos: uma página de links inspirada no Linktree, com uma área administrativa para cadastrar links e configurar redes sociais. Foi desenvolvido para praticar React, TypeScript, rotas e integração com Firebase.

## Funcionalidades

- Página pública com links cadastrados e atalhos para Facebook, Instagram e YouTube.
- Login com e-mail e senha pelo Firebase Authentication.
- Área administrativa protegida para cadastrar e excluir links, escolher suas cores e visualizar uma prévia.
- Formulário para salvar os links das redes sociais.

## Tecnologias

React, TypeScript, Vite, Tailwind CSS, React Router, Firebase Authentication e Cloud Firestore.

## Como executar

É necessário ter Node.js e npm instalados.

```bash
npm ci
npm run dev
```

Abra no navegador o endereço local mostrado pelo Vite. Outros comandos disponíveis:

```bash
npm run lint
npm run build
npm run preview
```

## Configuração do Firebase

O projeto usa a configuração definida em `src/services/firebaseConnection.tsx`. Para usar seu próprio projeto Firebase, substitua os valores de `firebaseConfig` pelos dados do seu aplicativo web, habilite a autenticação por e-mail e senha e crie um banco Cloud Firestore.

O código utiliza estes dados no Firestore:

| Local | Campos | Uso |
| --- | --- | --- |
| Coleção `links` | `name`, `url`, `bg`, `color`, `created` | Links exibidos na página pública, ordenados por `created`. |
| Documento `redesSociais/link` | `facebook`, `instagram`, `youtube` | URLs dos ícones de redes sociais. |

Crie um usuário no Firebase Authentication para acessar `/login` e configure as regras do Firestore para permitir a leitura pública dos links e das redes sociais, restringindo alterações ao administrador. A proteção da rota no React controla a interface, mas as permissões dos dados são definidas pelas regras do Firestore.

## Rotas

| Rota | Página |
| --- | --- |
| `/` | Página pública de links. |
| `/login` | Acesso à área administrativa. |
| `/admin` | Cadastro e exclusão de links. |
| `/admin/social` | Configuração das redes sociais. |

Este repositório é um projeto pessoal para aprendizado e prática.
