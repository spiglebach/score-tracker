import { StatusBar } from 'expo-status-bar'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { FontAwesome6, Octicons } from '@expo/vector-icons'
import LoginScreen from './screens/auth/LoginScreen'
import RegistrationScreen from './screens/auth/RegistrationScreen'
import FriendOverviewScreen from './screens/friend/FriendOverviewScreen'
import FriendGameHistoryScreen from './screens/friend/FriendGameHistoryScreen'
import FriendSettingsScreen from './screens/friend/FriendSettingsScreen'
import { SafeAreaView } from 'react-native'
import NewGameScreen from './screens/game/NewGameScreen'
import AuthContextProvider, { AuthContext, AxiosAuthRefreshInterceptor, getTokensFromStorage } from './store/context/auth/auth-context'
import { useContext, useEffect, useState } from 'react'
import LoadingOverlay from './components/ui/LoadingOverlay'
import { GlobalStyles } from './constants/styles'

const Stack = createNativeStackNavigator()
const BottomTab = createBottomTabNavigator()

const GLOBAL_HEADER_STYLE = {
    backgroundColor: GlobalStyles.colors.primary
}
const GLOBAL_HEADER_TINT_COLOR = GlobalStyles.colors.primaryText
const GLOBAL_CONTENT_STYLE = {
    backgroundColor: GlobalStyles.colors.surface300
}

function AuthNavigationStack() {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {...GLOBAL_HEADER_STYLE},
            headerTintColor: GLOBAL_HEADER_TINT_COLOR,
            contentStyle: {...GLOBAL_CONTENT_STYLE}
        }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
        </Stack.Navigator>
    )
}

function FriendNaviagationStack() {
    return (
        <BottomTab.Navigator screenOptions={{
            headerStyle: {...GLOBAL_HEADER_STYLE},
            headerTintColor: GLOBAL_HEADER_TINT_COLOR,
            sceneStyle: {...GLOBAL_CONTENT_STYLE},
            tabBarActiveTintColor: GlobalStyles.colors.primaryText,
            tabBarActiveBackgroundColor: GlobalStyles.colors.primary,
            tabBarInactiveBackgroundColor: GlobalStyles.colors.primaryContainer,
            tabBarInactiveTintColor: GlobalStyles.colors.primaryContainerText,
        }}>
            <BottomTab.Screen name="FriendOverview" component={FriendOverviewScreen} 
                options={{
                    tabBarLabel: 'Overview',
                    tabBarIcon: ({color, size}) => <FontAwesome6 name='chart-pie' size={size} color={color} />
                }}/>
            <BottomTab.Screen name="FriendGameHistory" component={FriendGameHistoryScreen}
                options={{
                    tabBarLabel: 'Game History',
                    tabBarIcon: ({color, size}) => <Octicons name='history' size={size} color={color} />
                }}/>
            <BottomTab.Screen name="FriendSettings" component={FriendSettingsScreen}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({color, size}) => <FontAwesome6 name='user-gear' size={size} color={color} />
                }}/>
        </BottomTab.Navigator>
    )
}

function GameNavigationStack() {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {...GLOBAL_HEADER_STYLE},
            headerTintColor: GLOBAL_HEADER_TINT_COLOR,
            contentStyle: {...GLOBAL_CONTENT_STYLE}
        }}>
            <Stack.Screen name="FriendStack" component={FriendNaviagationStack} options={{
                headerShown: false
            }} />
            <Stack.Screen name="NewGame" component={NewGameScreen} options={{
                title: "New Game",
                presentation: 'modal'
            }} />
        </Stack.Navigator>
    )
}

function Navigation() {
    const {isAuthenticated} = useContext(AuthContext)
    let activeNavigationStack
    if (isAuthenticated) {
        activeNavigationStack = <GameNavigationStack />
    } else {
        activeNavigationStack = <AuthNavigationStack />
    }

    return (
        <NavigationContainer>
            {activeNavigationStack}
        </NavigationContainer>
    )
}

function Root() {
    const [isTryingToLogin, setIsTryingToLogin] = useState(true)
    const {authenticate} = useContext(AuthContext)
    useEffect(() => {
        async function fetchTokens() {
            const tokens = await getTokensFromStorage()
            if (tokens) {
                authenticate(tokens)
            }
            setIsTryingToLogin(false)
        } 
        fetchTokens()
    }, [])

    if (isTryingToLogin) {
        return <LoadingOverlay />
    }
    return <Navigation />
}

export default function App() {
  return (
    <>
    <StatusBar style='light'/>
    <SafeAreaView  style={{flex: 1, backgroundColor: GlobalStyles.colors.primaryDark}}>
    <AuthContextProvider>
        <AxiosAuthRefreshInterceptor>
            <Root />
        </AxiosAuthRefreshInterceptor>
    </AuthContextProvider>
    </SafeAreaView>
    </>
  )
}
