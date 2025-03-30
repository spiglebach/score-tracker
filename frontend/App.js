import { StatusBar } from 'expo-status-bar'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList, DrawerToggleButton } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { FontAwesome6, Octicons } from '@expo/vector-icons'
import LoginScreen from './screens/auth/LoginScreen'
import RegistrationScreen from './screens/auth/RegistrationScreen'
import FriendOverviewScreen from './screens/friend/FriendOverviewScreen'
import FriendGameHistoryScreen from './screens/friend/FriendGameHistoryScreen'
import FriendSettingsScreen from './screens/friend/FriendSettingsScreen'
import {SafeAreaView, View } from 'react-native'
import NewGameScreen from './screens/game/NewGameScreen'
import AuthContextProvider, { AuthContext, AxiosAuthRefreshInterceptor, getTokensFromStorage } from './store/context/auth/auth-context'
import { useContext, useEffect, useState } from 'react'
import LoadingOverlay from './components/ui/LoadingOverlay'
import { GlobalStyles } from './constants/styles'
import FriendStatisticsScreen from './screens/friend/FriendStatisticsScreen'
import './gesture-handler'
import LogoutButton from './components/auth/LogoutButton'

const Stack = createNativeStackNavigator()
const BottomTab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()

const GLOBAL_HEADER_STYLE = {
    backgroundColor: GlobalStyles.colors.primary
}
const GLOBAL_HEADER_TINT_COLOR = GlobalStyles.colors.primaryText
const GLOBAL_CONTENT_STYLE = {
    backgroundColor: GlobalStyles.colors.surface300
}

const GLOBAL_ACTIVE_TINT_COLOR = GlobalStyles.colors.primaryText
const GLOBAL_ACTIVE_BACKGROUND_COLOR = GlobalStyles.colors.primary
const GLOBAL_INACTIVE_TINT_COLOR = GlobalStyles.colors.primaryContainerText
const GLOBAL_INACTIVE_BACKGROUND_COLOR = GlobalStyles.colors.primaryContainer

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
            tabBarActiveTintColor: GLOBAL_ACTIVE_TINT_COLOR,
            tabBarActiveBackgroundColor: GLOBAL_ACTIVE_BACKGROUND_COLOR,
            tabBarInactiveBackgroundColor: GLOBAL_INACTIVE_BACKGROUND_COLOR,
            tabBarInactiveTintColor: GLOBAL_INACTIVE_TINT_COLOR,
            headerLeft: (props) => <DrawerToggleButton {...props} />
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
            <BottomTab.Screen name="FriendStatistics" component={FriendStatisticsScreen}
                options={{
                    tabBarLabel: 'Statistics',
                    tabBarIcon: ({color, size}) => <Octicons name='graph' size={size} color={color} />
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

function DrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}
            contentContainerStyle={{
                flex: 1,
                justifyContent: 'space-between'
            }}
            >
            <DrawerItemList {...props} />
            <LogoutButton />
        </DrawerContentScrollView>
    )
}

function DrawerNavigation() {
    return (
        <Drawer.Navigator
            drawerContent={DrawerContent}
            screenOptions={{
                backgroundColor: GLOBAL_CONTENT_STYLE,
                drawerActiveTintColor: GLOBAL_ACTIVE_TINT_COLOR,
                drawerActiveBackgroundColor: GLOBAL_ACTIVE_BACKGROUND_COLOR,
                drawerInactiveTintColor: GLOBAL_INACTIVE_TINT_COLOR,
                drawerInactiveBackgroundColor: GLOBAL_INACTIVE_BACKGROUND_COLOR,
                headerShown: false
            }}>
            <Drawer.Screen name="Favourite Friend" component={GameNavigationStack} />
        </Drawer.Navigator>
    )
}

function Navigation() {
    const {isAuthenticated} = useContext(AuthContext)
    let activeNavigationStack
    if (isAuthenticated) {
        activeNavigationStack = <DrawerNavigation />
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
