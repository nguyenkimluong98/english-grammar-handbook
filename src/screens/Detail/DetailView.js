import React, { Component } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  ActivityIndicator,
  WebView
} from "react-native";
import styles from "./styles";
import { observer } from "mobx-react";

@observer
export default class DetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversationText: ""
    };
  }

  _returnIdiomlis = () => {
    const { name, desc, example } = this.props.dataParams.properties;
    return (
      <ScrollView style={{ padding: 10, flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15
          }}
        >
          <View style={{ width: 100 }}>
            <Text style={styles.title}>Name: </Text>
          </View>
          <Text style={styles.detail}>{name}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15
          }}
        >
          <View style={{ width: 100 }}>
            <Text style={styles.title}>Description: </Text>
          </View>
          <Text style={styles.detail}>{desc}</Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ width: 100 }}>
            <Text style={styles.title}>Example: </Text>
          </View>
          <Text style={styles.detail}>{example}</Text>
        </View>
      </ScrollView>
    );
  };

  _returnIverbs = () => {
    const {
      BaseForm,
      PastSimple,
      PastPart,
      Person3rd,
      Gerund,
      Definition
    } = this.props.dataParams.properties;
    return (
      <ScrollView style={{ padding: 10, flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15
          }}
        >
          <View style={{ width: 100 }}>
            <Text style={styles.title}> BaseForm: </Text>
          </View>
          <Text style={styles.detail}>{BaseForm}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15
          }}
        >
          <View style={{ width: 100 }}>
            <Text style={styles.title}>PastSimple: </Text>
          </View>
          <Text style={styles.detail}>{PastSimple}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15
          }}
        >
          <View style={{ width: 100 }}>
            <Text style={styles.title}>PastPart: </Text>
          </View>
          <Text style={styles.detail}>{PastPart}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15
          }}
        >
          <View style={{ width: 100 }}>
            <Text style={styles.title}>Person3rd: </Text>
          </View>
          <Text style={styles.detail}>{Person3rd}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15
          }}
        >
          <View style={{ width: 100 }}>
            <Text style={styles.title}>Gerund: </Text>
          </View>
          <Text style={styles.detail}>{Gerund}</Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ width: 100 }}>
            <Text style={styles.title}>Definition: </Text>
          </View>
          <Text style={styles.detail}>{Definition}</Text>
        </View>
      </ScrollView>
    );
  };

  _returnTopics = () => {
    if (this.props.dataParams.properties.FileID == null) return null;
    return (
      <WebView
        style={{ padding: 10, flex: 1 }}
        source={this.props.dataParams.properties.FileID}
        scalesPageToFit
      />
    );
  };

  _returnView = () => {
    switch (this.props.dataParams.sign) {
      case "FTOP":
      case "TOP":
        return this._returnTopics();
      case "FIdi":
      case "Idi":
        return this._returnIdiomlis();
      case "IVe":
        return this._returnIverbs();
      default:
        break;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.headerWrapper]}>
          <TouchableWithoutFeedback
            onPress={() => this.props.callBack("GO_BACK")}
          >
            <View style={styles.iconWrapper}>
              <Image
                style={{
                  width: 20,
                  height: (20 * 80) / 92,
                  tintColor: "orange"
                }}
                source={require("../../assets/images/back.png")}
              />
            </View>
          </TouchableWithoutFeedback>
          <Text style={styles.textHeader}>{"Details"}</Text>
          <View
            style={{
              width: 20,
              height: (20 * 80) / 92
            }}
          />
        </View>
        {this._returnView()}
      </View>
    );
  }
}
