
import { createStore } from 'redux';
import reduxApp from 'state/reducers';

export const store = createStore(reduxApp);
export * from 'state/actions';