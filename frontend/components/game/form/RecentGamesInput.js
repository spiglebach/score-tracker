import { ScrollView, StyleSheet, Text, View } from "react-native"
import { inputStyles } from "../../ui/Input"
import RecentGameButton from "./RecentGameButton"

function RecentGamesInput({games, onRecentGamePress}) {
    return (
        <View style={inputStyles.container}>
            <Text style={[inputStyles.label, styles.recentGamesLabel]}>Recent games:</Text>
            <ScrollView horizontal >
                <View style={styles.recentButtonsContainer}>
                    {games.map((game) => <RecentGameButton key={game.id} {...game} onPress={onRecentGamePress} />)}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    recentButtonsContainer: {
        marginVertical: 4,
        marginHorizontal: 8,
        flexDirection: 'row',
        gap: 14
    },
    recentGamesLabel: {
        textAlign: 'left'
    }
})

export default RecentGamesInput