import { Action } from '@ngrx/store';
import { ActionWithPayload } from '../../shared/action-with-payload';

// STATE

export interface CoreState {
}

const initialState: CoreState = {
};

// ACTIONS

// REDUCER

export function coreReducer(state = initialState, action: ActionWithPayload): CoreState {
	switch (action.type) {
		default:
			return state;
	}
}
