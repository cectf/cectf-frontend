import * as React from "react";
import { NavPage } from "@cectf/types";

interface NavTabProps {
  page: NavPage;
  isActive: boolean;
  switch: ()=>void;
}
interface NavTabState {}

export default class NavTab extends React.Component<NavTabProps, NavTabState> {

  onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.switch();
  }

  getId = (): string => {
    switch(this.props.page) {
      case NavPage.ABOUT:
        return "nav-about";
      case NavPage.CTF:
        return "nav-ctf";
      case NavPage.ADMIN:
        return "nav-admin";
    }
  }

  getText = (): string => {
    switch(this.props.page) {
      case NavPage.ABOUT:
        return "About";
      case NavPage.CTF:
        return "CTF";
      case NavPage.ADMIN:
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
