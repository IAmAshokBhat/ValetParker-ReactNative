import { StyleSheet, Platform, Dimensions } from "react-native";

export default (styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff"
  },
  heading: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  menuItem: {
    padding: 10,
    borderWidth: 0.5,
    borderColor: "#d6d7da"
  },
  iconStyle: {
    textAlignVertical: "center",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 20
  },
  profileAvatar: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    minHeight: Dimensions.get("window").height / 2
  },
  loginInput: {
    height: 60,
    marginBottom: 25,
    color: "#fff",
    fontSize: 20,
    borderRadius: 50,
    backgroundColor: "#00000052",
    textAlign: "center",
    fontFamily: "exo-bold"
  },
  loginButton: {
    backgroundColor: "#ffffff",
    borderRadius: 70,
    height: 60,
    fontSize: 20,
    fontFamily: "exo-bold"
  },
  loginPassword: {
    height: 60,
    marginBottom: 60,
    color: "#fff",
    fontSize: 20,
    borderRadius: 50,
    backgroundColor: "#00000052",
    textAlign: "center",
    fontFamily: "exo-bold"
  },
  loginScreen: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 70,
    paddingHorizontal: 30
  },
  linksWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 10
  },
  link: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "exo-medium"
  },
  AppName: {
    fontFamily: "exo-bold",
    fontSize: 26,
    color: "#fff",
    marginBottom: 30
  },
  profileFieldWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderColor: "#ececec",
    borderBottomWidth: 1.5
  },
  profileField: {
    fontFamily: "exo",
    fontSize: 18,
    paddingRight: 25
  },
  regNo: {
    fontFamily: "exo",
    fontSize: 18,
    paddingRight: 25,
    textTransform: "uppercase"
  },
  profileFieldHead: {
    fontFamily: "exo",
    fontSize: 18
  },
  name: {
    color: "#fff",
    fontSize: 28,
    fontFamily: "pat",
    marginTop: 8
  },
  homeScreenWrap: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  welcomeMessage: {
    color: "#fff",
    fontSize: 36,
    fontFamily: "pat",
    marginVertical: 30,
    zIndex: 0
  },
  qrHelp: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "exo-medium",
    marginVertical: 10
  },
  specialButton: {
    color: "#d80645",
    fontSize: 35,
    fontFamily: "exo-medium"
  },
  carStatus: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "exo-medium",
    marginBottom: 50,
    marginTop: 0,
    textAlign: "center"
  },
  logout: {
    justifyContent: "flex-start",
    position: "absolute",
    right: 15,
    top: Platform.OS === "ios" ? 35 : 25,
    color: "#fff",
    fontFamily: "exo-medium"
  },
  toastTextStyle: {
    color: "#d80645",
    fontFamily: "exo-medium",
    fontSize: 20
  },
  toastBGStyle: {
    backgroundColor: "#fff"
  },
  toastBGStyleInverse: {
    backgroundColor: "#d80645"
  },
  toastTextStyleInverse: {
    color: "#fff",
    fontFamily: "exo-medium",
    fontSize: 20
  },
  pencil: {
    alignContent: "center",
    justifyContent: "flex-end",
    position: "absolute",
    right: 10,
    top: Platform.OS === "ios" ? 16 : 18,
    color: "gray"
  },
  showIcon: {
    color: "gray",
    position: "absolute",
    right: 10,
    top: Platform.OS === "ios" ? 16 : 18
  },
  showIconWrap: {
    alignContent: "center",
    justifyContent: "flex-end",
    position: "absolute",
    right: 0,
    top: 0,
    color: "gray",
    width: 100,
    height: 50
  },
  showIconWrapText: {
    alignContent: "center",
    justifyContent: "flex-end",
    position: "absolute",
    right: 0,
    top: 0,
    color: "gray",
    width: 40,
    height: 50
  },
  carAvatar: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    minHeight: Dimensions.get("window").height / 3
  },
  modalStyle: {
    flexDirection: "column",
    justifyContent: "space-between",
    flexWrap: "wrap"
  },
  modalClose: {
    backgroundColor: "#d80645",
    color: "#d80645",
    fontFamily: "exo-bold",
    fontSize: 26,
    marginTop: 15,
    elevation: 5,
    borderRadius: 50
  },
  modalContent: {
    color: "#000",
    fontFamily: "exo-bold",
    fontSize: 18,
    marginBottom: 10,
    flexWrap: "wrap"
  },
  regNo: {
    color: "#000",
    fontFamily: "exo-bold",
    fontSize: 18,
    marginBottom: 10,
    textTransform: "uppercase"
  },
  barCode: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width
  },
  AllCars: {
    fontFamily: "pat",
    fontSize: 30,
    paddingHorizontal: 15,
    paddingTop: 50,
    color: "#fff",
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "#d80645",
    paddingBottom: 25,
    marginBottom: 20
  },
  groupHead: {
    fontFamily: "exo-bold",
    fontSize: 20,
    marginTop: 10,
    position: "absolute",
    top: 0,
    left: 5
  },
  listWrap: {
    marginTop: 40,
    marginBottom: 20
  },
  carTitle: {
    fontFamily: "exo-bold",
    fontSize: 16,
    paddingLeft: 8
  },
  carSubText: {
    fontFamily: "exo-medium",
    fontSize: 14,
    color: "gray",
    textTransform: "uppercase"
  }
}));
