import auth from "@cectf/api/auth.api";
import challenges from "@cectf/api/challenges.api";
import challengesAdmin from "@cectf/api/challengesAdmin.api";
import challengeFiles from "@cectf/api/challengeFiles.api";
import config from "@cectf/api/config.api";
import csrf from "@cectf/api/csrf.api";
import reset from "@cectf/api/reset.api";
import user from "@cectf/api/user.api";

/**
 * Defines the API layer of the application.
 * The API layer queries the REST API of the server.
 * The API layer should only be used by the service layer.
 */

export default {
  auth,
  challenges,
  challengesAdmin,
  challengeFiles,
  config,
  csrf,
  reset,
  user
};
