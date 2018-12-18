import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View
} from "react-native";

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    let user = JSON.parse(await AsyncStorage.getItem("user"));
    console.log("AUTH LOADING", user);
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    if (user) {
      if (user.user_type == 1) {
        this.props.navigation.navigate("App");
      } else if (user.user_type == 2) {
        this.props.navigation.navigate("ValetParker");
      }
    } else {
      this.props.navigation.navigate("Auth");
    }
    //this.props.navigation.navigate(userToken ? "App" : "Auth");
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
