import api from "@cectf/api/api";
import { Config } from "@cectf/types";

async function getConfig(): Promise<Config> {
  return api
    .get("/api/config/config.json")
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw "Failed to get configuration";
      }
    });
}


export default { getConfig };
