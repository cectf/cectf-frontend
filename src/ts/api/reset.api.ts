import api from "@cectf/api/api";

const resetDatabase = async function () {
  return api.get("/api/test/reset").then(() => {});
};

export default { resetDatabase };
