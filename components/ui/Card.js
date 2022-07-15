// component that acts as a 'Card' for default styling

// imports from react, react native and expo, etc
import { View, StyleSheet, Dimensions } from "react-native";

// import custom components created by me
import Colors from "../../constants/colors";

// method exported method to be used throughout the app
// prop is children which mean anything that is passed into middle of the Element Tags
function Card({ children }) {
  return <View style={styles.inputContainer}>{children}</View>;
}

// export so we can use it throughout the app
export default Card;

// get the device with using React Native
const deviceWidth = Dimensions.get('window').width;

// style sheet so we can customize and make things pretty!
const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    marginHorizontal: 24,
    marginTop: deviceWidth < 380 ? 36 : 18,
    padding: 16,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.25,
    justifyContent: "center",
    alignItems: "center",
  },
});
