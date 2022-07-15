// component for displaying titles

// imports from react, react native and expo, etc
import { StyleSheet, Text } from "react-native";

// method exported method to be used throughout the app
// prop is children which mean anything that is passed into middle of the Element Tags
function Title({children}) {
    return (
        <Text style={styles.title}>{children}</Text>
    )
};

// export so we can use it throughout the app
export default Title;

// style sheet so we can customize and make things pretty!
const styles = StyleSheet.create({
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
        borderWidth: 2,
        borderColor: 'white',
        padding: 12,
        maxWidth: '80%'
    }
})