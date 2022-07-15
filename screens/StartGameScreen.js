// component that is shown when the app is first loaded

// imports from react, react native and expo, etc
import { useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Alert,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

// import custom components created by me
import Colors from "../constants/colors";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

// method exported for use throughout the app
function StartGameScreen({ onPickNumber }) {
  
  // initial initializations
  const [enteredNumber, setEnteredNumber] = useState("");
  const { width, height } = useWindowDimensions(); // grab the window dimensions and re-evaluate this method is re-rendered

  // method for handing the input from the Text Input component (provided by react native)
  // trigger from the on press prop from custom component
  function numberInputHandler(enteredText) {
    setEnteredNumber(enteredText);
  }

  // method for handling the reset of the user's number
  // trigger from the on press prop from custom component
  function resetInputHandler() {
    setEnteredNumber("");
  }

  // method for setting the user's number for the device to guess
  // triggered from the on press prop from custom component
  function confirmInputHandler() {
    // convert the string to number
    const chosenNumber = parseInt(enteredNumber);

    // check if the chosen number is not a number, if the chosen number is less than zero or if the chosen number is greater than 99
    // if any of these conditions are met, throw a react native alert
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {

      // react native component (alert title, alert message, buttons - with an array of options )
      Alert.alert(
        "Invalid Number",
        "Number has to be a number between 1 and 99",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }

    // if the number is a number and greater than zero and less than 99, let's set it!
    onPickNumber(chosenNumber);
  }

  // this is for managing different devices' screens
  const marginTopDistance = height < 380 ? 30 : 50;

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
          <Title>Guess My Number</Title>
          <Card>
            <InstructionText>Enter a Number</InstructionText>
            <TextInput
              style={styles.numberInput}
              maxLength={2}
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
              value={enteredNumber}
              onChangeText={numberInputHandler}
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={confirmInputHandler}>
                  Confirm
                </PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

// export so we can use it throughout the app
export default StartGameScreen;

// style sheet so we can customize and make things pretty!
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  numberInput: {
    height: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    width: 50,
    textAlign: "center",
  },
  rootContainer: {
    flex: 1,
    alignItems: "center",
  },
});
