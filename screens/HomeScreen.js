import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Dimensions,
  AppState,
  Vibration
} from "react-native";
import { Icon, Button } from "react-native-elements";
import { LinearGradient } from "expo";
import { FontAwesome } from "@expo/vector-icons";
import Toast, { DURATION } from "react-native-easy-toast";
import util from "../util";
import styles from "../styles/index";
import { API_URL } from "react-native-dotenv";
import axios from "axios";
import utility from "../utility/utility";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carStatus: 0, // 0 - with user,recieved - 1, parked - 2, requested - 3, arrived - 4, returned to user - 5
      user: null,
      appState: AppState.currentState
    };
    let timer;
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
    this.didFocusListener.remove();
    clearInterval(this.timer);
  }
  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
    }
    this.setState({ appState: nextAppState });
  };

  async componentDidMount() {
    AppState.addEventListener("change", this._handleAppStateChange);
    let user = JSON.parse(await AsyncStorage.getItem("user"));
    this.setState({ user: user });
    this.getCurrentStatus();

    this.timer = setInterval(() => {
      console.log("Polling Home screen user", user.name, this.state.appState);
      this.getCurrentStatus();
    }, 3000);

    this.didFocusListener = this.props.navigation.addListener(
      "didFocus",
      () => {
        this.getCurrentStatus();
        console.log(this.timer);

        this.timer = setInterval(() => {
          console.log(
            "Polling Home screen user focs",
            user.name,
            this.state.appState
          );
          this.getCurrentStatus();
        }, 3000);
      }
    );

    this.onBlurListener = this.props.navigation.addListener("didBlur", () => {
      console.log("Blur"), console.log(this.timer);
      clearInterval(this.timer);
    });
  }

  getCurrentStatus = flag => {
    let url = API_URL + "status/" + this.state.user.employee_id;
    let self = this;
    if (this.state.appState == "active") {
      if (
        this.state.carStatus == 0 ||
        this.state.carStatus == 1 ||
        this.state.carStatus == 3 ||
        flag
      ) {
        //do not call when status is 2,4
        axios
          .get(url)
          .then(function(response) {
            self.setState({
              carStatus:
                response.data.current_status != 5
                  ? response.data.current_status
                  : 0
            });
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }
  };
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    let user = JSON.parse(await AsyncStorage.getItem("user"));

    this.props.navigation.navigate("Auth");
  };
  changeStatus(flag) {
    let self = this;
    let url = API_URL + "changestatus/" + this.state.user.employee_id;
    axios
      .post(url, {})
      .then(function(response) {
        if (self.state.carStatus == 4) {
          self.refs.toast.show(
            "Thank you,have a good day!",
            DURATION.LENGTH_LONG
          );
          self.getCurrentStatus(flag);
        } else {
          self.refs.toast.show(
            utility.STATUS_TEXT(self.state.carStatus + 1),
            DURATION.LENGTH_LONG
          );
          self.getCurrentStatus(flag);
        }

        self.componentDidMount();
      })
      .catch(function(error) {
        console.log(error);
      });
    // this.setState({
    //   carStatus: this.state.carStatus < 4 ? this.state.carStatus + 1 : 0
    // });
  }
  render() {
    const { navigation } = this.props;
    let { user } = this.state;

    return (
      <LinearGradient colors={util.gradientColor} style={styles.homeScreenWrap}>
        <Toast
          ref="toast"
          style={styles.toastBGStyle}
          position="top"
          positionValue={Dimensions.get("window").height - 150}
          fadeInDuration={750}
          fadeOutDuration={5000}
          opacity={1}
          textStyle={styles.toastTextStyle}
        />

        <FontAwesome
          name="power-off"
          size={30}
          style={styles.logout}
          onPress={this._signOutAsync.bind(this)}
        />
        {user && this.state.carStatus === 0 && (
          <View style={styles.homeScreenWrap}>
            <Text style={styles.welcomeMessage}>Hi {user.name}</Text>
            <Image
              source={{ uri: user.qr_code }}
              style={{ width: 250, height: 250 }}
            />
            <Text style={styles.qrHelp} onPress={this.changeStatus.bind(this)}>
              Show this to Valet parking member
            </Text>
          </View>
        )}
        {user && this.state.carStatus === 1 && (
          <View style={styles.homeScreenWrap}>
            <Text style={styles.welcomeMessage}>Hi {user.name}</Text>
            <Image
              source={require("../assets/car-recieved.png")}
              style={{
                width: 200,
                height: 200,
                resizeMode: "cover",
                marginLeft: 30
              }}
            />
            <Text
              style={styles.carStatus}
              onPress={this.changeStatus.bind(this)}
            >
              Got your car,{"\n"} we'll let you know once its parked
            </Text>
          </View>
        )}
        {user && this.state.carStatus === 2 && (
          <View style={styles.homeScreenWrap}>
            <Text style={styles.welcomeMessage}>Hi {user.name}</Text>
            <Image
              source={require("../assets/parked.png")}
              style={{
                width: 200,
                height: 200,
                resizeMode: "cover",
                marginLeft: 30
              }}
            />
            <Text
              style={styles.carStatus}
              onPress={this.changeStatus.bind(this)}
            >
              Your car has been parked!
            </Text>

            <Button
              title="Request Car"
              rounded
              large
              backgroundColor="#fff"
              color="#d80645"
              fontSize={36}
              fontFamily="exo-medium"
              onPress={this.changeStatus.bind(this, true)}
            />
          </View>
        )}
        {user && this.state.carStatus === 3 && (
          <View style={styles.homeScreenWrap}>
            <Text style={styles.welcomeMessage}>Hi {user.name}</Text>
            <Image
              source={require("../assets/getting_car.png")}
              style={{
                width: 200,
                height: 200,
                resizeMode: "cover",
                marginLeft: 0,
                marginBottom: 30
              }}
            />
            <Text
              style={styles.carStatus}
              onPress={this.changeStatus.bind(this)}
            >
              Getting your car, {"\n"}we'll let you know once its here.
            </Text>
          </View>
        )}
        {user && this.state.carStatus === 4 && (
          <View style={styles.homeScreenWrap}>
            <Text style={styles.welcomeMessage}>Hi {user.name}</Text>
            <Image
              source={require("../assets/key.png")}
              style={{
                width: 200,
                height: 200,
                resizeMode: "cover",
                marginLeft: 30
              }}
            />
            <Text style={styles.carStatus}>
              Your car is here, please collect and confirm
            </Text>
            <Button
              title="Confirm"
              rounded
              large
              backgroundColor="#fff"
              color="#d80645"
              fontSize={36}
              fontFamily="exo-medium"
              onPress={this.changeStatus.bind(this, true)}
            />
          </View>
        )}
      </LinearGradient>
    );
  }
}
