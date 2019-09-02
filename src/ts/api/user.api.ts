import api from "api/api";
import { User } from "types";

const getCurrentUser = async function(): Promise<User | null> {
  return api.get("/api/user").then(async response => {
    if (response.status != 200) {
      return null;
    }
    return response.json();
  });
};

export default {
  getCurrentUser
};
