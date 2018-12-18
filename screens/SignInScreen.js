import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  TextInput,
  Image,
  KeyboardAvoidingView
} from "react-native";
import { LinearGradient, Permissions, Notifications } from "expo";
import {
  FormInput,
  FormLabel,
  Button,
  FormValidationMessage,
  Text
} from "react-native-elements";
import util from "../util";
import styles from "../styles/index";
import { View } from "native-base";
import axios from "axios";
import { API_URL } from "react-native-dotenv";

const PUSH_ENDPOINT = API_URL + "pushtoken/";

export default class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eid: "224612868",
      password: "ValetParker111"
    };
  }

  async componentDidMount() {}
  handleInput(name, e) {
    this.setState({ [name]: e });
  }
  _signInAsync = async () => {
    let self = this;
    let url = API_URL + "login";
    let body = { employee_id: this.state.eid, password: this.state.password };
    axios
      .post(url, body)
      .then(async function(response) {
        await AsyncStorage.setItem("user", JSON.stringify(response.data.data));
        let user = response.data.data;

        self.registerForPushNotificationsAsync(user.employee_id);

        if (user.user_type == 1) {
          self.props.navigation.navigate("App");
        } else if (user.user_type == 2) {
          self.props.navigation.navigate("ValetParker");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <LinearGradient colors={util.gradientColor} style={styles.container}>
          <View style={styles.loginScreen}>
            <View style={{ alignContent: "center", alignItems: "center" }}>
              <Image
                source={require("../assets/park.png")}
                style={{
                  width: 150,
                  height: 150,
                  justifyContent: "flex-end",
                  marginLeft: 15,
                  resizeMode: "cover"
                }}
              />
              <Text style={styles.AppName}>Valet Parker</Text>
            </View>
            <TextInput
              style={styles.loginInput}
              placeholder="Employee ID"
              placeholderTextColor="#fff"
              keyboardType="numeric"
              maxLength={9}
              name="eid"
              value={this.state.eid}
              onChangeText={this.handleInput.bind(this, "eid")}
            />

            <TextInput
              style={styles.loginPassword}
              placeholder="Password"
              placeholderTextColor="#fff"
              secureTextEntry={true}
              name="password"
              value={this.state.password}
              onChangeText={this.handleInput.bind(this, "password")}
            />

            <Button
              title="Sign in"
              onPress={this._signInAsync}
              style={styles.loginButton}
              backgroundColor="#fff"
              marginTop={20}
              fontFamily="exo-bold"
              color="#ea3e2c"
              fontSize={20}
              rounded
              large
            />
          </View>
          <View style={styles.linksWrap}>
            <Text style={styles.link}>Sign Up</Text>
            <Text style={styles.link}>Forgot Password?</Text>
          </View>
        </LinearGradient>
        {/* <View style={{ height: 60 }} /> */}
      </KeyboardAvoidingView>
    );
  }

  registerForPushNotificationsAsync = async userId => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== "granted") {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== "granted") {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    //console.log("PUSH TOKEN RECIEVED");
    //console.log(token);
    let url = PUSH_ENDPOINT + userId;
    // POST the token to your backend server from where you can retrieve it to send push notifications.
    axios
      .post(url, {
        token: token
      })
      .then(function(response) {
        //  console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
}
