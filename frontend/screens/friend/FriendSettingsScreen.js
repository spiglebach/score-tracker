import { FRIEND_2 } from "../../data/dummy-data"
import HeaderTitle from "../../components/ui/HeaderTitle"
import { useLayoutEffect } from "react"
import FriendSettings from "../../components/friend/settings/FriendSettings"

function FriendSettingsScreen({navigation}) {
    const friend = FRIEND_2

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: (props) => <HeaderTitle {...props} title={friend.friendNickname} subtitle="Friend Settings" />
        })
    }, [])


    return (
        <FriendSettings friend={friend} />
    )
}

export default FriendSettingsScreen