import { useNavigation } from "@react-navigation/native"
import Button from "../ui/Button"
import { StyleSheet } from "react-native"

function NewGameButton() {
    const navigation = useNavigation()

    function navigateToNewGameScreen() {
        navigation.navigate("NewGame")
    }

    return (
        <Button style={styles.button} onPress={navigateToNewGameScreen}>New Game</Button>
    )
}

const styles = StyleSheet.create({
    button: {
        marginRight: 14
    }
})

export default NewGameButton