import { PillCategory, TagKey } from './project-tags.config';

export const PERSONAL_STACK: Record<PillCategory, readonly TagKey[]> = {
  frontend: ['html5', 'css3', 'sass', 'javascript', 'angular', 'react', 'vue', 'bootstrap', 'tailwind'],
  backend: ['node', 'express', 'python'],
  databases: ['mongodb', 'mysql'],
  devops: ['github', 'vscode', 'vercel', 'npm'],
  cms: ['wordpress', 'spamoderna', 'apiserverless'],
} as const;
