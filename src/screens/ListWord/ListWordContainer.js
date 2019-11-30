import React, { Component } from "react";
import { View } from "react-native";
import ListWordView from "./ListWordView";
import { getParamData, goBack, startActivityForResult } from "../../utils";
import { inject, observer } from "mobx-react";
import { observable } from "mobx";
import Idiomlist from "../../assets/data/idiomlist";
import IVerbsFull from "../../assets/data/IVerbsFull";
import GrammarTopics from "../../assets/data/Subjects";
import { AIBBanner } from "../../libs/AIBAds";

@inject("store")
@observer
export default class ListWordScreen extends Component {
  @observable
  dataCategoryWord = [];

  @observable
  idWordOpening = 0;

  @observable
  reloadFavorite = 0;

  constructor(props) {
    super(props);
    let data = getParamData(this.props.navigation);
    this.headerName = data.headerName;
    this.menuSign = data.sign;
    this.favoritable = false;
  }

  componentWillMount() {
    this.dataCategoryWord = this._getDataBySign();
  }

  // danh dau cac tu duoc yeu thich
  _getDataFavorited = (totalData, categoryToFavorite) => {
    // chi tim nhung item da danh dau favorite
    let data = [];
    if (this.menuSign == "FTOP" || this.menuSign == "FIdi") {
      this.props.store.favoriteIdArray[categoryToFavorite].map(e => {
        data.push(totalData[e - 1]);
      });
    } else {
      data = totalData;
    }

    // alert(JSON.stringify(this.props.store.favoriteIdArray));

    // alert(categoryToFavorite);

    // neu khong phai screen favorite, nó sẽ hiện những từ được yêu thích xen kẽ...còn không sẽ chỉ toàn từ yêu thích
    if (data.length > 0) {
      data.map(e => {
        if (
          this.props.store.favoriteIdArray[categoryToFavorite].indexOf(
            e["properties"]._id
          ) > -1
        ) {
          e["properties"]["Favorite"] = 1;
        } else e["properties"]["Favorite"] = null;
      });
    }

    return data;
  };

  _getDataBySign = () => {
    let data = null;
    let categoryToFavorite = this._returnCategoryToFavorite();
    switch (this.menuSign) {
      case "FTOP":
      case "TOP":
        data = this._getDataFavorited(
          GrammarTopics.features,
          categoryToFavorite
        );
        this.favoritable = true;
        break;
      case "IVe":
        data = IVerbsFull.features;
        break;
      case "FIdi":
      case "Idi":
        let totalIdioms = Idiomlist.features;
        totalIdioms.map((e, i) => (e.properties._id = i + 1));
        // alert(JSON.stringify(totalIdioms));
        data = this._getDataFavorited(totalIdioms, categoryToFavorite);
        this.favoritable = true;
        break;
    }

    return data;
  };

  // xac dinh ten array da luu data
  _returnCategoryToFavorite = () => {
    let categoryToFavorite = "";
    switch (this.menuSign) {
      case "FIdi":
      case "Idi":
        categoryToFavorite = "idioms";
        break;
      case "FTOP":
      case "TOP":
        categoryToFavorite = "topics";
        break;
    }

    return categoryToFavorite;
  };

  callBack = (key, data = null) => {
    switch (key) {
      case "GO_BACK":
        goBack(this.props.navigation);
        break;

      case "CHANGE_ID_CARD":
        // GO_TO_DETAIL_SCREEN
        startActivityForResult(this.props.navigation, "Detail", {
          ...data.item,
          sign: this.menuSign
        });

        this.reloadFavorite++;
        if (this.idWordOpening != data.index) {
          this.idWordOpening = data.index;
        }

        break;

      case "FAVORITE_PHRASE":
        // nhan index tu view truyen sang
        // xac dinh xem tu` yeu thich se duoc them vao array nao
        let categoryToFavorite = this._returnCategoryToFavorite();

        this.reloadFavorite++;
        let item = this.dataCategoryWord[data];
        if (item["properties"]["Favorite"] == null) {
          this.props.store._handleFavoriteId(
            item["properties"]._id,
            categoryToFavorite,
            "add"
          );
          this.dataCategoryWord[data]["properties"]["Favorite"] = 1;
        } else {
          this.props.store._handleFavoriteId(
            item["properties"]._id,
            categoryToFavorite,
            "remove"
          );
          this.dataCategoryWord[data]["properties"]["Favorite"] = null;
        }
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ListWordView
          {...this.props}
          callBack={this.callBack}
          headerName={this.headerName}
          dataCategoryWord={this.dataCategoryWord}
          idWordOpening={this.idWordOpening}
          reloadFavorite={this.reloadFavorite}
          favoritable={this.favoritable}
          sign={this.menuSign}
        />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <AIBBanner />
        </View>
      </View>
    );
  }
}
