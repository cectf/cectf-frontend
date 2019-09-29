import NavStateManager from "state/nav.state";
import UserStateManager from "state/user.state";
import { AdminChallengesStateManager } from "state/admin.state";

export default {
  nav: new NavStateManager(),
  admin: {
    challenges: new AdminChallengesStateManager()
  }
};

import { createStore } from 'redux';
import reduxApp from 'state/reducers';

export const store = createStore(reduxApp);
