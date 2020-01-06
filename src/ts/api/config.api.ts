import api from "@cectf/api/api";
import { Config } from "@cectf/types";

/**
 * Gets the current configuration from the server
 */
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
