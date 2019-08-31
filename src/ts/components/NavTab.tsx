import * as React from "react";
import { NavPage } from "types";
import state from "state";

interface NavTabProps {
  page: NavPage;
}
interface NavTabState {}

export default class NavTab extends React.Component<NavTabProps, NavTabState> {
  constructor(props: NavTabProps) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.getId = this.getId.bind(this);
    this.getText = this.getText.bind(this);
  }

  onClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    state.nav.nextState(this.props.page);
  }

  getId() {
    if (this.props.page == NavPage.ABOUT) {
      return "nav-about";
    }
    if (this.props.page == NavPage.CTF) {
      return "nav-ctf";
    }
    if (this.props.page == NavPage.ADMIN) {
      return "nav-admin";
    }
  }

  getText() {
    if (this.props.page == NavPage.ABOUT) {
      return "About";
    }
    if (this.props.page == NavPage.CTF) {
      return "CTF";
    }
    if (this.props.page == NavPage.ADMIN) {
      return "Admin";
    }
  }

  render() {
    return (
      <div
        className="nav-bar__nav-tab nav-tab"
        id={this.getId()}
        onClick={this.onClick}
      >
        {this.getText()}
      </div>
    );
  }
}
