// eslint-disable-next-line import/no-extraneous-dependencies
import { createStore, combineReducers } from 'redux';

import notesReducer from '../features/notes';

const rootReducer = combineReducers({
  notes: notesReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
