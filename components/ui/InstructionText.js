// imports from react, react native and expo, etc
import { Text, StyleSheet } from "react-native";

// import custom components created by me
import Colors from "../../constants/colors";

// method exported for use throughout the app
// children: anything passed between the element tags
// style: any styles that are passed from the parent component for additional custom styling
function InstructionText({children, style}) {
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
}

// export so we can use it throughout the app
export default InstructionText;

// style sheet so we can customize and make things pretty!
const styles = StyleSheet.create({
  instructionText: {
    fontFamily: 'open-sans',
    color: Colors.accent500,
    fontSize: 24,
  },
});
