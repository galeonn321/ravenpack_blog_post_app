import React from 'react';
import { Image, Text, View } from '@gluestack-ui/themed';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { FlatList } from 'react-native-gesture-handler';
import PostCard from '../components/PostCard';
import { LOG } from '../config/logger';
import { getPosts } from '../actions';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
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

      return posts;
    },
    getNextPageParam: (pages) => pages.length,
  });

  return (
    <View flex={1} alignSelf='center'>
      <FlatList
        data={data?.pages.flat() ?? []}
        keyExtractor={(post, index) => `${post}-${index}`}
        numColumns={1}
        ListHeaderComponent={() => (
          <Image
            source={require('../../../assets/images/icon_logo_top.png')}
            alt='logo top image'
            size='lg'
            alignSelf='center'
          />
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
