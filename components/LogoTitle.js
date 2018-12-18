import React from "react";
import { Image, Text } from "react-native";

export default class LogoTitle extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      //   <Image
      //     source={require("../assets/icon.png")}
      //     style={{ width: 30, height: 30 }}
      //   />
      <Text>{this.props.title}</Text>
      //   <Text>{navigationOptions.headerTintColor}</Text>
    );
  }
}
