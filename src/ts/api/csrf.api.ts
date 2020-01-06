import api from "@cectf/api/api";

/**
 * Gets a CSRF token from the server
 */
const getCsrf = async function (): Promise<string> {
  return api.get("/api/auth/csrf")
    .then(response => response.json())
    .then(json => json.csrf_token);
};

export default { getCsrf };
