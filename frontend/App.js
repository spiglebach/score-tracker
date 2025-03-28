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

const Stack = createNativeStackNavigator()
const BottomTab = createBottomTabNavigator()

function AuthNavigationStack() {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: 'plum'
            },
            headerTintColor: 'black',
            contentStyle: {
                backgroundColor: 'lavender'
            }
        }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
        </Stack.Navigator>
    )
}

function FriendNaviagationStack() {
    return (
        <BottomTab.Navigator screenOptions={{
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
            headerStyle: {
                backgroundColor: 'plum'
            },
            headerTintColor: 'black',
            contentStyle: {
                backgroundColor: 'lavender'
            }
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
    <StatusBar />
    <SafeAreaView style={{flex: 1}}>
    <AuthContextProvider>
        <AxiosAuthRefreshInterceptor>
            <Root />
        </AxiosAuthRefreshInterceptor>
    </AuthContextProvider>
    </SafeAreaView>
    </>
  )
}
