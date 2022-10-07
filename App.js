import Login from './screens/Login';
import SignUp from './screens/SignUp';
import ResetPassword from './screens/ResetPassword';
import ToDo from './screens/ToDo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ManageAccount from './screens/ManageAccount';
import UserGuide from './screens/UserGuide';
import Answer from './screens/Answer';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}} />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}} />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{headerShown: false}} />
        <Stack.Screen
          name="ManageAccount"
          component={ManageAccount}
          options={{headerShown: false}} />
        <Stack.Screen
          name="ToDo"
          component={ToDo}
          options={{headerShown: false}} />
        <Stack.Screen
          name="UserGuide"
          component={UserGuide}
          options={{headerShown: false}} />
        <Stack.Screen
          name="Answer"
          component={Answer}
          options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}