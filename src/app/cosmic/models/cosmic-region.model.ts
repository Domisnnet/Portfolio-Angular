import { CosmicStatus } from '@app/cosmic/enums/cosmic-status.enum';

export interface CosmicRegion {
  id: string;
  name: string;
  distance: string;
  diagnostic?: string;
  projects: number;
  totalProjects: number;
  signal: number;
  energy: number;
  status: CosmicStatus;
  scanMessage: string;
}