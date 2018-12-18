import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Details"
    };
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Details Screen</Text>
        {/* <Button
          title="Profile"
          onPress={() => this.props.navigation.push("Profile")}
        /> */}
        <Button title="Back" onPress={() => this.props.navigation.goBack()} />
      </View>
    );
  }
}
