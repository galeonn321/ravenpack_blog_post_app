import React from 'react';
import { Box, Image, Text, View } from '@gluestack-ui/themed';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { FlatList } from 'react-native-gesture-handler';
import PostCard from '../components/PostCard';
import { LOG } from '../config/logger';
import { getPosts } from '../actions';
import { ActivityIndicator, Dimensions } from 'react-native';
import { FlashList } from '@shopify/flash-list';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, fetchNextPage } = useInfiniteQuery({
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
    <View flex={1} bgColor='#FFF'>
      {isLoading ? (
        <ActivityIndicator size={'large'} color={'#D8A25E'} />
      ) : (
        <Box width={width} height={height}>
          <FlashList
            data={data?.pages.flat() ?? []}
            keyExtractor={(post, index) => `${post}-${index}`}
            numColumns={1}
            renderItem={({ item }) => <PostCard post={item} />}
            estimatedItemSize={width * 0.9}
            onEndReached={() => fetchNextPage()}
            onEndReachedThreshold={0.6}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => (
              <Image
                source={require('../../../assets/images/icon_logo_top.png')}
                alt='logo top image'
                size='lg'
                alignSelf='center'
              />
            )}
          />
        </Box>
      )}
    </View>
  );
};

export default HomeScreen;

{
  /* <FlatList
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
      /> */
}
