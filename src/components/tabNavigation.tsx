import { Ionicons } from "@expo/vector-icons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import FavoritosScreen from "src/app/favoritosScreen"
import StackNavigation from "./stackNavigation"

const Tab = createBottomTabNavigator()

export default function TabNavigation() {
  return (
  <Tab.Navigator
    screenOptions={({route}) =>({
      headerShown: false,
      tabBarActiveTintColor: '#0072AE',
      tabBarIcon: ({color, size, focused}) => {
        let iconName: any
        if (route.name==='Início') {
          iconName = focused ? 'home' : 'home-outline'
        } else if (route.name==='Favoritos') {
          iconName = focused ? 'bookmark' : 'bookmark-outline'
        }
        return <Ionicons name={iconName} size={size} color={color} />
      }
    })}
  >
    <Tab.Screen name='Início' component={StackNavigation} />
    <Tab.Screen name='Favoritos' component={StackNavigation}/>
  </Tab.Navigator>
  )
}