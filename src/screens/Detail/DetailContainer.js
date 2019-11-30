import React, { Component } from "react";
import DetailView from "./DetailView";
import { goBack, getParamData } from "../../utils";
import { observer } from "mobx-react";
import { observable } from "mobx";

@observer
export default class DetailScreen extends Component {
  constructor(props) {
    super(props);
    this.dataParams = null;
    this.conversationText = "";
  }

  componentWillMount() {
    // lay ra sign va info cua item duoc pass sang
    this.dataParams = getParamData(this.props.navigation);
  }

  _callBack = (key, data) => {
    switch (key) {
      case "GO_BACK":
        goBack(this.props.navigation);
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <DetailView
        {...this.props}
        dataParams={this.dataParams}
        callBack={this._callBack}
      />
    );
  }
}
