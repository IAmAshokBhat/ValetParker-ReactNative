import React from "react";
import AppNavigator from "./AppNavigator";
import { AppLoading, Font, Notifications } from "expo";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      notification: {}
    };
  }
  async componentDidMount() {
    await Font.loadAsync({
      "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
      "roboto-medium": require("./assets/fonts/Roboto-Medium.ttf"),
      "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
      pat: require("./assets/fonts/PatuaOne-Regular.otf"),
      "exo-medium": require("./assets/fonts/Exo2-Medium.otf"),
      exo: require("./assets/fonts/Exo2-Regular.otf"),
      "exo-bold": require("./assets/fonts/Exo2-Bold.otf"),
      "open-sans-italic": require("./assets/fonts/OpenSans-SemiboldItalic.ttf")
    });
    this.setState({ fontLoaded: true });
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }
  _handleNotification = notification => {
    this.setState({ notification: notification });
  };

  render() {
    if (this.state.fontLoaded) {
      return <AppNavigator />;
    } else {
      return <AppLoading />;
    }
  }
}
