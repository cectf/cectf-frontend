
import { createStore } from 'redux';
import reduxApp from '@cectf/state/reducers';

export const store = createStore(reduxApp);
export * from '@cectf/state/actions';