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
            <View style={[styles.playerContainer, ownerContainerStyles]}>
                <Text style={[styles.playerNameText, styles.ownerNameText, ownerTextStyles]}>{ownerName}</Text>
                <View style={[styles.playerClash, styles.onwerClash, ownerScoreStyles]}>
                    <Text numberOfLines={1} style={[styles.playerScoreText, ownerTextStyles]}>{ownerScore}</Text>
                </View>
            </View>
            <View style={[styles.playerContainer, friendContainerStyles]}>
                <Text style={[styles.playerNameText, styles.friendNameText, friendTextStyles]}>{friendName}</Text>
                <View style={[styles.playerClash, styles.friendClash, friendScoreStyles]}>
                    <Text style={[styles.playerScoreText, friendTextStyles]}>{friendScore}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 0,
        flexDirection: 'row'
    },
    playerContainer: {
        flex: 1,
        minWidth: 50,
    },
    ownerNameText: {
        textAlign: 'left',
        marginLeft: 20,
    },
    friendNameText: {
        textAlign: 'right',
        marginRight: 20
    },
    playerNameText: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    playerClash: {
        borderWidth: 4,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 200,
    },
    onwerClash: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderRightWidth: 0
    },
    friendClash: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderLeftWidth: 0
    },
    playerScoreText: {
        fontSize: 44,
        fontWeight: 'bold'
    }
})

export default ClashDisplay