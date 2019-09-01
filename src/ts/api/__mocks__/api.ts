import { Challenge, SubmissionStatus } from "types";

var challenge: Challenge = {
  id: 1,
  title: "First",
  category: "crypto",
  body: "Do it",
  hint: "hint",
  solution: "CTF{flag}",
  hinted: false,
  solved: true
};

const get = async function(url: string): Promise<Response> {
  return new Promise<Response>((resolve, reject) => {
    if (url == "/api/challenge") {
      console.log("Mocking GET /api/challenge");
      resolve(new Response(JSON.stringify([challenge])));
    } else {
      resolve(new Response(null, { status: 404 }));
    }
  });
};

const post = async function(url: string, body: any): Promise<Response> {
  return new Promise<Response>((resolve, reject) => {
    if (url == "/api/challenge/1") {
      console.log("Mocking POST /api/challenge/1");
      resolve(
        new Response(
          JSON.stringify({
            status: SubmissionStatus.CORRECT,
            challenge: challenge
          })
        )
      );
    } else {
      resolve(new Response(null, { status: 404 }));
    }
  });
};

export { get, post };
