import { Action, createReducer, on } from '@ngrx/store';
import { postsLoad, loadSuccess, entityCheck, saveComment, employeesLoad, load, } from './app.actions';

export enum Provider {
  posts = 'posts',
  employees = 'employees',
}

export interface State {
  loading: boolean;
  currentProvider: Provider;
  entitiesHeaders: string[];
  entities: Entity[];
  favorites: Favorite[];
}

export interface Entity {
  id: number | string;
  columnOne: string;
  columnTwo: string;
  checked: boolean;
}

export interface Favorite {
  id: number;
  columnOne: string;
  columnTwo: string;
  comment: string;
}

export const initialState: State = {
  loading: false,
  currentProvider: Provider.posts,
  entitiesHeaders: [],
  entities: [],
  favorites: [],
};

const stateReducer = createReducer(

  initialState,

  on(load, postsLoad, employeesLoad, state => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(loadSuccess, (state, { provider, entities, headers, fields }) => ({
    ...state,
    currentProvider: provider,
    entitiesHeaders: headers,
    entities: entities.map(p => state.favorites.find(f => f.id === p.id)
      ? { ...p, columnOne: p[fields[0]], columnTwo: p[fields[1]], checked: true }
      : { ...p, columnOne: p[fields[0]], columnTwo: p[fields[1]], checked: false }),
    loading: false,
  })),

  on(entityCheck, (state, { entity }) => {
    const favToDelete = state.favorites.find(f => f.id === entity.id);
    let favorites;
    if (favToDelete) {
      favorites = state.favorites.filter(f => f.id !== favToDelete.id);
    } else {
      favorites = [{
        ...entity,
        columnOne: entity.columnOne,
        columnTwo: entity.columnTwo,
      }, ...state.favorites];
    }
    return {
      ...state,
      posts: state.entities.map(e => e.id === entity.id ? entity : e),
      favorites
    };
  }),

  on(saveComment, (state, { favorite }) => ({
    ...state,
    favorites: state.favorites.map(f => f.id === favorite.id ? favorite : f)
  })),

);

export function reducer(state: State | undefined, action: Action) {
  return stateReducer(state, action);
}
