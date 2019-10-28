import * as React from "react";
import service from "@cectf/services";
import * as Modal from "react-modal";
import PopupsContainer from "@cectf/components/popups/PopupsContainer";
import * as styles from "@styles/userBar/register.scss";
import * as modalStyles from "@styles/modal/register.scss";

interface RegisterProps { }
interface RegisterState {
  modalOpen: boolean;
  email: string;
  username: string;
  password: string;
}

export default class RegisterForm extends React.Component<
  RegisterProps,
  RegisterState
  > {
  constructor(props: RegisterProps) {
    super(props);

    this.state = {
      modalOpen: false,
      email: "",
      username: "",
      password: ""
    };

    this.onClick = this.onClick.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.onChange_email = this.onChange_email.bind(this);
    this.onChange_username = this.onChange_username.bind(this);
    this.onChange_password = this.onChange_password.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onClick(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ modalOpen: true });
  }
  onModalClose() {
    this.setState({ modalOpen: false });
  }

  onChange_email(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ email: event.target.value });
  }
  onChange_username(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ username: event.target.value });
  }
  onChange_password(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ password: event.target.value });
  }
  onSubmit(event: React.FormEvent) {
    event.preventDefault();
    event.stopPropagation();
    service.auth.register(
      this.state.email,
      this.state.username,
      this.state.password
    );
  }

  render() {
    return [
      <div key={1}
        id="register"
        className={styles.register}>
        <button id="register__link"
          onClick={this.onClick}>
          Sign up!
        </button>
      </div>,
      <Modal key={2}
        className={modalStyles.registerModal}
        isOpen={this.state.modalOpen}
        onRequestClose={this.onModalClose}>
        <div className={modalStyles.registerModalContent}>
          <form onSubmit={this.onSubmit}>
            <table>
              <tbody>
                <tr>
                  <td>Email:</td>
                  <td>
                    <input
                      type="text"
                      id="register-modal__email"
                      name="email"
                      onChange={this.onChange_email}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Username:</td>
                  <td>
                    <input
                      type="text"
                      id="register-modal__username"
                      name="username"
                      onChange={this.onChange_username}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Password:</td>
                  <td>
                    <input
                      type="password"
                      id="register-modal__password"
                      name="password"
                      onChange={this.onChange_password}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              type="submit"
              id="register-modal__submit">
              Submit
            </button>
          </form>
          <button onClick={this.onModalClose}>Close</button>
        </div>
        <PopupsContainer />
      </Modal>
    ];
  }
}
