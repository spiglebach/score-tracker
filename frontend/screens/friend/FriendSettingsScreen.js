import { Text, View } from "react-native"
import { FRIEND_2 } from "../../data/dummy-data"
import HeaderTitle from "../../components/ui/HeaderTitle"
import { useLayoutEffect } from "react"

function FriendSettingsScreen({navigation}) {
    const friend = FRIEND_2

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: (props) => <HeaderTitle style={props.headerStyle} title={friend.friendNickname} subtitle="Friend Settings" />
        })
    }, [])


    return (
        <View>
            <Text>Friend settings</Text>
        </View>
    )
}

export default FriendSettingsScreen