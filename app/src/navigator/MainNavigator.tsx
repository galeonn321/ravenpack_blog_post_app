import { createStackNavigator } from '@react-navigation/stack';
import PostDetailScreen from '../screens/PostDetailScreen';
import HomeScreen from '../screens/HomeScreen';
import UserPostsScreen from '../screens/UserPostsScreen';
import { PostWithUser } from '../domain/entities/postWithUser';

export type RootStackParams = {
  HomeScreen: undefined;
  PostDetailScreen: { post: PostWithUser };
  UserPostsScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

function MainNavigator() {
  return (
    <Stack.Navigator initialRouteName='HomeScreen'>
      <Stack.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='PostDetailScreen'
        component={PostDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='UserPostsScreen'
        component={UserPostsScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default MainNavigator;
