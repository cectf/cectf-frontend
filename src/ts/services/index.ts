import auth from "@cectf/services/auth.service";
import challenges from "@cectf/services/challenges.service";
import challengesAdmin from "@cectf/services/challengesAdmin.service";
import challengeFiles from "@cectf/services/challengeFiles.service";
import config from "@cectf/services/config.service";
import csrf from "@cectf/services/csrf.service";
import popup from "@cectf/services/popup.service";
import reset from "@cectf/services/reset.service";
import user from "@cectf/services/user.service";

export default { auth, challenges, challengesAdmin, challengeFiles, config, csrf, popup, reset, user };
