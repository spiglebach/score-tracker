import { StyleSheet, View } from "react-native";
import { GameScore } from "../../../model/Game";
import LastGame from "./LastGame";
import CountDisplay from "./CountDisplay";

function FriendStatistics({games, friend}) {
    const cooperativeGameCount = games.filter(game => GameScore.COOPERATIVE === game.score).length
    return (
        <View style={styles.container}>
            <LastGame games={games} />
            <View style={styles.countRowContainer}>
                <CountDisplay title="Cooperative" count={cooperativeGameCount} style={styles.cooperativeCountStyle} />
                <CountDisplay title="Total games" count={games.length} style={styles.totalGameCountStyle} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    countRowContainer: {
        flexDirection: 'row',
        height: 150,
        gap: 10
    },
    cooperativeCountStyle: {
        flex: 1,
        backgroundColor: 'lightgreen',
        borderColor: 'green'
    },
    totalGameCountStyle: {
        flex: 1
    },
})

export default FriendStatistics