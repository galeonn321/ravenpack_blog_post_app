import { createStackNavigator } from '@react-navigation/stack';
import PostDetailScreen from '../screens/PostDetailScreen';
import HomeScreen from '../screens/HomeScreen';
import UserPostsScreen from '../screens/UserPostsScreen';

export type RootStackParams = {
  HomeScreen: undefined;
  PostDetailScreen: undefined;
  UserPostsScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

function MainNavigator() {
  return (
    <Stack.Navigator initialRouteName='HomeScreen'>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name='HomeScreen'
        component={HomeScreen}
      />
      <Stack.Screen name='PostDetailScreen' component={PostDetailScreen} />
      <Stack.Screen name='UserPostsScreen' component={UserPostsScreen} />
    </Stack.Navigator>
  );
}

export default MainNavigator;
