export interface HeaderConfig {
  title: string;
  subtitle?: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  customClass?: string;
}

export const PAGE_HEADERS = {
  home: {
    title: 'Minha Stack Dev',
    subtitle: 'Codificando ideias. Construindo o futuro!',
    description: 'Desenvolvedor web em constante evolução — criativo, curioso e apaixonado por tecnologia.',
    align: 'center'
  },
  projects: {
    title: 'Meus Projetos',
    description: 'Artefatos tecnológicos recuperados.',
    align: 'center'
  },
  deepSpace: {
    title: 'Deep Space',
    description: 'Seja Bem Vindo ao próximo Universo.',
    align: 'center'
  }
} as const satisfies Record<string, HeaderConfig>;