import { StyleSheet, Text, View } from "react-native"
import { GameScore } from "../../../model/Game"
import { OWNER } from "../../../data/dummy-data"

function ClashDisplay({games, friend}) {
    const owner = OWNER
    const ownerScore = games.filter(game => GameScore.WIN_OWNER === game.score).length
    const friendScore = games.filter(game => GameScore.WIN_FRIEND === game.score).length
    const ownerName = owner.preferredNickname || owner.name
    const friendName = friend.friendNickname || friend.friendUser.name

    const ownerScoreStyles = {
        backgroundColor: owner.preferredBackgroundColor,
        borderColor: owner.preferredForegroundColor,
    }
    const ownerContainerStyles = {
        flex: ownerScore + 1
    }
    const ownerTextStyles = {
        color: owner.preferredForegroundColor
    }

    const friendScoreStyles = {
        backgroundColor: friend.friendBackgroundColor,
        borderColor: friend.friendForegroundColor,
    }
    const friendContainerStyles = {
        flex: friendScore + 1
    }
    const friendTextStyles = {
        color: friend.friendForegroundColor,
    }

    return (
        <View style={styles.container}>
            <View style={[styles.playerClash, styles.ownerClash, ownerScoreStyles, ownerContainerStyles]}>
                <Text style={[styles.playerNameText, ownerTextStyles]}>{ownerName}</Text>
                <Text numberOfLines={1} style={[styles.playerScoreText, ownerTextStyles]}>{ownerScore}</Text>
            </View>
            <View style={[styles.playerClash, styles.friendClash, friendScoreStyles, friendContainerStyles]}>
                <Text style={[styles.playerNameText, friendTextStyles]}>{friendName}</Text>
                <Text style={[styles.playerScoreText, friendTextStyles]}>{friendScore}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 10
    },
    playerNameText: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    playerClash: {
        borderWidth: 4,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 30,
    },
    ownerClash: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderRightWidth: 0,
        marginLeft: 20
    },
    friendClash: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderLeftWidth: 0,
        marginRight: 20
    },
    playerScoreText: {
        fontSize: 44,
        fontWeight: 'bold'
    }
})

export default ClashDisplay