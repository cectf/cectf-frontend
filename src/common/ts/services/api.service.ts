export const get = async function(url: string): Promise<any> {
  return fetch(url, {
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
      alert("Failed to get " + url);
    }
    return response.json();
  });
};

export const post = async function(url: string, body: any): Promise<any> {
  return fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: {
      Accept: "application/json",
      Authorization: "JWT " + localStorage.getItem("token"),
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }).then(async response => {
    if (!response.ok) {
      alert("Failed to post " + url);
    }
    return response.json();
  });
};
