# Welington R. - Link na Bio

Um site moderno e responsivo para centralizar todos os seus links em um único lugar. Desenvolvido com React, Vite e Tailwind CSS.

## Características

- ✨ Design premium e refinado
- 🎨 Tema escuro com acentos em laranja
- 📱 Totalmente responsivo
- ⚡ Carregamento rápido com Vite
- 🎭 Animações suaves com Framer Motion
- 🔗 Links para Instagram, TikTok, X (Twitter) e Telegram
- 🔐 Card destacado para Privacy

## Tecnologias

- **React 19** - Framework UI
- **Vite** - Build tool rápido
- **Tailwind CSS** - Styling
- **Framer Motion** - Animações
- **Wouter** - Roteamento leve
- **TypeScript** - Type safety

## Como Usar

### Instalação

```bash
pnpm install
```

### Desenvolvimento

```bash
pnpm dev
```

O site estará disponível em `http://localhost:3000`

### Build para Produção

```bash
pnpm build
```

Os arquivos compilados estarão em `dist/`

## Customização

### Editar Links

Abra `client/src/pages/Home.tsx` e modifique o array `LINKS` com seus URLs:

```typescript
const LINKS: LinkItem[] = [
  {
    id: "instagram",
    label: "Instagram",
    url: "https://seu-instagram",
    // ...
  },
  // Adicione mais links conforme necessário
];
```

### Editar Informações Pessoais

- **Nome e Bio:** Modifique em `client/src/pages/Home.tsx`
- **Foto de Perfil:** Substitua `client/public/profile.jpeg`
- **Cores:** Ajuste as cores em `client/src/index.css`

## Publicação no GitHub Pages

Este projeto está configurado para ser publicado automaticamente no GitHub Pages via GitHub Actions.

1. Faça um push para a branch `main`
2. O GitHub Actions fará o build e deploy automaticamente
3. Seu site estará disponível em `https://<seu-usuario>.github.io/wellpriv`

## Licença

MIT

---

Desenvolvido com ❤️ para Welington R.
