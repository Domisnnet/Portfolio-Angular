import { PillCategory } from '@app/constants/project-tags.config';

export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
}
