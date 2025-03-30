import { useNavigation } from "@react-navigation/native"
import Button from "../ui/Button"

function NewGameButton() {
    const navigation = useNavigation()

    function navigateToNewGameScreen() {
        navigation.navigate("NewGame")
    }

    return (
        <Button mode="flat" color="secondary" onPress={navigateToNewGameScreen}>New Game</Button>
    )
}

export default NewGameButton