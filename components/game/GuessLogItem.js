// component for displaying device's guesses

// imports from react, react native and expo, etc
import { Text, View, StyleSheet } from "react-native";

// import custom components created by me
import Colors from "../../constants/colors";

// method exported method to be used throughout the app
// roundNumber: the number of the round
// guess: the guess made by the device
function GuessLogItem({ roundNumber, guess }) {
  return (
    <View style={styles.listItem}>
      <Text style={styles.itemText}>#{roundNumber}</Text>
      <Text style={styles.itemText}>Opponent's Guess: {guess}</Text>
    </View>
  );
}

// export so we can use it throughout the app
export default GuessLogItem;

// style sheet so we can customize and make things pretty!
const styles = StyleSheet.create({
  listItem: {
    borderColor: Colors.primary800,
    borderWidth: 1,
    borderRadius: 40,
    padding: 12,
    marginVertical: 8,
    backgroundColor: Colors.accent500,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    shadowColor: 'black',
    shadowOffset: {height: 0, width: 0},
    shadowOpacity: 0.25,
    shadowRadius: 3
  },
  itemText: {
    fontFamily: 'open-sans'
  }
});
