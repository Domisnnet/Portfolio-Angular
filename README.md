![GitHub repo size](https://img.shields.io/github/repo-size/Domisnnet/Portfolio-Angular?style=for-the-badge)
![GitHub stars](https://img.shields.io/github/stars/Domisnnet/Portfolio-Angular?style=for-the-badge)
![GitHub last commit](https://img.shields.io/github/last-commit/Domisnnet/Portfolio-Angular?style=for-the-badge)

<h1 id="topo">🚀 DomisDev Portfólio - Engenharia Front-end</h1>

![Status do Deploy](https://img.shields.io/badge/Status-Online-brightgreen?style=flat-square)
![Angular](https://img.shields.io/badge/Angular-20-DD0031?style=flat-square&logo=angular&logoColor=white)
![Hosting](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black)
[![Licença MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://github.com/Domisnnet/Portfolio-Angular/blob/main/LICENSE)
![Portfólio](src/assets/images/portfólio.png)

Bem-vindo ao repositório do meu **Portfólio Profissional**. Esta aplicação é uma vitrine técnica desenvolvida com **Angular 20**, utilizando componentes **Standalone** para máxima reutilização e otimização de performance. O projeto combina design em **SCSS modular** com uma infraestrutura escalável no **Firebase**, refletindo minha stack como especialista em Front-end.

---

## 📚 Tabela de Conteúdo

| 💻 O Projeto | 🛠️ Técnico | 🤝 Comunidade |
| :---: | :---: | :---: |
| [![1. Sobre](https://img.shields.io/badge/1%20-%20Sobre-4CAF50)](#sobre-o-projeto) | [![5. Destaques](https://img.shields.io/badge/5%20-%20Destaques-607D8B)](#destaques-tecnicos) | [![9. FAQ](https://img.shields.io/badge/9%20-%20FAQ-FFC107)](#faq) |
| [![2. Techs](https://img.shields.io/badge/2%20-%20Techs-2196F3)](#tecnologias-utilizadas) | [![6. Deploy](https://img.shields.io/badge/6%20-%20Deploy-009688)](#fluxo-de-deploy) | [![10. Créditos](https://img.shields.io/badge/10%20-%20Créditos-607D8B)](#créditos) |
| [![3. Acessar](https://img.shields.io/badge/3%20-%20Acessar-FF9800)](#como-acessar) | [![7. Roadmap](https://img.shields.io/badge/7%20-%20Roadmap-795548)](#roadmap) | [![11. Licença](https://img.shields.io/badge/11%20-%20Licença-E91E63)](#licenca) |
| [![4. Funções](https://img.shields.io/badge/4%20-%20Funções-9C27B0)](#funcionalidades) | [![8. Contribuir](https://img.shields.io/badge/8%20-%20Contribuir-3F51B5)](#como-contribuir) | [![12. Perfil](https://img.shields.io/badge/12%20-%20Perfil-212121)](#perfil-do-github) |

---

<h2 id="sobre-o-projeto">1. 🎯 Sobre o Projeto</h2>

**DomisDev Portfólio** é uma SPA (Single Page Application) que funciona como vitrine técnica dos meus projetos e habilidades em desenvolvimento Front-end. Construída inteiramente com **Angular 20** e arquitetura **Standalone Components** — sem `NgModules` —, o que resulta em um bundle menor, mais limpo e com melhor suporte a *Lazy Loading*.

O design combina **SCSS modular** com princípios de Design Atômico e uma paleta baseada em Material Design, entregue via CDN global do **Firebase Hosting** com SSL automático.

> 🎓 **Objetivo do projeto:** servir como laboratório prático de boas práticas de arquitetura Front-end, acessibilidade e SEO técnico, além de ser meu cartão de visita profissional.

---

<h2 id="tecnologias-utilizadas">2. ⚙️ Tecnologias Utilizadas</h2>

| Camada | Tecnologias | Descrição |
| :--- | :--- | :--- |
| **Core** | ![Angular](https://img.shields.io/badge/Angular-DD0031?style=flat-square&logo=angular&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) | Framework principal com arquitetura Standalone. |
| **Estilo** | ![Sass](https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=sass&logoColor=white) | Pré-processador com variáveis, mixins e Design Atômico. |
| **Backend/Host** | ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black) | Hospedagem via CDN, Functions e Analytics. |
| **CI/CD** | ![Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=github-actions&logoColor=white) | Build e deploy contínuos na branch `main`. |
| **Qualidade** | ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=black) ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white) | Padronização de código e linting. |

---

<h2 id="como-acessar">3. 🚀 Como Acessar</h2>

<h3 id="acessar-online">3.1 🌐 Acessar Online</h3>

Entre no portfólio clicando no botão abaixo:

<div align="left">
  <a href="https://portfolio-23948217-d156e.firebaseapp.com/" target="_blank">
    <img alt="Botão Acessar" src="src/assets/images/botão.webp" height="70" width="70" />
  </a>
</div>

---

<h3 id="rodar-localmente">3.2 🖥️ Rodar Localmente</h3>

<h4 id="pre-requisitos">3.2.1 Pré-requisitos</h4>

- **Node.js** 20+ ([download](https://nodejs.org/))
- **Angular CLI** 20+ — `npm install -g @angular/cli`
- **Firebase CLI** (opcional, para deploy) — `npm install -g firebase-tools`

<h4 id="passo-a-passo">3.2.2 Passo a passo</h4>

```bash
# 1. Clone o repositório
git clone --depth 1 https://github.com/Domisnnet/Portfolio-Angular.git

# 2. Entre na pasta
cd Portfolio-Angular

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
ng serve

# 5. Acesse no navegador
# http://localhost:4200
```

O servidor recarrega automaticamente a cada alteração nos arquivos-fonte.

---

<h2 id="funcionalidades">4. 🧩 Funcionalidades Principais</h2>

| Funcionalidade | Descrição |
| :--- | :--- |
| 🛡️ **Standalone Components** | Arquitetura moderna sem NgModules, reduzindo o bundle size e complexidade. |
| 💊 **Stack Pills System** | Componente reutilizável para exibição dinâmica de tecnologias com ícones. |
| 📱 **Adaptive Design** | Layout Hero que transiciona de horizontal **(PC)** para vertical **(Mobile)** automaticamente. |
| ⚡ **Firebase Hosting** | Entrega ultra-rápida via CDN global com certificado SSL e cache inteligente. |
| 🎨 **Material Palette** | Identidade visual baseada em princípios de design atômico e cores Material. |
| ♿ **Acessibilidade - a11y** | Navegação por teclado, contraste AA e HTML semântico. |

---

<h2 id="destaques-tecnicos">5. 💻 Destaques Técnicos</h2>

<h3 id="componente-stack-pill">5.1 📐 O Componente <code>stack-pill</code></h3>

Sistema de "pills" altamente customizável, recebendo propriedades dinâmicas (ícone, label, categoria) e aplicando cores condicionais via mixins do SCSS. O mapeamento de cores fica centralizado em um arquivo de variáveis, mantendo o código DRY e a manutenção simplificada.

<h3 id="cicd-firebase-studio">5.2 🔄 CI/CD com GitHub Actions</h3>

Cada `push` na branch principal dispara automaticamente a instalação das dependências, o build de produção (`ng build`) e o deploy para o **Firebase Hosting**, garantindo que o site esteja sempre atualizado sem intervenção manual.

<h3 id="seo-tecnico">5.3 🔎 SEO Técnico em SPA</h3>

Aplicação de meta tags estruturadas (Open Graph, Twitter Cards), HTML semântico e hierarquia correta de headings. A migração futura para **Angular Universal (SSR)** está prevista no roadmap para indexação ainda mais robusta.

<h3 id="estrutura-do-projeto">5.4 📁 Estrutura do Projeto</h3>

<h4 id="arvore-de-pastas">5.4.1 Árvore de pastas</h4>

```
Portfolio-Angular/
├── src/
│   ├── app/
│   │   ├── components/        # Componentes reutilizáveis (stack-pill, etc.)
│   │   ├── pages/             # Páginas/seções da aplicação
│   │   ├── shared/            # Serviços, pipes, diretivas e utils
│   │   ├── app.component.ts   # Componente raiz
│   │   └── app.config.ts      # Configuração global (providers)
│   ├── assets/
│   │   └── images/            # Imagens e ícones
│   ├── styles/                # SCSS global, variáveis e mixins
│   └── index.html             # Shell HTML com meta tags SEO
├── firebase.json              # Configuração do Firebase Hosting
├── angular.json                # Configuração do Angular CLI
└── package.json                # Dependências e scripts
```

---

<h2 id="fluxo-de-deploy">6. 📦 Fluxo de Deploy</h2>

O deploy é automatizado via **GitHub Actions** a cada push na branch principal. Para publicar manualmente uma nova versão:

```bash
ng build --configuration production
firebase deploy --only hosting
```

> 💡 **Dica:** o comando `firebase deploy` completo também publica Functions e Firestore Rules, se configurados.

---

<h2 id="roadmap">7. 🗺️ Roadmap</h2>

- [x] Angular 20 com Standalone Components
- [x] Design responsivo com SCSS modular
- [x] CI/CD com GitHub Actions
- [x] Deploy automatizado no Firebase Hosting
- [x] Acessibilidade (a11y) básica
- [ ] Migração para **Angular Universal (SSR)**
- [ ] **PWA** com Service Workers e modo offline
- [ ] Internacionalização (**i18n**: PT-BR / EN-US)
- [ ] Testes unitários (Jasmine/Karma) e E2E (Playwright)
- [ ] Modo escuro/claro com persistência

---

<h2 id="como-contribuir">8. 🤝 Como Contribuir</h2>

Siga os passos abaixo para fortalecer este projeto e sugerir melhorias:

| Fase | Ação | Link / Comando |
| :---: | :--- | :--- |
| **01** | **Fork** | [![Fork](https://img.shields.io/badge/-Fazer%20Fork-blue?style=flat-square&logo=github)](https://github.com/Domisnnet/Portfolio-Angular/fork) |
| **02** | **Branch** | `git checkout -b feature/MinhaMelhoria` |
| **03** | **Commit** | `git commit -m 'feat: add nova seção de projetos'` |
| **04** | **Push** | `git push origin feature/MinhaMelhoria` |
| **05** | **PR** | [![Abrir PR](https://img.shields.io/badge/-Abrir%20PR-green?style=flat-square&logo=git)](https://github.com/Domisnnet/Portfolio-Angular/compare) |

<h3 id="encontrou-problema">8.1 🐛 Encontrou um problema?</h3>

Se algo não estiver funcionando como esperado, não hesite em abrir um chamado:

[![Issues Abertas](https://img.shields.io/github/issues/Domisnnet/Portfolio-Angular?style=flat-square&color=red&logo=github)](https://github.com/Domisnnet/Portfolio-Angular/issues)
[![Report Bug](https://img.shields.io/badge/Reportar-Erro-critical?style=flat-square&logo=github)](https://github.com/Domisnnet/Portfolio-Angular/issues/new)

---

<h2 id="faq">9. 🧠 Perguntas Frequentes</h2>

<details>
<summary><strong>Por que Angular Standalone em vez de NgModules ❓</strong></summary>
<p>🚀 <strong>Resposta:</strong> A arquitetura Standalone elimina a necessidade de declarar componentes em módulos. Isso torna o código mais limpo, facilita o <em>Lazy Loading</em> e reduz o tamanho final do bundle.</p>
</details>

<details>
<summary><strong>Como foi tratada a performance do Portfólio ❓</strong></summary>
<p>⚡ <strong>Resposta:</strong> Além do Standalone, apliquei otimizações de imagem e minificação de <strong>SCSS</strong>, utilizando a CDN global do <strong>Firebase Hosting</strong> para atingir pontuações altas no <em>Lighthouse</em>.</p>
</details>

<details>
<summary><strong>O projeto é amigável para SEO ❓</strong></summary>
<p>🔍 <strong>Resposta:</strong> Parcialmente. Como SPA, o SEO é limitado por natureza, mas apliquei HTML semântico e meta tags estruturadas. A migração para Angular Universal (SSR) está no roadmap para SEO completo.</p>
</details>

<details>
<summary><strong>Por que utilizar SCSS ao invés de CSS puro ❓</strong></summary>
<p>🎨 <strong>Resposta:</strong> O SCSS permite variáveis e mixins. No componente <code>stack-pill</code>, usei mixins para gerar cores automaticamente com base em mapas, mantendo a consistência visual.</p>
</details>

<details>
<summary><strong>Posso utilizar este código em meu Portfólio e/ou Projeto pessoal ❓</strong></summary>
<p>🤝 <strong>Resposta:</strong> Com certeza. O projeto é <strong>Open Source</strong>. Você pode clonar, estudar a estrutura de pastas e utilizar como base para seus próprios estudos de UI, desde que mantenha a atribuição original conforme a <strong>Licença MIT</strong> e não se esqueça de dar os devidos créditos!!.</p>
</details>

---

<h2 id="créditos">10. 📝 Créditos & Reconhecimentos</h2>

| Atribuição | Responsável / Recurso | Descrição |
| :--- | :--- | :--- |
| **Full-Stack Dev** | **DomisDev** | Design, Arquitetura Angular e Configuração DevOps. |
| **Infraestrutura** | **Google Firebase** | Provedor de Hosting e serviços cloud. |
| **Apoio Técnico** | **Google Gemini** | Apoio na padronização documental e revisão técnica. |

---

<h2 id="licenca">11. 📄 Licença</h2>

Este projeto está sob a [![Licença MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/Domisnnet/Portfolio-Angular/blob/main/LICENSE)

---

<h2 id="perfil-do-github">12. 👨‍💻 Perfil do GitHub</h2>

**DomisDev** — Desenvolvedor Front-end

<a href="https://github.com/Domisnnet"> 
  <img src="src/assets/images/DomisDev.png" width="90" style="border-radius: 50%" alt="DomisDev GitHub"> 
</a>

&nbsp;
<p align="center">
  <a href="#topo">
    <img src="https://img.shields.io/badge/⬆️%20VOLTAR%20AO%20TOPO-26FF00?style=flat&labelColor=111827&color=0A0F1C" alt="Voltar ao topo" style="height: 30px;">
  </a>
</p>
