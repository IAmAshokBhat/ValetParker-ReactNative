import React from "react";
import { StyleSheet, Text, View, Image, AsyncStorage } from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createDrawerNavigator,
  createSwitchNavigator
} from "react-navigation";
import { Icon, Button } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import ProfileScreen from "./screens/ProfileScreen";
import DetailsScreen from "./screens/DetailsScreen";
import CarDetailsScreen from "./screens/CarDetailsScreen";
import HomeScreen from "./screens/HomeScreen";
import AuthLoadingScreen from "./screens/AuthLoadingScreen";
import LogoTitle from "./components/LogoTitle";
import HomeScreenValetParker from "./screens/HomeScreenValetParker";
import ModalScreen from "./components/ModalScreen";
import CarDetailsScreenValetParker from "./screens/CarDetailsScreenValetParker";
import SignInScreen from "./screens/SignInScreen";
import ProfileScreenValetParker from "./screens/ProfileScreenValetParker";
import AllCarsScreen from "./screens/AllCarsScreen";
import utility from "./utility/utility";

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
    Settings: CarDetailsScreen,
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
    Home: HomeScreen,
    Profile: ProfileScreen,
    CarDetails: CarDetailsScreen
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Home") {
          iconName = `home`;
        } else if (routeName === "Profile") {
          iconName = `user-circle`;
        } else if (routeName === "CarDetails") {
          iconName = `car`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return (
          <FontAwesome
            name={iconName}
            size={horizontal ? 20 : 25}
            color={tintColor}
          />
        );
      }
    }),
    tabBarOptions: {
      activeTintColor: "#d80645",
      inactiveTintColor: "gray",
      style: {
        height: 55
      },
      labelStyle: {
        fontFamily: "exo-medium",
        fontSize: 17
      }
    }
  }
);
const TabNavigatorParker = createBottomTabNavigator(
  {
    Home: HomeScreenValetParker,
    Cars: AllCarsScreen,
    Profile: ProfileScreenValetParker
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Home") {
          iconName = `home`;
        } else if (routeName === "Profile") {
          iconName = `user-circle`;
        } else if (routeName === "Cars") {
          iconName = `car`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return (
          <FontAwesome
            name={iconName}
            size={horizontal ? 20 : 25}
            color={tintColor}
          />
        );
      }
    }),
    tabBarOptions: {
      activeTintColor: "#d80645",
      inactiveTintColor: "gray",
      style: {
        height: 55
      },
      labelStyle: {
        fontFamily: "exo-medium",
        fontSize: 17
      }
    }
  }
);
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

const AppNavigator = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: TabNavigator,
      Auth: SignInScreen,
      ValetParker: TabNavigatorParker,
      CarObservations: CarDetailsScreenValetParker
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);

export default AppNavigator;
