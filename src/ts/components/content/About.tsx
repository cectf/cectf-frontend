import * as React from "react";
import { connect } from "react-redux";
import { State, Config } from "@cectf/types";
import services from "@cectf/services";

interface AboutProps {
  config: Config;
}
interface AboutState { }

class AboutComponent extends React.Component<AboutProps, AboutState> {
  constructor(props: AboutProps) {
    super(props);
  }

  reset = () => {
    services.reset.resetDatabase();
  }

  render() {

    var stagingCopy = null;
    if (!this.props.config.production) {
      stagingCopy = <div>
        <p>
          <b>UNDER CONSTRUCTION</b>
        </p>
        <p>
          This is the staging environment for CECTF.
          It is a fully functional deployment, but because it is only for testing, it is also highly unstable.
        </p>
        <p>
          <b>!!! Any data created here IS EXPENDABLE and WILL be deleted by daily test automation. !!!</b>
        </p>
        <p>
          With that said, you can log in to the app with these credentials:
        </p>
        <table style={{ marginLeft: "auto", marginRight: "auto" }}>
          <tbody>
            <tr>
              <th>Username</th>
              <th>Password</th>
            </tr>
            <tr>
              <td>contestant</td>
              <td>contestant</td>
            </tr>
            <tr>
              <td>admin</td>
              <td>admin</td>
            </tr>
          </tbody>
        </table>
        <p>
          Click this button to reset the database:
        </p>
        <p>
          <button onClick={this.reset}>Reset Database</button>
        </p>
        <p>
          <b>WARNING: THIS WILL WIPE EVERYTHING IN THE STAGING ENVIRONMENT AND REVERT TO A KNOWN STATE</b>
        </p>
        <p>
          Please visit <a href="https://ctf.chiquito.us">ctf.chiquito.us</a> for the genuine CTF experience!
          And as always, feel free to report any bugs/thoughts/concerns to daniel.chiquito@gmail.com.
        </p>
        <hr />
      </div>
    }

    return <div>
      {stagingCopy}
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
      <p>
        You can also visit <a href="https://ctf-staging.chiquito.us">ctf-staging.chiquito.us</a>, the public test environment!
        ctf-staging is a completely independent deployment of the application, but with volatile, expendable dummy data.
        Feel free to visit and poke around!
      </p>
    </div>;
  }
}


const mapStateToProps = (state: State, ownProps: any): AboutProps => {
  return { config: state.config };
}

const About = connect(mapStateToProps)(AboutComponent);
export default About;