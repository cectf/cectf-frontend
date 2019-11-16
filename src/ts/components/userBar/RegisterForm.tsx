import * as React from "react";
import { connect } from "react-redux";
import service from "@cectf/services";
import Modal from "@cectf/components/Modal";
import Popups from "@cectf/components/popups/Popups";
import { State, ModalID } from "@cectf/types";
import * as styles from "@styles/userBar/register.scss";
import * as modalStyles from "@styles/modal/register.scss";
import { store, openModal } from "@cectf/state";

interface RegisterProps {
  loading: boolean;
}
interface RegisterState {
  email: string;
  username: string;
  password: string;
}

class RegisterFormComponent extends React.Component<
  RegisterProps,
  RegisterState
  > {
  constructor(props: RegisterProps) {
    super(props);

    this.state = {
      email: "",
      username: "",
      password: ""
    };
  }
  onClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    store.dispatch(openModal(ModalID.REGISTER));
  }

  onChange_email = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: event.target.value });
  }
  onChange_username = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: event.target.value });
  }
  onChange_password = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.target.value });
  }
  onSubmit = (event: React.FormEvent) => {
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
      <div key="register"
        id="register"
        className={styles.register}>
        <button id="register__link"
          onClick={this.onClick}>
          Sign up!
        </button>
      </div>,
      <Modal key="modal"
        id={ModalID.REGISTER}
        index={undefined}
        className={modalStyles.registerModal}>
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
            <button id="register-modal__submit"
              type="submit"
              disabled={this.props.loading}>
              Submit
            </button>
          </form>
        </div>
        <Popups />
      </Modal>
    ];
  }
}

const mapStateToProps = (state: State): { loading: boolean } => {
  return { loading: state.activeRequests.includes("/api/auth/register") };
}

const RegisterForm = connect(
  mapStateToProps)
  (RegisterFormComponent);
export default RegisterForm;