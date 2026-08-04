import { CosmicRegion } from '@app/cosmic/models/cosmic-region.model';
import { CosmicStatus } from '@app/cosmic/enums/cosmic-status.enum';

export const COSMIC_REGIONS: Record<string, CosmicRegion> = {
  featured: {
    id: 'featured',
    name: 'FEATURED SECTOR',
    distance: '0.3 AU',
    projects: 8,
    totalProjects: 40,
    signal: 100,
    energy: 98,
    status: CosmicStatus.Online,
    scanMessage: 'SCANNING_FEATURED_SECTOR',
    diagnostic: 'ALL_SYSTEMS_NOMINAL'
  },
  deepSpace: {
    id: 'deep-space',
    name: 'DEEP SPACE',
    distance: '18 AU',
    projects: 16,
    totalProjects: 40,
    signal: 82,
    energy: 84,
    status: CosmicStatus.Exploring,
    scanMessage: 'SCANNING_DEEP_SPACE',
    diagnostic: 'LONG_RANGE_SCAN_ACTIVE'
  },
  stableOrbit: {
    id: 'stable-orbit',
    name: 'STABLE ORBIT',
    distance: '46 AU',
    projects: 24,
    totalProjects: 40,
    signal: 58,
    energy: 61,
    status: CosmicStatus.Stable,
    scanMessage: 'SCANNING_STABLE_ORBIT',
    'diagnostic': 'NAVIGATION_LOCK_ACQUIRED'
  },
  unstableOrbit: {
    id: 'unstable-orbit',
    name: 'UNSTABLE ORBIT',
    distance: '131 AU',
    projects: 32,
    totalProjects: 40,
    signal: 27,
    energy: 33,
    status: CosmicStatus.Unstable,
    scanMessage: 'SCANNING_UNSTABLE_ORBIT',
    diagnostic: 'SIGNAL_INTERFERENCE_DETECTED'
  }
};