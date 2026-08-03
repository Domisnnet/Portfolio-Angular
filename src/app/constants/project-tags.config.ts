/* =========================
  CATEGORIES
========================= */
export type PillCategory = 'frontend' | 'backend' | 'databases' | 'devops' | 'cms';

/* =========================
  STACK PILL MODEL
========================= */
export interface StackPillData {
  readonly label: string;
  readonly iconPath: string;
  readonly category: PillCategory;
}

/* =========================
  INTERNAL FACTORY
========================= */
const pill = (label: string, icon: string, category: PillCategory): StackPillData => ({
  label,
  iconPath: `assets/icons/${icon}.svg`,
  category,
});

/* =========================
  STACK CONFIG
========================= */
export const STACK_CONFIG = {
  /* FRONTEND */
  html5: pill('HTML5', 'html5', 'frontend'),
  css3: pill('CSS3', 'css3', 'frontend'),
  sass: pill('Sass', 'sass', 'frontend'),
  scss: pill('SCSS', 'scss', 'frontend'),
  javascript: pill('JavaScript', 'javascript', 'frontend'),
  angular: pill('Angular', 'angular', 'frontend'),
  react: pill('React', 'react', 'frontend'),
  vue: pill('Vue.js', 'vue-js', 'frontend'),
  bootstrap: pill('Bootstrap', 'bootstrap', 'frontend'),
  tailwind: pill('Tailwind', 'tailwind', 'frontend'),
  spa: pill('SPA', 'spa', 'frontend'),
  svg: pill('SVG', 'svg', 'frontend'),
  motions: pill('Motions', 'motions', 'frontend'),
  cssAnimations: pill('CSS Animations', 'css-animations', 'frontend'),

  /* BACKEND */
  node: pill('Node.js', 'node-js', 'backend'),
  express: pill('Express', 'express', 'backend'),
  python: pill('Python', 'python', 'backend'),
  api: pill('API', 'api', 'backend'),
  firebase: pill('Firebase', 'firebase', 'backend'),
  architecture: pill('Architecture', 'architecture', 'backend'),
  gameLogic: pill('Game Logic', 'game-logic', 'backend'),

  /* DATABASES */
  mongodb: pill('MongoDB', 'mongodb', 'databases'),
  mysql: pill('MySQL', 'mysql', 'databases'),

  /* DEVOPS */
  github: pill('GitHub', 'github', 'devops'),
  npm: pill('NPM', 'npm', 'devops'),
  vercel: pill('Vercel', 'vercel', 'devops'),
  vscode: pill('VSCode', 'vscode', 'devops'),
  automation: pill('Automation', 'automation', 'devops'),

  /* CMS */
  wordpress: pill('WordPress', 'wordpress', 'cms'),
  spamoderna: pill('SPA Moderna', 'spa-moderna', 'cms'),
  apiserverless: pill('API Serverless (Node.Js + Firebase Functions)', 'api-serverless', 'cms'),

  /* CONCEITUAL */
  design: pill('Design', 'design', 'frontend'),
  ui: pill('UI', 'ui', 'frontend'),
  ux: pill('UX', 'ux', 'frontend'),
  product: pill('Product', 'product', 'frontend'),
} as const;

/* =========================
  TAG KEYS
========================= */
export type TagKey = keyof typeof STACK_CONFIG;
