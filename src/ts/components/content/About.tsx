import * as React from "react";

interface AboutProps { }
interface AboutState { }

export default class About extends React.Component<AboutProps, AboutState> {
  constructor(props: AboutProps) {
    super(props);
  }
  render() {
    return <div>
      <p>
        Welcome to <b>Chiquito's Ersatz Capture The Flag</b>!
      </p>
      <p>
        While participating in other CTFs, I have come up with ideas for my own challenges that I thought were pretty cool.
        This website is where I keep the better ideas.
      </p>
      <p>
        Sadly, I am still working on infrastructure for hosting challenge servers, so for now challenges are limited to what can be described in a set of files.
      </p>
      <p>
        This project is also an excuse for me to work on my web development skills.
        It's all open source, so if you are interested in the development process you can check out these resources:
      </p>
      <li>
        <ul>
          Github: <a href="https://github.com/cectf">https://github.com/cectf</a>
        </ul>
        <ul>
          Travis CI: <a href="https://travis-ci.com/cectf">https://travis-ci.com/cectf</a>
        </ul>
        <ul>
          Development wiki: Coming soon!
          </ul>
      </li>
    </div>;
  }
}
