import { StyleSheet, Text, View } from "react-native"
import {FontAwesome6} from '@expo/vector-icons'
import { GameScore } from "../../model/Game"
import { OWNER } from "../../data/dummy-data"

function GameHistoryItem({game}) {
    const owner = OWNER
    const {id, name, date, remark, friend, score} = game
    const gameDate = date.toISOString().slice(0, 10)

    const isOwnerWinner = score === GameScore.WIN_OWNER
    const isFriendWinner = score === GameScore.WIN_FRIEND
    const isCooperative = score === GameScore.COOPERATIVE
    const isNotApplicable = score === GameScore.NOT_APPLICABLE

    let winner = ""
    let winnerBackgroundColor = "white"
    let winnerForegroundColor = "black"
    let winnerBorderColor = "black"
    let gameScoreIcon

    if (isOwnerWinner) {
        winner = owner.preferredNickname || owner.name
        winnerBackgroundColor = owner.preferredBackgroundColor
        winnerForegroundColor = owner.preferredForegroundColor
        winnerBorderColor = owner.preferredForegroundColor
    } else if (isFriendWinner) {
        winner = friend.friendNickname || friend.friendUser.name
        winnerBackgroundColor = friend.friendBackgroundColor
        winnerForegroundColor = friend.friendForegroundColor
        winnerBorderColor = friend.friendForegroundColor
    } else if (isCooperative) {
        winner = "Cooperative"
        winnerBackgroundColor = "lightgreen"
        gameScoreIcon = <FontAwesome6 name="handshake-angle" size={26} color="black"/>
    } else if (isNotApplicable) {
        winner = "N/A"
        winnerBackgroundColor = "cornsilk"
        gameScoreIcon = <FontAwesome6 name="ban" size={26} color="black"/>
    }

    if (isOwnerWinner || isFriendWinner) {
        gameScoreIcon = <FontAwesome6 name="crown" size={26} color={winnerForegroundColor}/>
    }

    const winnerContainerStyles = {
        backgroundColor: winnerBackgroundColor,
        borderColor: winnerBorderColor
    }

    const winnerTextStyles = {
        color: winnerForegroundColor
    }

    return (
        <View style={[styles.container, winnerContainerStyles]}>
            <View style={styles.leftContainer}>
                <Text style={[styles.nameText, winnerTextStyles]}>{name}</Text>
                <Text style={[styles.dateText, winnerTextStyles]}>{gameDate}</Text>
            </View>
            <View style={styles.rightContainer}>
                <View style={styles.winnerContainer}>
                    <Text style={[styles.winnerNameText, winnerTextStyles]}>{winner}</Text>
                    {gameScoreIcon}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: 75,
        borderWidth: 2,
        borderRadius: 14,
        paddingVertical: 10,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    leftContainer: {
        justifyContent: 'center',
        gap: 6
    },
    nameText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    dateText: {

    },
    rightContainer: {
        justifyContent: 'center'
    },
    winnerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6
    },
    winnerNameText: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})

export default GameHistoryItem