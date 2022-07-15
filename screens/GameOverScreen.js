// component that is shown when the game is over

// imports from react, react native and expo, etc
import { Text, View, Image, StyleSheet, Dimensions, useWindowDimensions, ScrollView } from "react-native";

// import custom components created by me
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";

// method exported for use throughout the app
// roundsNumber: how many rounds it took to guess the user's number
// userNumber: the number the user asked the device to guess
// onStartNewGame: restarts a new game
function GameOverScreen({roundsNumber, userNumber, onStartNewGame}) {
  // get the device dimensions and re-evaluate when the orientation changes
  const {width, height} = useWindowDimensions();

  // initial size of the image
  let imageSize = 300;

  // if the width is smaller than 380, reset image size
  if (width < 380) {
    imageSize = 150;
  }

  // if the width is smaller than 400, reset image size
  if (height < 400) {
    imageSize = 80
  }

  // object to pass to image component 
  const imageStyle= {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2
  }

  // style prop can take an array and pass multiple values
  // i.e. we're changing the size depending on the 
  // screen dimension of the image and passing 
  // it as a second prop 
  return (
    <ScrollView style={styles.screen}>
    <View style={styles.rootContainer}>
      <Title>Game Over</Title>
      <View style={[styles.imageContainer, imageStyle ]}>
        <Image
          style={styles.image}
          source={require("../assets/images/success.png")}
        />
      </View>
      <Text style={styles.summaryText}>
        Your Phone Needed <Text style={styles.highlight}>{roundsNumber}</Text> Rounds to
        Guess the Number <Text style={styles.highlight}>{userNumber}</Text>.
      </Text>
      <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
    </View>
    </ScrollView>
  );
}

// export so we can use it throughout the app
export default GameOverScreen;

// style sheet so we can customize and make things pretty!
const styles = StyleSheet.create({
  imageContainer: {
    overflow: "hidden",
    borderWidth: 3,
    borderColor: Colors.primary800,
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 24,
  },
  highlight: {
    fontFamily: "open-sans-bold",
    color: Colors.primary500,
  },
  screen: {
    flex: 1
  }
});
