import { StatusBar } from 'expo-status-bar'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { FontAwesome6, Octicons } from '@expo/vector-icons'
import LoginScreen from './screens/LoginScreen'
import RegistrationScreen from './screens/RegistrationScreen'
import FriendOverviewScreen from './screens/friend/FriendOverviewScreen'
import FriendGameHistoryScreen from './screens/friend/FriendGameHistoryScreen'
import FriendSettingsScreen from './screens/friend/FriendSettingsScreen'

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
            headerStyle: {
                height: 110
            },
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

export default function App() {
  return (
    <>
    <StatusBar />
    <NavigationContainer>
        <FriendNaviagationStack />
    </NavigationContainer>
    </>
  )
}
