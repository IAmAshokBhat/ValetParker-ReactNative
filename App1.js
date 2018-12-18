import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createDrawerNavigator,
  createSwitchNavigator
} from "react-navigation";
import ProfileScreen from "./screens/ProfileScreen";
import DetailsScreen from "./screens/DetailsScreen";
import SettingScreen from "./screens/SettingScreen";
import HomeScreen from "./screens/HomeScreen";
import AuthLoadingScreen from "./screens/AuthLoadingScreen";
import LogoTitle from "./components/LogoTitle";
import { Icon, Button } from "react-native-elements";
import ModalScreen from "./components/ModalScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import SignInScreen from "./screens/SignInScreen";

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Profile: ProfileScreen,
    MyModal: ModalScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#bf0001"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);
const SettingStack = createStackNavigator(
  {
    Settings: SettingScreen,
    Details: DetailsScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#bf0001"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);
const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Profile: ProfileScreen,
    Settings: SettingStack
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Home") {
          iconName = `ios-information-circle${focused ? "" : "-outline"}`;
        } else if (routeName === "Settings") {
          iconName = `ios-options${focused ? "" : "-outline"}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return (
          <Ionicons
            name={iconName}
            size={horizontal ? 20 : 25}
            color={tintColor}
          />
        );
      }
    }),
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray"
    }
  }
);
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createAppContainer(
  createSwitchNavigator(
    { AuthLoading: AuthLoadingScreen, App: TabNavigator, Auth: SignInScreen },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
