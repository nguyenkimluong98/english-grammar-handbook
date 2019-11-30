import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  ImageBackground,
  ActivityIndicator
} from "react-native";
import styles from "./styles";

export default class ListWordView extends Component {
  constructor(props) {
    super(props);
  }

  _receiveTitleFromContainer = item => {
    let result = null;
    switch (this.props.sign) {
      case "FTOP":
      case "TOP":
        result = item.properties.SubjectName;
        break;
      case "FIdi":
      case "Idi":
        result = item["properties"].name;
        break;
      case "IVe":
        result = item["properties"].BaseForm;
        break;
      default:
        break;
    }
    return result;
  };

  _renderWordItem = (item, index) => {
    const check = this.props.idWordOpening == index;
    return (
      <TouchableWithoutFeedback
        onPress={() => this.props.callBack("CHANGE_ID_CARD", { item, index })}
      >
        <ImageBackground
          style={styles.cardWrapper}
          source={
            check
              ? require("../../assets/images/rec2.png")
              : require("../../assets/images/rec1.png")
          }
        >
          <TouchableWithoutFeedback
            onPress={() =>
              this.props.callBack("CHANGE_ID_CARD", { item, index })
            }
          >
            <View style={{ width: "80%" }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "black",
                  fontFamily: "F black"
                }}
              >
                {this._receiveTitleFromContainer(item)}
              </Text>
            </View>
          </TouchableWithoutFeedback>
          {this.props.favoritable ? (
            <TouchableWithoutFeedback
              onPress={() => {
                this.props.callBack("FAVORITE_PHRASE", index);
              }}
            >
              <View
                style={{
                  width: "20%",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Image
                  style={{ width: 30, height: 30 }}
                  source={
                    item["properties"]["Favorite"] == null
                      ? require("../../assets/images/emty_star.png")
                      : require("../../assets/images/star.png")
                  }
                />
              </View>
            </TouchableWithoutFeedback>
          ) : null}
        </ImageBackground>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    const { dataCategoryWord } = this.props;
    return (
      <View style={styles.container}>
        <View
          style={[styles.headerWrapper, { justifyContent: "space-between" }]}
        >
          <TouchableWithoutFeedback
            onPress={() => this.props.callBack("GO_BACK")}
          >
            <View style={styles.iconWrapper}>
              <Image
                style={{ width: 20, height: (20 * 80) / 92, tintColor: "gray" }}
                source={require("../../assets/images/back.png")}
              />
            </View>
          </TouchableWithoutFeedback>
          <Text style={[styles.textHeader, { color: "black" }]}>
            {this.props.headerName}
          </Text>
          <View style={styles.iconWrapper} />
        </View>
        <View style={{ flex: 1, alignItems: "center", marginTop: 15 }}>
          <FlatList
            data={dataCategoryWord}
            renderItem={({ item, index }) => this._renderWordItem(item, index)}
            keyExtractor={({ index }) => index + ""}
            showsVerticalScrollIndicator={false}
            extraData={this.props.reloadFavorite}
          />
        </View>
      </View>
    );
  }
}
