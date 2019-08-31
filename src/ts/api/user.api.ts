import api from "api/api";
import { User } from "types";

const getCurrentUser = async function(): Promise<User> {
  return api.get("/api/user").then(async response => {
    if (!response.ok) {
      alert("Failed to get current user");
    }
    return response.json();
  });
};

export default {
  getCurrentUser
};
