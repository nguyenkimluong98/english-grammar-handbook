import { createStackNavigator, createDrawerNavigator } from "react-navigation";
import Colors from "../constants/Colors";
import { MyMenuDrawer } from "../components/index";
import SplashScreen from "../screens/Splash/SplashContainer";
import MainScreen from "../screens/Main/MainContainer";
import MoreAppsScreen from "../screens/MoreApps/MoreApps";
import ListWordScreen from "../screens/ListWord/ListWordContainer";
import DetailScreen from "../screens/Detail/DetailContainer";

const MenuDrawer = createDrawerNavigator(
  {
    MainScreen: {
      screen: MainScreen
    }
  },
  {
    initialRouteName: "MainScreen",
    contentComponent: MyMenuDrawer
  }
);

const RootNavigator = createStackNavigator(
  {
    SplashScreen: {
      screen: SplashScreen
    },
    MenuDrawer: {
      screen: MenuDrawer
    },

    ListWord: {
      screen: ListWordScreen
    },
    MoreAppsScreen: {
      screen: MoreAppsScreen
    },

    Detail: {
      screen: DetailScreen
    }
  },
  {
    headerMode: "none",
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: "normal",
        color: "white"
      },
      headerStyle: {
        backgroundColor: Colors.colorPrimary
      }
    })
  }
);

export default RootNavigator;
