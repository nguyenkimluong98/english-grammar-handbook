import React, { Component } from "react";
import MainView from "./MainView";
import { startActivityForResult, rateApp } from "../../utils";
import { inject, observer } from "mobx-react";
import { DrawerActions } from "react-navigation";
import menuData from "../../assets/data/menu";

@inject("store")
@observer
export default class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.myMenu = menuData;
  }

  componentDidMount() {
    if (!this.props.store.shownRate) {
      rateApp();
      this.props.store.shownRate = true;
    }
  }

  callBack = (key, data) => {
    switch (key) {
      case "GO_TO_LISTWORD_SCREEN":
        if (data.sign == "RATE") {
          rateApp();
        } else if (data.sign == "MORE") {
        } else startActivityForResult(this.props.navigation, "ListWord", data);
        break;
      case "OPEN_MENU":
        this.props.navigation.dispatch(DrawerActions.openDrawer());
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <MainView {...this.props} myMenu={this.myMenu} callBack={this.callBack} />
    );
  }
}
