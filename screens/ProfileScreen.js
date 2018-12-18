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
  TouchableOpacity,
  RefreshControl
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

import axios from "axios";
import { API_URL } from "react-native-dotenv";

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      EID: "",
      showFeedback: false,
      showHelp: false,
      phoneEditable: false,
      EIDEditable: false,
      dp: "",
      user: null,
      refreshing: false
    };
  }

  async componentDidMount() {
    let user = JSON.parse(await AsyncStorage.getItem("user"));
    this.setState({
      phone: user.phone,
      EID: user.employee_id + "",
      dp: user.profile_pic,
      user: user
    });
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
  ratingCompleted(rating) {
    console.log("Rating is: " + rating);
  }
  async _onRefresh() {
    this.getUserDetails();
  }

  getUserDetails() {
    let url = API_URL + "userdetails?id=" + this.state.EID;
    let self = this;
    axios
      .get(url)
      .then(async function(response) {
        await AsyncStorage.setItem("user", JSON.stringify(response.data.data));
        console.log(response.data.data);
        user = response.data.data;
        self.setState({
          phone: user.phone,
          EID: user.employee_id + "",
          dp: user.profile_pic,
          user: user
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
    const { user } = this.state;
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
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
                  uri: this.state.dp
                    ? this.state.dp
                    : "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
                }}
                onPress={() => console.log("Works!")}
                activeOpacity={0.7}
              />
              <Text style={styles.name}>{user.name}</Text>
            </View>
          )}
        </LinearGradient>
        <View style={{ marginBottom: 10 }}>
          <View style={styles.profileFieldWrap}>
            <Text style={styles.profileFieldHead}>Employee Id</Text>
            <TextInput
              placeholder="EmployeeID"
              style={styles.profileField}
              value={this.state.EID}
              editable={this.state.EIDEditable}
              onChangeText={this.onInputChange.bind(this, "EID")}
              ref={input => (this.input = input)}
            />
            <FontAwesome
              name="edit"
              size={Platform.OS === "ios" ? 17 : 16}
              style={styles.pencil}
              onPress={this.toggle.bind(this, 1)}
            />
          </View>
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
          <View style={styles.profileFieldWrap}>
            <Text style={styles.profileFieldHead}>Get Help</Text>
            <TouchableOpacity
              style={styles.showIconWrap}
              onPress={this.toggle.bind(this, 3)}
            >
              <FontAwesome
                name={!this.state.showHelp ? "chevron-right" : "chevron-down"}
                size={Platform.OS === "ios" ? 17 : 16}
                style={styles.showIcon}
              />
            </TouchableOpacity>
          </View>
          {this.state.showHelp && (
            <View
              style={{
                backgroundColor: "#fff",
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderColor: "#ececec",
                borderBottomWidth: 1.5
              }}
            >
              <Text
                style={{
                  fontFamily: "exo-bold",
                  fontSize: 20,
                  color: "#d80645"
                }}
              >
                Having problem getting your car?
              </Text>
              <Text
                style={{
                  fontFamily: "exo-medium",
                  fontSize: 20,
                  marginBottom: 15
                }}
              >
                Call us at : 9999999999
              </Text>
              <Text
                style={{
                  fontFamily: "exo-bold",
                  fontSize: 20,
                  color: "#d80645"
                }}
              >
                Having problem with app?
              </Text>
              <Text
                style={{
                  fontFamily: "exo-medium",
                  fontSize: 20,
                  paddingBottom: 15
                }}
              >
                Write us at : ashok.bhat@rakuten.com
              </Text>
            </View>
          )}
          <View style={styles.profileFieldWrap}>
            <Text style={styles.profileFieldHead}>Feedback</Text>
            <TouchableOpacity
              style={styles.showIconWrap}
              onPress={this.toggle.bind(this, 4)}
            >
              <FontAwesome
                name={
                  !this.state.showFeedback ? "chevron-right" : "chevron-down"
                }
                size={Platform.OS === "ios" ? 17 : 16}
                style={styles.showIcon}
              />
            </TouchableOpacity>
          </View>
          {this.state.showFeedback && (
            <View
              style={{
                backgroundColor: "#fff",
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderColor: "#ececec",
                borderBottomWidth: 1.5
              }}
            >
              <Text
                style={{
                  fontFamily: "exo-bold",
                  fontSize: 20,
                  color: "#d80645"
                }}
              >
                Did you love our app, please rate us
              </Text>
              <Rating
                type="heart"
                ratingCount={5}
                fractions={1}
                startingValue={3.5}
                imageSize={40}
                onFinishRating={this.ratingCompleted}
                style={{ paddingVertical: 10 }}
              />
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
}
