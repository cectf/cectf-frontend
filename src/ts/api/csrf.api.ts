import api from "api/api";

const getCsrf = async function() {
  return api.get("/api/csrf");
};

export default { getCsrf };
