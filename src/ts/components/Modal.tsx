import * as React from "react";
import * as ReactModal from "react-modal";

interface ModalProps {
  parent: React.Component<{}, { modalOpen: boolean }>;
}
interface ModalState {}

export default class Modal<P, S> extends React.Component<
  ModalProps & P,
  ModalState & S
> {
  constructor(props: ModalProps & P, state: ModalState) {
    super(props, state);

    this.close = this.close.bind(this);
  }
  close() {
    this.props.parent.setState({ modalOpen: false });
  }
  render() {
    return (
      <ReactModal
        isOpen={this.props.parent.state.modalOpen}
        onRequestClose={this.close}
      >
        {this.props.children}
      </ReactModal>
    );
  }
}
