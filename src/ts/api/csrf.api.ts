import api from "@cectf/api/api";

const getCsrf = async function () {
  return api.get("/api/auth/csrf")
    .then(response => response.json())
    .then(json => json.csrf_token);
};

export default { getCsrf };
