export const get = async function(url: string): Promise<Response> {
  return fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: {
      Accept: "application/json",
      Authorization: "JWT " + localStorage.getItem("token")
    }
  });
};

export const post = async function(url: string, body: any): Promise<Response> {
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
  });
};
