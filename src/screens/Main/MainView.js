import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableNativeFeedback,
  ImageBackground,
  TouchableWithoutFeedback,
  TextInput
} from "react-native";
import styles from "./styles";
import Colors from "../../constants/Colors";
import { observer } from "mobx-react";

@observer
export default class MainView extends Component {
  constructor(props) {
    super(props);
  }

  _renderCategoryWord = (item, index) => {
    return (
      <TouchableWithoutFeedback
        // gui sang 1 categoryID
        onPress={() =>
          this.props.callBack("GO_TO_LISTWORD_SCREEN", {
            headerName: item.name,
            sign: item.sign
          })
        }
      >
        <View>
          <ImageBackground source={item.img} style={[styles.categoryWrapper]}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "300",
                color: "black",
                fontFamily: "F black",
                marginLeft: 40
              }}
            >
              {item.name}
            </Text>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    return (
      <ImageBackground
        source={require("../../assets/images/bg2.png")}
        style={styles.container}
      >
        <FlatList
          style={{ flex: 1, marginTop: 15 }}
          data={this.props.myMenu}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) =>
            this._renderCategoryWord(item, index)
          }
          keyExtractor={({ index }) => index + ""}
        />
      </ImageBackground>
    );
  }
}
