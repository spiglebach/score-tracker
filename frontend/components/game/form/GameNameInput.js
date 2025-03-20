import { View } from "react-native"
import Input from "../../ui/Input"
import RecentGamesInput from "./RecentGamesInput"
import { RECENT_GAMES } from "../../../data/dummy-data"

function GameNameInput({value, setValue}) {

    function onRecentGamePress(pressedValue) {
        setValue(pressedValue)
    }

    return (
        <View >
            <Input label="Game name" textInputProps={{
                value: value,
                onChange: setValue,
                clearButtonMode: 'while-editing'
            }} />
            <RecentGamesInput games={RECENT_GAMES} onRecentGamePress={onRecentGamePress} />
        </View>
    )
}

export default GameNameInput