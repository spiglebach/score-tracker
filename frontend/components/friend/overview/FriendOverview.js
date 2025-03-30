import { StyleSheet, View } from "react-native"
import ClashDisplay from "./ClashDisplay"
import LastGame from "./LastGame"
import CountDisplay from "./CountDisplay"
import { GameScore } from "../../../model/Game"
import Button from "../../ui/Button"
import { useContext } from "react"
import { AuthContext } from "../../../store/context/auth/auth-context"

function FriendOverview({games, friend}) {
    const {logout} = useContext(AuthContext)
    const cooperativeGameCount = games.filter(game => GameScore.COOPERATIVE === game.score).length
    return (
        <View style={styles.container}>
            <ClashDisplay games={games} friend={friend} />
            <LastGame games={games} />
            <View style={styles.countRowContainer}>
                <CountDisplay title="Cooperative" count={cooperativeGameCount} style={styles.cooperativeCountStyle} />
                <CountDisplay title="Total games" count={games.length} style={styles.totalGameCountStyle} />
            </View>
            <View>
                <Button color="error" onPress={logout}>Logout</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
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

export default FriendOverview