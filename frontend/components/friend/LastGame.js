import { StyleSheet, Text, View } from "react-native";

function LastGame({games}) {
    let lastGameText
    if (games.length === 0) {
        lastGameText = "No games yet..."
    } else {
        const lastGameDate = games.map(game => game.date).sort((a, b) => b.getTime() - a.getTime())[0]
        const now = new Date()
        const diff = now - lastGameDate
        const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24))
        if (diffDays === 0) {
            lastGameText = 'Today'
        } else if (diffDays === 1) {
            lastGameText = 'Yesterday'
        } else {
            lastGameText = `${diffDays} days ago`
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Last game</Text>
            <Text style={styles.contentText}>{lastGameText}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 14
    },
    titleText: {
        fontSize: 16
    },
    contentText: {
        fontSize: 24,
        fontWeight: 'bold'
    }
})

export default LastGame