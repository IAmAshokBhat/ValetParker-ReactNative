import { AsyncStorage } from "react-native";
export default class Utility {
  static async getToken() {
    try {
      let user = JSON.parse(await AsyncStorage.getItem("user"));
      return user;
    } catch (error) {
      console.log("error while getting token");
      return "error";
    }
  }
  // 0 - with user,recieved - 1, parked - 2, requested - 3, arrived - 4, returned to user - 5
  static STATUS_TEXT(code) {
    switch (code) {
      case 0:
        return "With User";
        break;
      case 1:
        return "Car Recieved";
        break;
      case 2:
        return "Car Parked";
        break;
      case 3:
        return "Car Requested";
        break;
      case 4:
        return "Car Arrived";
        break;
      case 5:
        return "Car Returned";
        break;
    }
  }

  static STATUS_ACTION(code) {
    switch (code) {
      case 0:
        return "With User";
        break;
      case 1:
        return "Park Car";
        break;
      case 2:
        return "Car Parked";
        break;
      case 3:
        return "Got this car";
        break;
      case 4:
        return "Car Arrived";
        break;
      case 5:
        return "Car Returned";
        break;
    }
  }
}
