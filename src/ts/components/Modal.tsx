import * as React from "react";
import * as ReactModal from "react-modal";
import { connect } from "react-redux";
import { store, closeModal } from "@cectf/state";
import { State, ModalID } from "@cectf/types";

interface ModalProps {
  id: ModalID;
  index: number | string | undefined;
  isOpen: boolean;
  className?: string;
  children: React.ReactNode | React.ReactNode[];
}
interface ModalState { }

class ModalComponent extends React.Component<ModalProps, ModalState> {
  constructor(props: ModalProps, state: ModalState) {
    super(props, state);
  }
  close = () => {
    store.dispatch(closeModal())
  }
  render() {
    return (
      <ReactModal
        className={this.props.className}
        isOpen={this.props.isOpen}
        onRequestClose={this.close}
      >
        {this.props.children}
        <div>
          <button id="modal-close" onClick={this.close}>Close</button>
        </div>
      </ReactModal>
    );
  }
}

const mapStateToProps = (state: State, ownProps: { id: ModalID, index: number | string | undefined }): { isOpen: boolean } => {
  if (state.modal !== null) {
    if (ownProps.index === undefined) {
      console.log("nondex ", state.modal.id, ownProps.id, ownProps);
      return { isOpen: state.modal.id === ownProps.id };
    }
    console.log("dexd ", state.modal.id, ownProps.id, state.modal.index, ownProps.index);
    return { isOpen: state.modal.id === ownProps.id && state.modal.index === ownProps.index };
  }
  console.log("nopne", ownProps);
  return { isOpen: false };
}

const Modal = connect(mapStateToProps)(ModalComponent);
export default Modal;