import { createStackNavigator } from '@react-navigation/stack';
import PostDetailScreen from '../screens/PostDetailScreen';
import HomeScreen from '../screens/HomeScreen';
import UserPostsScreen from '../screens/UserPostsScreen';
import { PostWithUser, User } from '../domain/entities/postWithUser';

export type RootStackParams = {
  HomeScreen: undefined;
  PostDetailScreen: { post: PostWithUser };
  UserPostsScreen: { user: User };
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
          title: '',
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name='UserPostsScreen'
        component={UserPostsScreen}
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerTintColor: '#000',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default MainNavigator;
