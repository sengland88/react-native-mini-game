// a component for displaying a custom button

// imports from react, react native and expo, etc
import { View, Text, Pressable, StyleSheet } from "react-native";

// import custom components created by me
import Colors from "../../constants/colors";

// method exported method to be used throughout the app
// children: anything passed between the element tags
// onPress: essentially an event handler
function PrimaryButton({ children, onPress }) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

// export so we can use it throughout the app
export default PrimaryButton;

// style sheet so we can customize and make things pretty!
const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
