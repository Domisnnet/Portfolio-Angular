# Project Blueprint

## Overview

Este projeto é um portfólio pessoal moderno desenvolvido com Angular, utilizando as práticas mais recentes, como componentes standalone, signals para gerenciamento de estado e a nova sintaxe de controle de fluxo. O objetivo é criar uma experiência de usuário visualmente impressionante, interativa e totalmente responsiva, com um tema dinâmico de claro/escuro.

## Estilo e Design

- **Tema Dual (Claro/Escuro):** O aplicativo possui um sistema de temas robusto, permitindo que os usuários alternem entre um modo claro e um modo escuro. O tema padrão é o escuro.
- **Fundo Cósmico:** Um fundo animado com estrelas cintilantes, renderizado em um canvas HTML, está presente em toda a aplicação. A animação é performática, responsiva e se adapta à mudança de tema.
- **Design Moderno:** A interface utiliza um design limpo e moderno, com tipografia clara, espaçamento generoso e um layout equilibrado.
- **Ícones:** São utilizados ícones SVG para elementos interativos, como o seletor de tema e links sociais.

## Funcionalidades Implementadas

- **Estrutura do Projeto:**
  - O projeto foi inicializado e padronizado para seguir as melhores práticas do Angular moderno, com uma arquitetura 100% baseada em componentes standalone.
  - `ChangeDetectionStrategy.OnPush` é aplicado a todos os componentes para otimizar a performance.

- **Layout Principal (`CosmicLayoutComponent`):
  - Um layout principal foi criado para encapsular o cabeçalho, o conteúdo da página e o rodapé, garantindo uma estrutura consistente.
  - Integra o `CosmicStarsComponent` como um fundo fixo e animado.

- **Cabeçalho (`MainHeaderComponent`):
  - Contém o logotipo da aplicação.
  - Apresenta a navegação principal (Home, Projetos, Contato).
  - Inclui o componente de troca de tema (`ThemeTogglerComponent`).
  - Adiciona botões para perfis externos (LinkedIn, GitHub).

- **Página Inicial (`HomePageComponent`):
  - Exibe a seção "Hero" com o título principal, avatar e subtítulos.
  - Contém botões de CTA (Call to Action) para "Baixar CV" e "GitHub".

- **Animação de Fundo (`CosmicStarsComponent`):
  - Gera um céu estrelado dinâmico usando HTML Canvas.
  - As estrelas possuem um efeito de cintilação (mudança de opacidade) para criar uma atmosfera viva.
  - A animação é leve e projetada para não impactar a performance.
  - O fundo é fixo e cobre toda a extensão da página, mesmo durante a rolagem.
  - As cores das estrelas e do fundo gradiente são controladas por variáveis CSS, integrando-se perfeitamente ao sistema de temas.

## Próximos Passos

A fase atual de implementação do layout principal e do fundo animado está concluída. As próximas fases se concentrarão na construção das seções e páginas restantes do portfólio, como "Projetos", "Sobre" e "Contato".
