import ChallengesStateManager from "state/challenges.state";
import CsrfStateManager from "state/csrf.state";
import NavStateManager from "state/nav.state";
import UserStateManager from "state/user.state";

export default {
  challenges: new ChallengesStateManager(),
  csrf: new CsrfStateManager(),
  nav: new NavStateManager(),
  user: new UserStateManager()
};
