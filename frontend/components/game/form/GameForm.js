import { StyleSheet, View } from "react-native"
import GameResultSelect from "./GameResultSelect"
import { useState } from "react"
import GameDatePicker from "./GameDatePicker"
import GameNameInput from "./GameNameInput"
import Button from "../../ui/Button"

function GameForm({onCancel, onSubmit}) {
    const today = new Date()
    const [gameName, setGameName] = useState('')
    const [gameResult, setGameResult] = useState()
    const [selectedDate, setSelectedDate] = useState(today)

    function submitHandler() {
        onSubmit({
            name: gameName,
            result: gameResult,
            date: selectedDate
        })
    }

    return (
        <View style={styles.container}>
            <View>
                <GameNameInput value={gameName} setValue={setGameName} />
                <GameResultSelect value={gameResult} onChange={setGameResult} />
                <GameDatePicker value={selectedDate} setValue={setSelectedDate} onChange={setSelectedDate}/>
            </View>
            <View style={styles.buttonContainer}>
                <Button onPress={onCancel} mode='flat' style={styles.button}>Cancel</Button>
                <Button onPress={submitHandler} style={styles.button}>Submit</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonContainer: {
        marginTop: 14,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 40,
        gap: 2
    },
    button: {
        flex: 1,
        marginHorizontal: 2
    }
})


export default GameForm