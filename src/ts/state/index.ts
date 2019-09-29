import ChallengesStateManager from "state/challenges.state";
import CsrfStateManager from "state/csrf.state";
import NavStateManager from "state/nav.state";
import UserStateManager from "state/user.state";
import { AdminChallengesStateManager } from "state/admin.state";

export default {
  challenges: new ChallengesStateManager(),
  csrf: new CsrfStateManager(),
  nav: new NavStateManager(),
  user: new UserStateManager(),
  admin: {
    challenges: new AdminChallengesStateManager()
  }
};

import { createStore } from 'redux';
import reduxApp from 'state/reducers';

export const store = createStore(reduxApp);
