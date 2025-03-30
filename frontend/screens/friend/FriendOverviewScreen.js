import { FRIEND_2, FRIEND_GAME_HISTORY } from "../../data/dummy-data"
import FriendOverview from "../../components/friend/overview/FriendOverview"
import HeaderTitle from "../../components/ui/HeaderTitle"
import NewGameButton from "../../components/friend/NewGameButton"
import { useLayoutEffect } from "react"

function FriendOverviewScreen({navigation}) {
    const friend = FRIEND_2
    const games = FRIEND_GAME_HISTORY.filter(game => friend.id === game.friend.id)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: (props) => <HeaderTitle {...props} title={friend.friendNickname} subtitle="Overview" />,
            headerRight: () => <NewGameButton />,
        })
    }, [])

    return (
        <FriendOverview games={games} friend={friend} />
    )
}

export default FriendOverviewScreen