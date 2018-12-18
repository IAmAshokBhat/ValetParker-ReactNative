import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Dimensions,
  BackHandler,
  Vibration
} from "react-native";
import { Icon, Button } from "react-native-elements";
import { LinearGradient, BarCodeScanner, Permissions } from "expo";
import Modal from "react-native-modal";
import { FontAwesome } from "@expo/vector-icons";
import Toast, { DURATION } from "react-native-easy-toast";
import util from "../util";
import styles from "../styles/index";
import utility from "../utility/utility";
import ModalScreen from "../components/ModalScreen";
import axios from "axios";
import { API_URL } from "react-native-dotenv";
export default class HomeScreenValetParker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      hasCameraPermission: null,
      showQRScanner: false,
      showModal: false,
      scannedUser: null
    };
  }
  async componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    let user = JSON.parse(await AsyncStorage.getItem("user"));

    this.setState({ user: user });
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }
  handleBackPress = () => {
    if (this.state.showModal || this.state.showQRScanner) {
      this.setState({ showModal: false, showQRScanner: false });
    }
    return true;
  };
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };
  changeStatus() {
    const { navigate } = this.props.navigation;
    const { scannedUser } = this.state;
    let url = API_URL + "changestatus/" + scannedUser.employee_id;
    let startTripUrl = API_URL + "starttrip/";
    let self = this;
    let body = {
      employee_id: scannedUser.employee_id,
      car_id: scannedUser.car_id,
      current_status: 0
    };
    axios
      .post(startTripUrl, body)
      .then(function(response) {
        axios
          .post(url, {})
          .then(function(response) {
            self.refs.toast.show(
              "Car recieved succesfully!",
              DURATION.LENGTH_LONG
            );
            // console.log("SENDING SCANNED USER", scannedUser);
            // console.log(scannedUser);
            // navigate("CarObservations", { user: scannedUser });
            self.setState({ showModal: !self.state.showModal });
          })
          .catch(function(error) {
            console.log(error);
          });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  async scanQR() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      hasCameraPermission: status === "granted",
      showQRScanner: true
    });
  }
  handleBarCodeScanned = ({ type, data }) => {
    let url = API_URL + "userdetails?id=" + data;
    let self = this;
    Vibration.vibrate([10, 300, 10, 200]);
    axios
      .get(url)
      .then(function(response) {
        self.setState({
          showQRScanner: false,
          showModal: true,
          scannedUser: response.data.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    const { scannedUser, user } = this.state;
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
        {this.state.hasCameraPermission && this.state.showQRScanner && (
          <BarCodeScanner
            onBarCodeScanned={this.handleBarCodeScanned}
            style={styles.barCode}
          />
        )}
        {user && (
          <View style={styles.homeScreenWrap}>
            {!this.state.showQRScanner && (
              <Text style={styles.welcomeMessage}>Hi, {user.name}</Text>
            )}

            {!this.state.showQRScanner && (
              <Button
                title="Scan QR code"
                rounded
                large
                backgroundColor="#fff"
                color="#d80645"
                fontSize={36}
                fontFamily="exo-medium"
                onPress={this.scanQR.bind(this)}
              />
            )}
            {scannedUser && (
              <Modal
                isVisible={this.state.showModal}
                onRequestClose={this.handleBackPress.bind(this)}
              >
                <View
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 20,
                    padding: 35
                  }}
                >
                  <View style={styles.modalStyle}>
                    <View>
                      <Image
                        source={{ uri: scannedUser.car_image }}
                        style={{
                          width: "100%",
                          height: 250,
                          resizeMode: "cover"
                        }}
                      />
                    </View>
                    <View style={{ paddingHorizontal: 10 }}>
                      <Text style={styles.modalContent}>
                        {scannedUser.name}
                      </Text>
                      <Text style={styles.modalContent} numberOfLines={2}>
                        {scannedUser.car_name}
                      </Text>
                      <Text style={styles.regNo}>
                        {scannedUser.regno.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      alignSelf: "center"
                    }}
                  >
                    <TouchableOpacity
                      onPress={this._toggleModal}
                      style={styles.modalClose}
                    >
                      <Button
                        title="Confirm"
                        rounded
                        large
                        backgroundColor="#d80645"
                        color="#fff"
                        fontSize={26}
                        fontFamily="exo-medium"
                        onPress={this.changeStatus.bind(this)}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            )}
          </View>
        )}
      </LinearGradient>
    );
  }
}
