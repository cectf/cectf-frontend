import api from "@cectf/api/api";

/**
 * Performs a database reset.
 * This operation will only succeed if the server is currently running in test mode.
 */
const resetDatabase = async function () {
  return api.get("/api/test/reset").then(() => { });
};

export default { resetDatabase };
