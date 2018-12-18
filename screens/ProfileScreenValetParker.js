import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  AsyncStorage,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import {
  Card,
  ListItem,
  Button,
  Avatar,
  FormLabel,
  FormInput,
  FormValidationMessage,
  Rating
} from "react-native-elements";
import { LinearGradient } from "expo";
import util from "../util";
import styles from "../styles/index";
import { TextInput } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      phoneEditable: false,
      user: null
    };
  }
  async componentDidMount() {
    let user = JSON.parse(await AsyncStorage.getItem("user"));

    this.setState({ user: user, phone: user.phone });
  }
  onInputChange(name, e) {
    if (name == "EID") {
      this.input.focus();
    } else {
      this.input2.focus();
    }
    this.setState({ [name]: e });
  }

  toggle(item) {
    switch (item) {
      case 1:
        this.setState({ EIDEditable: true });
        break;
      case 2:
        this.setState({ phoneEditable: true });
        break;
      case 3:
        this.setState({ showHelp: !this.state.showHelp });
        break;
      case 4:
        this.setState({ showFeedback: !this.state.showFeedback });
        break;
    }
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };

  render() {
    const { user } = this.state;

    return (
      // <ScrollView>
      // <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <KeyboardAwareScrollView
        style={{ backgroundColor: "#ececec" }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        // contentContainerStyle={{ flex: 1 }}
        scrollEnabled={false}
      >
        <LinearGradient colors={util.gradientColor} style={styles.container}>
          {user && (
            <View style={styles.profileAvatar}>
              <FontAwesome
                name="power-off"
                size={30}
                style={styles.logout}
                onPress={this._signOutAsync.bind(this)}
              />
              <Avatar
                large
                rounded
                source={{
                  uri: user.profile_pic
                    ? user.profile_pic
                    : "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
                }}
                onPress={() => console.log("Works!")}
                activeOpacity={0.7}
              />
              <Text style={styles.name}>{user.name ? user.name : ""}</Text>
            </View>
          )}
        </LinearGradient>
        <View style={{ marginBottom: 10 }}>
          <View style={styles.profileFieldWrap}>
            <Text style={styles.profileFieldHead}>Phone Number</Text>
            <TextInput
              style={styles.profileField}
              value={this.state.phone}
              editable={this.state.phoneEditable}
              onChangeText={this.onInputChange.bind(this, "phone")}
              ref={input => (this.input2 = input)}
            />
            <TouchableOpacity
              style={styles.showIconWrapText}
              onPress={this.toggle.bind(this, 2)}
            >
              <FontAwesome
                name="edit"
                size={Platform.OS === "ios" ? 17 : 16}
                style={styles.showIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* </KeyboardAvoidingView> */}
        {/* // </ScrollView> */}
      </KeyboardAwareScrollView>
    );
  }
}
