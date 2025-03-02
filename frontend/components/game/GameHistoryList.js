import { FlatList, View } from "react-native"
import GameHistoryItem from "./GameHistoryItem"

function GameHistoryList({games, itemSeparatorStyle}) {
    return (
        <FlatList
            data={games}
            keyExtractor={(item) => item.id}
            renderItem={(data) => <GameHistoryItem game={data.item} />}
            ItemSeparatorComponent={() => <View style={itemSeparatorStyle}></View>}
        />
    )
}

export default GameHistoryList