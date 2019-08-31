import * as React from "react";
import * as ReactModal from "react-modal";

interface ModalProps {}
interface ModalState {
  isOpen: boolean;
}

export default class Modal extends React.Component<ModalProps, ModalState> {
  constructor(props: ModalProps, state: ModalState) {
    super(props, state);
    ReactModal.setAppElement("#appRoot");

    this.close = this.close.bind(this);
    this.state = { isOpen: true };
  }
  close() {
    this.setState({ isOpen: false });
  }
  render() {
    return (
      <ReactModal isOpen={this.state.isOpen} onRequestClose={this.close}>
        {this.props.children}
      </ReactModal>
    );
  }
}
