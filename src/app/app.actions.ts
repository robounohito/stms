import { createAction, props } from '@ngrx/store';
import { Entity, Favorite } from './app.reducer';
import { Provider } from './app.reducer';

export const load = createAction(
  '[Provider] Load'
);

export const postsLoad = createAction(
  '[Provider] Posts Load'
);

export const loadSuccess = createAction(
  '[Provider] Load Success',
  props<{ provider: Provider, entities: Entity[], headers: string[], fields: string[] }>()
);

export const entityCheck = createAction(
  '[Provider] Post Check',
  props<{ entity: Entity }>()
);

export const employeesLoad = createAction(
  '[Provider] Employees Load',
);

export const saveComment = createAction(
  '[Favorite] Save Comment',
  props<{ favorite: Favorite }>()
);
