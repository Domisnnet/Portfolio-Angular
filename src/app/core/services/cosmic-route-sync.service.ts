import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CosmicEffectsService } from '@app/cosmic/state/cosmic-effects.service';

@Injectable({ providedIn: 'root' })
export class CosmicRouteSyncService {
  constructor( router: Router, cosmic: CosmicEffectsService ) {
    router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => { 
        const route = router.routerState.root.firstChild; 
        const mode = route?.snapshot.data['cosmic']; if (mode) { cosmic.set(mode); } 
      }
    );
  }
}