import GameForm from "../../components/game/form/GameForm"

function NewGameScreen({navigation}) {

    function handleCancel() {
        navigation.goBack()
    }

    function handleSubmit(data) {

    }

    return (
        <GameForm onCancel={handleCancel} onSubmit={handleSubmit} />
    )
}

export default NewGameScreen