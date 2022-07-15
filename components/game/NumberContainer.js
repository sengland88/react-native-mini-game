// component for displaying the device's guess

// imports from react, react native and expo, etc
import { View, Text, StyleSheet, Dimensions } from "react-native";

// import custom components created by me
import Colors from "../../constants/colors";

// method exported method to be used throughout the app
// prop is children which mean anything that is passed into middle of the Element Tags
function NumberContainer({children}) {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
}

// export so we can use it throughout the app
export default NumberContainer;

// get the device with using React Native
const deviceWidth = Dimensions.get('window').width;

// style sheet so we can customize and make things pretty!
const styles = StyleSheet.create({
    container: {
        borderWidth: 4, 
        borderColor: Colors.accent500,
        padding: deviceWidth < 380 ? 12 : 24,
        margin: deviceWidth < 380 ? 12 : 24,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'

    },
    numberText: {
        color: Colors.accent500,
        fontSize: deviceWidth < 380 ? 28 : 36,
        fontFamily: 'open-sans-bold'
    }
  });
