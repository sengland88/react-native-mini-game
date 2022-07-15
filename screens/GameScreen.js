// screen for when the user is playing the game

// imports from react, react native and expo, etc
import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// import custom components created by me
import Title from "../components/ui/Title";
import Colors from "../constants/colors";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import GuessLogItem from "../components/game/GuessLogItem";

// initial initializations
let min = 1;
let max = 100;

// method to generating a random number that the device uses to try and guess 
// the user's guess
function generateRandomBetween(min, max, exclude) { 
  // generate a random number 
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  // if the user's first guess is the first randomly generated number or if the randomly generated number is the device's current guess
  // let's run the method again (we dont want to guess the same number twice)
  // if not, return the random number
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

// method exported method to be used throughout the app
function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber); // generate random and exclude user's number so device wont guess it right off the bat
  const [currentGuess, setCurrentGuess] = useState(initialGuess); 
  const [guessRounds, setGuessRounds] = useState([initialGuess]); // throw the current guess into an array to keep track of guesses/rounds
  const { height, width } = useWindowDimensions();

  // this checks the state of currentguess, usernumber and ongameover
  useEffect(() => {
    // if the current guess is the user's guess then end the game!
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  // this is ran on the fist pass of this component 
  // and will reset the min and max values back to their initial values
  useEffect(() => {
    (min = 1), (max = 100);
  }, []);

  // method for guessing the next number
  // called from custom component
  // direction: if the device should guess a lower value or higher value than that is currently guessed
  function nextGuessHandler(direction) {
    // okay ... 
    // so if the user says lower and the current guess is lower than current guess is less than the userNumber
    // or 
    // if the user says greater and the current guess is greater than the user number
    // they're lying and we dont execute a new guess but instead show an alert!
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't Lie", "You know that this is wrong!", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    // reset the values of min and max after each turn with the current guess
    // to start chipping away at what the user guess
    if (direction === "lower") {
      max = currentGuess;
    } else {
      min = currentGuess + 1;
    }

    // generate a new new guess with the new min/max and exclude the current guess
    const newRandomNumber = generateRandomBetween(min, max, currentGuess);
    setCurrentGuess(newRandomNumber);
    setGuessRounds((guess) => [newRandomNumber, ...guess]); // push into array of guesses/rounds
  }

  // keep track of the number of rounds
  const guessRoundListLength = guessRounds.length;

  // content to show on screens with widths smaller than 500
  // mainly used for portrait mode
  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Lower or Higher?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );

  // if the device's width is larger than 500, use a different layout
  // mainly used for landscape
  if (width > 500) {
    content = (
      <>
        <View style={styles.buttonContainerWide}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {content}
      <View style={styles.flatListContainer}>
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundListLength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
}

// export so we can use it throughout the app
export default GameScreen;

// style sheet so we can customize and make things pretty!
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 12,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.accent500,
    textAlign: "center",
    borderWidth: 2,
    borderColor: Colors.accent500,
    padding: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  instructionText: {
    marginBottom: 12,
  },
  flatListContainer: {
    flex: 1,
    padding: 16,
  },
  buttonContainerWide: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
