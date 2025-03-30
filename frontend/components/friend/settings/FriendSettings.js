import { Modal, SafeAreaView, StyleSheet, View } from "react-native";
import Input from "../../ui/Input";
import { useEffect, useLayoutEffect, useState } from "react";
import Button from "../../ui/Button";
import ColorPreview from "../../ui/ColorPreview";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ColorCombinationSelector from "./ColorCombinationSelector";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../../constants/styles";

function FriendSettings({friend}) {
    const navigation = useNavigation()
    const initialFriendNickname = friend.friendNickname
    const initialFriendBackgroundColor = friend.friendBackgroundColor
    const initialFriendTextColor = friend.friendForegroundColor

    const friendNicknameInvalid = false // TODO validate input

    const [isEditMode, setIsEditMode] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false)
    const [inputValuesChanged, setInputValuesChanged] = useState({
        nickname: false,
        backgroundColor: false,
        textColor: false
    })

    const editButton = (
        <Button
                textStyle={styles.editButtonText}
                color="warn"
                style={{width: 70}}
                onPress={() => setIsEditMode(true)}
            >
                Edit
        </Button>
    )
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => !isEditMode && editButton,
        })
    }, [isEditMode])

    
    const [selectedFriendNickname, setSelectedFriendNickname] = useState(initialFriendNickname)
    const [selectedFriendColors, setSelectedFriendColors] = useState({
        backgroundColor: initialFriendBackgroundColor,
        textColor: initialFriendTextColor
    })

    const [previouslySelectedColors, setPreviouslySelectedColors] = useState({
        ...selectedFriendColors
    })

    useEffect(() => {
        setInputValuesChanged({
            nickname: initialFriendNickname !== selectedFriendNickname,
            backgroundColor: initialFriendBackgroundColor !== selectedFriendColors.backgroundColor,
            textColor: initialFriendTextColor !== selectedFriendColors.textColor
        })
    }, [selectedFriendNickname, selectedFriendColors])

    function handleColorChange(colorType, {hex}) {
        setSelectedFriendColors(previousColors => ({
            ...previousColors,
            [colorType]: hex
        }))
    }

    function handleOpenColorSelector() {
        if (!isEditMode) {
            return
        }
        setPreviouslySelectedColors({
            ...selectedFriendColors
        })
        setModalVisible(true)
    }

    function handleCancelColorSelection() {
        setSelectedFriendColors({
            ...previouslySelectedColors
        })
        setModalVisible(false)
    }

    function handleSubmitColorSelection() {
        setModalVisible(false)
    }

    function handleCancelEditing() {
        setSelectedFriendNickname(initialFriendNickname)
        setSelectedFriendColors({
            backgroundColor: initialFriendBackgroundColor,
            textColor: initialFriendTextColor
        })
        setIsEditMode(false)
    }

    function handleSubmit() {
        // TODO
    }

    let manageFriendButtons
    if (isEditMode) {
        manageFriendButtons = (
            <>
            <Button style={styles.button} mode="flat" onPress={handleCancelEditing}>Cancel</Button>
            <Button style={styles.button} color="warn" onPress={handleSubmit}>Update</Button>
            </>
        )
    }

    return (
        <View style={styles.container}>
            <Input
                label="Friend nickname"
                // labelStyle={styles.label}
                invalid={friendNicknameInvalid}
                changed={inputValuesChanged.nickname}
                textInputProps={{
                    readOnly: !isEditMode,
                    autoCapitalize: 'words',
                    onChangeText: setSelectedFriendNickname,
                    value: selectedFriendNickname
                }}
            />
            <View>
                <Modal visible={isEditMode && isModalVisible} animationType="slide">
                    <SafeAreaProvider>
                    <SafeAreaView style={styles.modal}>
                        <View style={styles.modalContainer}>
                            <ColorCombinationSelector
                                previewText={selectedFriendNickname}
                                selectedBackgroundColor={selectedFriendColors.backgroundColor}
                                selectedTextColor={selectedFriendColors.textColor}
                                onBackgroundColorChange={handleColorChange.bind(this, 'backgroundColor')}
                                onTextColorChange={handleColorChange.bind(this, 'textColor')}
                            />
                            <View style={styles.buttonContainer}>
                                <Button style={styles.button} mode="flat" onPress={handleCancelColorSelection}>Cancel</Button>
                                <Button style={styles.button} onPress={handleSubmitColorSelection}>Select color</Button>
                            </View>
                        </View>
                    </SafeAreaView>
                    </SafeAreaProvider>
                </Modal>
                <ColorPreview
                    label="Friend color"
                    text={selectedFriendNickname}
                    changed={inputValuesChanged.backgroundColor || inputValuesChanged.textColor}
                    backgroundColor={selectedFriendColors.backgroundColor}
                    textColor={selectedFriendColors.textColor}
                    onPress={handleOpenColorSelector}
                />
            </View>
            <View style={styles.buttonContainer}>
                {manageFriendButtons}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    buttonContainer: {
        margin: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },
    button: {
        flex: 1
    },
    modal: {
        flex: 1,
        backgroundColor: GlobalStyles.colors.surface500
    },
    modalContainer: {
        marginVertical: 50
    }
})

export default FriendSettings