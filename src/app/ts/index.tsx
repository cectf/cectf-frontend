import * as React from "react";
import * as ReactDOM from "react-dom";

import { Challenges } from "./components/Challenges";

fetch("/api/app/users/1/challenges", {
  method: "GET",
  mode: "cors",
  cache: "no-cache",
  credentials: "include",
  headers: {
    Accept: "application/json",
    Authorization: "JWT " + localStorage.getItem("token")
  }
}).then(async response => {
  if (!response.ok) {
    alert("Failed to load challenges!");
  }
  response.json().then(json => {
    console.log(json);
    ReactDOM.render(
      <Challenges challenges={json} />,
      document.getElementById("challenges")
    );
  });
});
