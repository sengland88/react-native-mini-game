// entry point for the React Native App

// imports from react, react native and expo, etc
import { useState } from "react";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";

// import custom components created by me
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/colors";
import GameOverScreen from "./screens/GameOverScreen";

// first method ran when loading app on mobile device
export default function App() {
  // initial initializations 
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true); // set to true cos the game is technically over
  const [guessRounds, setGuessRounds] = useState(0); // to zero cos there are no rounds

  // load fonts to use in app
  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  // if the fonts are loaded ... app is still loading
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  // method for storing the user's number
  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  // method for displaying the game over screen
  function gameOverHandler(numberOfRounds) {
    // set the flag to true and set the number of rounds (to show on the game over screen)
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }

  // method for restarting the game (after it's been won)
  // reset user guess and number of rounds
  function startNewGameHandler() {
    setUserNumber(null);
    setGuessRounds(0);
  }

  // set the initial value to what we need to display when the app is opened
  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  // if the user has chosen a number, we need to swap to the game screen
  if (userNumber) {
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }

  // if the user has chosen a number and the flag for
  // game is over is true, show the game over screen
  if (userNumber && gameIsOver) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessRounds}
        onStartNewGame={startNewGameHandler}
      />
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={[Colors.primary700, Colors.accent500]}
        style={styles.rootScreen}
      >
        <ImageBackground
          style={styles.rootScreen}
          source={require("./assets/images/background.png")}
          resizeMode="cover"
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

// style sheet so we can customize and make things pretty!
const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
