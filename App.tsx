import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/login'
import RegisterScreen from './screens/register';
import Ionicons from '@expo/vector-icons/Ionicons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainAppScreen, { HomeStackScreen } from './screens/MainAppScreen';

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerStyle:{backgroundColor:'#fb5b5a'}}}>
    <Stack.Screen name="Login" component={LoginScreen}/>
    <Stack.Screen name="MainAppScreen" component={MainAppScreen} options={{headerShown:false}}/>
    <Stack.Screen name="Register" component={RegisterScreen}/>
    </Stack.Navigator>
    </NavigationContainer>
    
  );
}


