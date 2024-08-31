import React, { useEffect } from 'react';
import { Image, Text, View } from '@gluestack-ui/themed';
import { useNavigation } from 'expo-router';
import { StackNavigationProp } from '@react-navigation/stack';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { FlatList } from 'react-native-gesture-handler';
import PostCard from '../components/PostCard';
import { LOG } from '../config/logger';
import { getPosts } from '../actions';

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const queryClient = useQueryClient();

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['posts', 'infinite'],
    initialPageParam: 0,
    staleTime: 1000 * 60 * 60,
    queryFn: async () => {
      const posts = await getPosts();

      posts.forEach((post) => {
        queryClient.setQueryData(['post', post.postId], post);
      });

      // LOG.info(posts.at(10));
      return posts;
    },
    getNextPageParam: (pages) => pages.length,
  });

  return (
    <View bgColor='#F5F5F5'>
      <Image
        source={require('../../../assets/images/icon_logo_top.png')}
        alt='logo top image'
        position='absolute'
        size='lg'
        right={0}
      />
      <FlatList
        data={data?.pages.flat() ?? []}
        keyExtractor={(post, index) => `${post}-${index}`}
        numColumns={1}
        ListHeaderComponent={() => (
          <Text fontSize='$4xl' textAlign='center'>
            Welcome :D
          </Text>
        )}
        renderItem={({ item }) => <PostCard post={item} />}
        onEndReachedThreshold={0.6}
        onEndReached={() => fetchNextPage()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;
