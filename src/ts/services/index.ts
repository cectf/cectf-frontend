import auth from "@cectf/services/auth.service";
import challenges from "@cectf/services/challenges.service";
import challengesAdmin from "@cectf/services/challengesAdmin.service";
import challengeFiles from "@cectf/services/challengeFiles.service";
import config from "@cectf/services/config.service";
import csrf from "@cectf/services/csrf.service";
import popup from "@cectf/services/popup.service";
import reset from "@cectf/services/reset.service";
import user from "@cectf/services/user.service";

/**
 * Defines the service layer of the application.
 * The service layer is the central go-between for all the different areas of the application (API, component, and redux store).
 * The service layer is solely responsible for invoking the API layer and for dispatching actions to the redux store.
 * The component layer should query the service layer to make changes to the application state or to request data.
 * react-redux is used to get the data from the redux store into the components. This is the only connection that the service layer is not involved in.
 */

export default { auth, challenges, challengesAdmin, challengeFiles, config, csrf, popup, reset, user };
