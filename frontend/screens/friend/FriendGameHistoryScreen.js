import { StyleSheet, View } from "react-native"
import { FRIEND_2, FRIEND_GAME_HISTORY } from "../../data/dummy-data"
import GameHistoryList from "../../components/game/GameHistoryList"
import HeaderTitle from "../../components/ui/HeaderTitle"
import NewGameButton from "../../components/friend/NewGameButton"
import { useLayoutEffect } from "react"

function FriendGameHistoryScreen({navigation}) {
    const friend = FRIEND_2
    const games = FRIEND_GAME_HISTORY
        .filter(game => friend.id === game.friend.id)
        .sort((a, b) => {
            const aTime = a.date.getTime()
            const bTime = b.date.getTime()
            return aTime === bTime ? b.id - a.id : bTime - aTime
        })

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: (props) => <HeaderTitle style={props.headerStyle} title={friend.friendNickname} subtitle="Game History" />,
            headerRight: () => <NewGameButton />
        })
    }, [])


    return (
        <View style={styles.container}>
            <GameHistoryList games={games} itemSeparatorStyle={styles.gameSeparator} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingBottom: 0
    },
    gameSeparator: {
        padding: 4
    }
})

export default FriendGameHistoryScreen