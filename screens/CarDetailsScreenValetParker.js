import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  AsyncStorage,
  Button
} from "react-native";
import { Avatar } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import { LinearGradient, ImagePicker } from "expo";
import { FontAwesome } from "@expo/vector-icons";
import Slideshow from "../components/Slideshow";

import axios from "axios";
import { API_URL } from "react-native-dotenv";
import util from "../util";
import styles from "../styles/index";

export default class CarDetailsScreenValetParker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      carImages: [],
      image: null
    };
  }
  async componentDidMount() {
    const { navigation } = this.props;
    let user = navigation.getParam("user");
    // let user = {
    //   car_name: navigation.getParam("car_name"),
    //   regno: navigation.getParam("regno"),
    //   car_id: navigation.getParam("car_id"),
    //   car_image: navigation.getParam("car_image"),
    //   car_images: navigation.getParam("car_images")
    // };
    console.log("FROM NAVIGATIOMN");
    console.log(user);
    this.getCarImages(user.car_id);
    this.setState({
      user: user
    });
    this.didFocusListener = this.props.navigation.addListener(
      "didFocus",
      () => {
        this.getCarImages(user.car_id);
      }
    );
  }

  getCarImages(car_id) {
    let url = API_URL + "carimages?car_id=" + car_id;
    let self = this;
    axios
      .get(url)
      .then(function(response) {
        console.log([...response.data.data]);
        let images = [];

        self.setState({
          carImages: response.data.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };

  //   _pickImage = async () => {
  //     let result = await ImagePicker.launchImageLibraryAsync({
  //       allowsEditing: true,
  //       aspect: [4, 3]
  //     });

  //     console.log(result);

  //     if (!result.cancelled) {
  //       this.setState({ image: result.uri });
  //     }
  //   };

  render() {
    let { user, image } = this.state;

    return (
      <ScrollView style={{ flex: 1 }}>
        <LinearGradient colors={util.gradientColor} style={styles.container}>
          {user && (
            <View style={styles.profileAvatar}>
              <FontAwesome
                name="power-off"
                size={30}
                style={styles.logout}
                onPress={this._signOutAsync.bind(this)}
              />
              {/* <Image source={require("../assets/creta.png")} /> */}
              <Avatar
                rounded
                source={require("../assets/creta.jpeg")}
                onPress={() => console.log("Works!")}
                activeOpacity={0.7}
                width={200}
              />
              <Text style={styles.name}>{user.car_name}</Text>
            </View>
          )}
        </LinearGradient>
        {user && (
          <View style={{ marginBottom: 10 }}>
            <View style={styles.profileFieldWrap}>
              <Text style={styles.profileFieldHead}>Registration Number</Text>
              <Text style={styles.regNo}>{user.regno.toUpperCase()}</Text>
            </View>
          </View>
        )}
        {/* <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )} */}

        {/* {user && user.car_images.length > 0 && (
          <Slideshow dataSource={this.state.carImages} height={300} />
        )} */}
      </ScrollView>
    );
  }
}
