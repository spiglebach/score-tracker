import { StyleSheet, View } from "react-native"
import ClashDisplay from "./ClashDisplay"
import Button from "../../ui/Button"
import { useContext } from "react"
import { AuthContext } from "../../../store/context/auth/auth-context"

function FriendOverview({games, friend}) {
    const {logout} = useContext(AuthContext)
    return (
        <View style={styles.container}>
            <View style={[styles.container]}>
                <ClashDisplay games={games} friend={friend} />
            </View>
            <View style={styles.logoutContainer}>
                <Button color="error" onPress={logout}>Logout</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    logoutContainer: {
        marginBottom: 20
    }
})

export default FriendOverview