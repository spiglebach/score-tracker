import { StyleSheet, View } from "react-native"
import ClashDisplay from "./ClashDisplay"

function FriendOverview({games, friend}) {
    return (
        <View style={styles.container}>
            <View style={[styles.container]}>
                <ClashDisplay games={games} friend={friend} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default FriendOverview