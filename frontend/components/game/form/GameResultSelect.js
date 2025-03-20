import { MAIN_GAME_RESULT_TYPES, SECONDARY_GAME_RESULT_TYPES } from "../../../data/dummy-data"
import Select from "../../ui/select/Select"

function GameResultSelect({value, onChange}) {
    return (
        <Select
            value={value}
            mainData={MAIN_GAME_RESULT_TYPES}
            mainColumns={2}
            secondaryData={SECONDARY_GAME_RESULT_TYPES}
            secondaryColumns={3}
            displayLabel="Game result"
            placeholder="Select a result"
            selectorTitle="Pick the result of the game"
            keyExtractor={(item) => item.value}
            labelExtractor={(item) => item.title}
            onChange={onChange}
        />
    )
}

export default GameResultSelect