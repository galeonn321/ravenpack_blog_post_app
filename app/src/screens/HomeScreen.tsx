import React, { useEffect, useMemo, useState } from 'react';
import { Box, Image, Text, View } from '@gluestack-ui/themed';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { FlashList } from '@shopify/flash-list';
import PostCard from '../components/PostCard';
import { getPosts } from '../actions';
import { ActivityIndicator, Dimensions } from 'react-native';
import UserDropdown from '../components/DropDownSelect';

interface UserList {
  name: string;
  id: number;
}

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const queryClient = useQueryClient();

  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [users, setUsers] = useState<UserList[]>([{ name: 'all', id: 0 }]);

  const { data, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey: ['posts', 'all'],
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

  const allPosts = data?.pages.flat() ?? [];

  useEffect(() => {
    const userMap = new Map<number, UserList>();
    allPosts.forEach((post) => {
      if (!userMap.has(post.user.id)) {
        userMap.set(post.user.id, post.user);
      }
    });

    const newUsers = [{ name: 'all', id: 0 }, ...Array.from(userMap.values())];
    setUsers((prevUsers) => {
      if (JSON.stringify(prevUsers) !== JSON.stringify(newUsers)) {
        return newUsers;
      }
      return prevUsers;
    });
  }, [allPosts]);

  const filteredPosts = selectedUserId
    ? allPosts.filter((post) => post.user.id === selectedUserId)
    : allPosts;

  const selectedUser = useMemo(
    () => users.find((user) => user.id === selectedUserId),
    [users, selectedUserId]
  );

  return (
    <View flex={1} bgColor='#FFF'>
      {isLoading ? (
        <ActivityIndicator size={'large'} color={'#D8A25E'} />
      ) : (
        <Box width={width} height={height} mb='$48'>
          <FlashList
            data={filteredPosts}
            keyExtractor={(post, index) => `${post}-${index}`}
            numColumns={1}
            renderItem={({ item }) => <PostCard post={item} />}
            estimatedItemSize={width * 0.9}
            onEndReachedThreshold={0.6}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => (
              <Box mx='$4'>
                <Image
                  source={require('../../../assets/images/icon_logo_top.png')}
                  alt='logo top image'
                  size='lg'
                  alignSelf='center'
                />
                <Text mb='$1'>Search by user</Text>
                <UserDropdown
                  users={users}
                  selectedUser={selectedUser}
                  onChange={(item) => setSelectedUserId(item.id)}
                />
              </Box>
            )}
          />
        </Box>
      )}
    </View>
  );
};

export default HomeScreen;
