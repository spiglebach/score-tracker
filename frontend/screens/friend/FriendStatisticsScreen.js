import { FRIEND_2, FRIEND_GAME_HISTORY } from "../../data/dummy-data"
import HeaderTitle from "../../components/ui/HeaderTitle"
import NewGameButton from "../../components/friend/NewGameButton"
import { useLayoutEffect } from "react"
import FriendStatistics from "../../components/friend/statistics/FriendStatistics"

function FriendStatisticsScreen({navigation}) {
    const friend = FRIEND_2
    const games = FRIEND_GAME_HISTORY.filter(game => friend.id === game.friend.id)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: (props) => <HeaderTitle {...props} title={friend.friendNickname} subtitle="Statistics" />,
            headerRight: () => <NewGameButton />,
        })
    }, [])

    return (
        <FriendStatistics games={games} friend={friend} />
    )
}

export default FriendStatisticsScreen