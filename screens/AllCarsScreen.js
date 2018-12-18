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
  FlatList,
  Dimensions,
  AppState
} from "react-native";
import {
  Card,
  ListItem,
  Button,
  Avatar,
  List,
  Badge
} from "react-native-elements";
import { LinearGradient } from "expo";
import util from "../util";
import styles from "../styles/index";
import { TextInput } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import utility from "../utility/utility";
import Toast, { DURATION } from "react-native-easy-toast";
import { API_URL } from "react-native-dotenv";
import axios from "axios";
class MyListItem extends React.PureComponent {
  changeStatus(employee_id, currentStatus) {
    let self = this;
    let url = API_URL + "changestatus/" + employee_id;
    axios
      .post(url, {})
      .then(function(response) {
        self.refs.toast.show(
          "Status has been changed to " +
            utility.STATUS_TEXT(currentStatus + 1),
          DURATION.LENGTH_LONG
        );
        // self.props.getAllCars();
      })
      .catch(function(error) {
        console.log(error);
      });

    // if (this.state.carStatus == 4) {
    //   this.refs.toast.show("Thank you,have a good day!", DURATION.LENGTH_LONG);
    // }
    // this.setState({
    //   carStatus: this.state.carStatus < 4 ? this.state.carStatus + 1 : 0
    // });
  }
  render() {
    const { item } = this.props;

    return (
      <View>
        <Toast
          ref="toast"
          style={styles.toastBGStyleInverse}
          position="top"
          fadeInDuration={750}
          fadeOutDuration={5000}
          opacity={1}
          textStyle={styles.toastTextStyleInverse}
        />
        <ListItem
          roundAvatar
          avatar={{ uri: item.image_url }}
          key={item.car_number}
          hideChevron={true}
          title={
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.carTitle}>{item.name}</Text>
              {(item.current_status == 1 || item.current_status == 3) && (
                <TouchableOpacity
                  onPress={this.changeStatus.bind(
                    this,
                    item.employee_id,
                    item.current_status
                  )}
                >
                  <Badge
                    containerStyle={{ backgroundColor: "#d80645" }}
                    value={utility.STATUS_ACTION(item.current_status)}
                    textStyle={{ color: "#fff", fontFamily: "exo-medium" }}
                  />
                </TouchableOpacity>
              )}
            </View>
          }
          subtitle={item.car_number.toUpperCase()}
          subtitleStyle={styles.carSubText}
        />
      </View>
    );
  }
}
export default class AllCarsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allCars: {
        carParked: [],
        carArrived: [],
        carRecieved: [],
        carRequested: []
      },
      appState: AppState.currentState
    };
    let timer;
  }

  componentDidMount() {
    AppState.addEventListener("change", this._handleAppStateChange);
    this.getAllCars();
    this.didFocusListener = this.props.navigation.addListener(
      "didFocus",
      () => {
        this.getAllCars();
        this.timer = setInterval(() => {
          console.log("Polling All Cars", new Date());
          this.getAllCars();
        }, 2000);
      }
    );

    this.onBlurListener = this.props.navigation.addListener("didBlur", () => {
      console.log("Blur"), console.log(this.timer);
      clearInterval(this.timer);
    });
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
  getAllCars = () => {
    let url = API_URL + "activecars/";
    let self = this;
    if (this.state.appState == "active") {
      axios
        .get(url)
        .then(function(response) {
          let allCars = {
            carParked: [],
            carArrived: [],
            carRecieved: [],
            carRequested: []
          };
          response.data.data.forEach(element => {
            switch (element.current_status) {
              case 1:
                allCars.carRecieved.push(element);
                break;
              case 2:
                allCars.carParked.push(element);
                break;
              case 3:
                allCars.carRequested.push(element);
                break;
              case 4:
                allCars.carArrived.push(element);
                break;
            }
          });

          self.setState({ allCars: allCars });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };

  renderRow({ item }) {
    return <MyListItem item={item} />;
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.AllCars}>All Cars</Text>
        <FontAwesome
          name="power-off"
          size={30}
          style={styles.logout}
          onPress={this._signOutAsync.bind(this)}
        />
        <ScrollView>
          {this.state.allCars.carRequested.length > 0 && (
            <View>
              <Text style={styles.groupHead}>Requested Cars</Text>
              <List containerStyle={styles.listWrap}>
                <FlatList
                  data={this.state.allCars.carRequested}
                  renderItem={this.renderRow}
                  keyExtractor={item => item.car_number}
                />
              </List>
            </View>
          )}
          {this.state.allCars.carRecieved.length > 0 && (
            <View>
              <Text style={styles.groupHead}>Recieved Cars</Text>
              <List containerStyle={styles.listWrap}>
                <FlatList
                  data={this.state.allCars.carRecieved}
                  renderItem={this.renderRow}
                  keyExtractor={item => item.car_number}
                />
              </List>
            </View>
          )}
          {this.state.allCars.carArrived.length > 0 && (
            <View>
              <Text style={styles.groupHead}>Rakuten Parking Cars</Text>
              <List containerStyle={styles.listWrap}>
                <FlatList
                  data={this.state.allCars.carArrived}
                  renderItem={this.renderRow}
                  keyExtractor={item => item.car_number}
                />
              </List>
            </View>
          )}
          {this.state.allCars.carParked.length > 0 && (
            <View>
              <Text style={styles.groupHead}>Parked Cars</Text>
              <List containerStyle={styles.listWrap}>
                <FlatList
                  data={this.state.allCars.carParked}
                  renderItem={this.renderRow}
                  keyExtractor={item => item.car_number}
                />
              </List>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}
