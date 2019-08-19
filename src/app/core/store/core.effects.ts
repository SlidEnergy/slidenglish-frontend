import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { filter, mergeMap, withLatestFrom, switchMap, catchError, tap, map } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';

import { AuthService } from '../auth.service';
import * as coreActions from './core.store';
import { RouterStateSnapshot } from '@angular/router';
import { CoreState } from './core.store';
import { AppState } from './app-state';

// EFFECTS

@Injectable()
export class CoreEffects {
	constructor(
		private actions: Actions,
		private store: Store<AppState>,
		private authService: AuthService,
	) { }
}
